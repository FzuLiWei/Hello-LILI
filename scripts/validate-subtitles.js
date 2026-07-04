const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function runWindowScript(filePath, context) {
  const source = fs.readFileSync(filePath, "utf8");
  vm.runInContext(source, context, { filename: filePath });
}

function loadWindowData() {
  const context = { window: {} };
  vm.createContext(context);
  runWindowScript(path.join(root, "songs_data.js"), context);
  const sourcesPath = path.join(root, "subtitles", "sources.js");
  if (fs.existsSync(sourcesPath)) {
    runWindowScript(sourcesPath, context);
  }
  runWindowScript(path.join(root, "subtitles", "catalog.js"), context);
  runWindowScript(path.join(root, "subtitles_data.js"), context);
  return context.window;
}

function loadAppTitleTranslations() {
  const appPath = path.join(root, "app.js");
  const appSource = fs.readFileSync(appPath, "utf8");
  const match = appSource.match(/const titleTranslations = (\{[\s\S]*?\n  \});/);
  if (!match) return { translations: {}, errors: ["app.js: missing titleTranslations map"] };

  try {
    const translations = vm.runInNewContext(`(${match[1]})`);
    return { translations, errors: [] };
  } catch (error) {
    return { translations: {}, errors: [`app.js: could not parse titleTranslations: ${error.message}`] };
  }
}

function loadImportedCueFile(entry) {
  if (!entry || !entry.file) return null;
  const fullPath = path.join(root, entry.file);
  if (!fs.existsSync(fullPath)) {
    return { cues: null, errors: [`${entry.file}: subtitle file does not exist`] };
  }
  try {
    const payload = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    const cues = Array.isArray(payload) ? payload : payload.cues;
    if (!Array.isArray(cues)) {
      return { cues: null, errors: [`${entry.file}: missing cues array`] };
    }
    return { cues, errors: [] };
  } catch (error) {
    return { cues: null, errors: [`${entry.file}: ${error.message}`] };
  }
}

function validateCue(cue, index, songId) {
  const errors = [];
  if (!Number.isFinite(cue.start)) errors.push(`${songId} cue ${index}: start must be a finite number`);
  if (!Number.isFinite(cue.end)) errors.push(`${songId} cue ${index}: end must be a finite number`);
  if (Number.isFinite(cue.start) && Number.isFinite(cue.end) && cue.end <= cue.start) {
    errors.push(`${songId} cue ${index}: end must be greater than start`);
  }
  if (!cue.en || typeof cue.en !== "string") errors.push(`${songId} cue ${index}: missing English text`);
  if (!cue.zh || typeof cue.zh !== "string") errors.push(`${songId} cue ${index}: missing Chinese text`);
  return errors;
}

function makeOfficialVideoUrl(template, youtubeId) {
  return String(template || "https://www.youtube.com/watch?v={youtubeId}").replace("{youtubeId}", youtubeId);
}

function countBy(items, selector) {
  return items.reduce((counts, item) => {
    const key = selector(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function main() {
  const data = loadWindowData();
  const groups = data.songDatabase || {};
  const songs = Object.values(groups).flat();
  const subtitles = data.customSubtitlesData || {};
  const catalog = data.subtitleCatalog || {};
  const imported = catalog.imported || {};
  const sources = data.subtitleSources || {};
  const sourceEntries = sources.songs || {};
  const sourceDefaults = sources.defaults || {};
  const priorityQueue = Array.isArray(sources.priorityQueue) ? sources.priorityQueue : [];
  const titleTranslationResult = loadAppTitleTranslations();
  const titleTranslations = titleTranslationResult.translations;

  const errors = [...titleTranslationResult.errors];
  const timed = [];
  const pending = [];
  const learningFallback = [];
  const missingLargeBilingualSubtitles = [];
  const missingCatalogImports = [];
  const sourceRows = [];

  for (const song of songs) {
    const catalogEntry = imported[song.youtubeId];
    const importedFileResult = loadImportedCueFile(catalogEntry);
    if (importedFileResult && importedFileResult.errors.length > 0) {
      errors.push(...importedFileResult.errors);
    }
    const cues = subtitles[song.youtubeId] || (importedFileResult && importedFileResult.cues);
    if (Array.isArray(cues) && cues.length > 0) {
      timed.push(song);
      if (!imported[song.youtubeId]) missingCatalogImports.push(song.youtubeId);
      cues.forEach((cue, index) => {
        errors.push(...validateCue(cue, index, song.youtubeId));
      });
    } else {
      pending.push(song);
      if (titleTranslations[song.youtubeId]) {
        learningFallback.push(song);
      } else {
        missingLargeBilingualSubtitles.push(song);
        errors.push(`${song.youtubeId}: missing bilingual learning subtitle fallback title translation`);
      }
    }

    const sourceEntry = sourceEntries[song.youtubeId] || {};
    sourceRows.push({
      youtubeId: song.youtubeId,
      title: song.title,
      source: song.source,
      officialVideoUrl: makeOfficialVideoUrl(sourceDefaults.officialVideoUrlTemplate, song.youtubeId),
      sourceStatus: sourceEntry.status || sourceDefaults.status || "needs-source-review",
      rights: sourceEntry.rights || sourceDefaults.rights || "unknown",
      sourceUrl: sourceEntry.sourceUrl || null,
      nextAction: sourceEntry.nextAction || sourceDefaults.nextAction || "Find verified source material before importing.",
      timed: Boolean(subtitles[song.youtubeId] || (importedFileResult && importedFileResult.cues)),
    });
  }

  for (const id of Object.keys(imported)) {
    const existsInSongList = songs.some((song) => song.youtubeId === id);
    if (!existsInSongList) errors.push(`${id}: catalog import is not in songs_data.js`);
  }

  for (const id of Object.keys(sourceEntries)) {
    const existsInSongList = songs.some((song) => song.youtubeId === id);
    if (!existsInSongList) errors.push(`${id}: source entry is not in songs_data.js`);
  }

  const priority = priorityQueue
    .map((item) => {
      const song = songs.find((candidate) => candidate.youtubeId === item.youtubeId);
      if (!song) {
        errors.push(`${item.youtubeId}: priority queue entry is not in songs_data.js`);
        return null;
      }
      const sourceRow = sourceRows.find((row) => row.youtubeId === item.youtubeId);
      return {
        priority: item.priority,
        youtubeId: item.youtubeId,
        title: song.title,
        source: song.source,
        sourceStatus: sourceRow.sourceStatus,
        rights: sourceRow.rights,
        sourceUrl: sourceRow.sourceUrl,
        officialVideoUrl: sourceRow.officialVideoUrl,
        timed: sourceRow.timed,
        reason: item.reason,
        nextAction: sourceRow.nextAction,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.priority - b.priority);

  const report = {
    totalSongs: songs.length,
    largeBilingualSubtitleSongs: timed.length + learningFallback.length,
    largeBilingualSubtitleCoverage: `${timed.length + learningFallback.length}/${songs.length}`,
    timedSubtitleSongs: timed.length,
    pendingTimedSubtitleSongs: pending.length,
    learningFallbackSubtitleSongs: learningFallback.length,
    timedCoverage: `${timed.length}/${songs.length}`,
    catalogImported: Object.keys(imported).length,
    sourceTrackedSongs: Object.keys(sourceEntries).length,
    sourceStatusCounts: countBy(sourceRows, (row) => row.sourceStatus),
    rightsCounts: countBy(sourceRows, (row) => row.rights),
    priorityQueue: priority,
    missingCatalogImports,
    missingLargeBilingualSubtitles: missingLargeBilingualSubtitles.map((song) => ({
      youtubeId: song.youtubeId,
      title: song.title,
      source: song.source,
    })),
    pending: pending.map((song) => ({
      youtubeId: song.youtubeId,
      title: song.title,
      source: song.source,
    })),
    errors,
  };

  console.log(JSON.stringify(report, null, 2));
  if (errors.length > 0) process.exitCode = 1;
}

main();
