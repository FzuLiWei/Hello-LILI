const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function printHelp() {
  console.log(`Usage:
  node scripts/import-subtitle.js --id VIDEO_ID --input path/to/file.srt --title "Song title" --source "source note"

Options:
  --id VIDEO_ID       YouTube id used for subtitles/<VIDEO_ID>.json
  --input FILE        .json, .srt, or .vtt subtitle file
  --title TEXT        Song title for the output metadata
  --source TEXT       Source note for the output metadata
  --out FILE          Optional output path. Defaults to subtitles/<VIDEO_ID>.json
  --register          Add or replace a catalog.js timed entry for the output file
  --force             Allow overwriting an existing output file or catalog entry
`);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 2; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === "--help" || item === "-h") args.help = true;
    else if (item === "--register") args.register = true;
    else if (item === "--force") args.force = true;
    else if (item.startsWith("--")) {
      const key = item.slice(2);
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`${item} requires a value`);
      }
      args[key] = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${item}`);
    }
  }
  return args;
}

function parseTimestamp(value) {
  const normalized = String(value || "").trim().replace(",", ".");
  const parts = normalized.split(":");
  if (parts.length < 2 || parts.length > 3) return Number.NaN;

  const seconds = Number(parts.pop());
  const minutes = Number(parts.pop());
  const hours = parts.length ? Number(parts.pop()) : 0;

  if (![hours, minutes, seconds].every(Number.isFinite)) return Number.NaN;
  return hours * 3600 + minutes * 60 + seconds;
}

function cleanCueLine(line) {
  return String(line || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\{\\[^}]+\}/g, "")
    .trim();
}

function splitCueText(lines) {
  const cleaned = lines.map(cleanCueLine).filter(Boolean);
  if (cleaned.length === 0) return { en: "", zh: "" };

  if (cleaned.length === 1) {
    const split = cleaned[0].split(/\s+(?:\|\||\|)\s+/);
    if (split.length >= 2) {
      return {
        en: split[0].trim(),
        zh: split.slice(1).join(" | ").trim(),
      };
    }
  }

  return {
    en: cleaned[0],
    zh: cleaned.slice(1).join(" "),
  };
}

function parseTextSubtitle(source) {
  const body = source
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/^WEBVTT[^\n]*\n/i, "")
    .replace(/^NOTE[\s\S]*?(?=\n\n)/gm, "");

  const blocks = body.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const cues = [];

  for (const block of blocks) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const timeIndex = lines.findIndex((line) => line.includes("-->"));
    if (timeIndex === -1) continue;

    const timeParts = lines[timeIndex].split("-->");
    const startRaw = timeParts[0].trim().split(/\s+/)[0];
    const endRaw = timeParts[1].trim().split(/\s+/)[0];
    const start = parseTimestamp(startRaw);
    const end = parseTimestamp(endRaw);
    const textLines = lines.slice(timeIndex + 1);
    const text = splitCueText(textLines);

    cues.push({
      start,
      end,
      en: text.en,
      zh: text.zh,
    });
  }

  return cues;
}

function normalizeCue(cue) {
  return {
    start: Number(cue.start),
    end: Number(cue.end),
    en: String(cue.en || "").trim(),
    zh: String(cue.zh || "").trim(),
  };
}

function loadCues(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const source = fs.readFileSync(inputPath, "utf8");

  if (ext === ".json") {
    const payload = JSON.parse(source);
    const cues = Array.isArray(payload) ? payload : payload.cues;
    if (!Array.isArray(cues)) {
      throw new Error("JSON subtitle input must be an array or an object with a cues array");
    }
    return cues.map(normalizeCue);
  }

  if (ext === ".srt" || ext === ".vtt") {
    return parseTextSubtitle(source).map(normalizeCue);
  }

  throw new Error(`Unsupported subtitle input type: ${ext}`);
}

function validateCues(cues) {
  const errors = [];
  cues.forEach((cue, index) => {
    if (!Number.isFinite(cue.start)) errors.push(`cue ${index}: start must be finite`);
    if (!Number.isFinite(cue.end)) errors.push(`cue ${index}: end must be finite`);
    if (Number.isFinite(cue.start) && Number.isFinite(cue.end) && cue.end <= cue.start) {
      errors.push(`cue ${index}: end must be greater than start`);
    }
    if (!cue.en) errors.push(`cue ${index}: missing English text`);
    if (!cue.zh) errors.push(`cue ${index}: missing Chinese text`);
  });
  return errors;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function registerCatalogEntry(youtubeId, outputPath, sourceNote, force) {
  const catalogPath = path.join(root, "subtitles", "catalog.js");
  let catalog = fs.readFileSync(catalogPath, "utf8");
  const relativeOutput = path.relative(root, outputPath).replace(/\\/g, "/");
  const entry = [
    `    ${JSON.stringify(youtubeId)}: {`,
    `      status: "timed",`,
    `      source: ${JSON.stringify(sourceNote || "imported")},`,
    `      file: ${JSON.stringify(relativeOutput)},`,
    `      note: "Imported with scripts/import-subtitle.js",`,
    `    },`,
  ].join("\n");

  const existingPattern = new RegExp(
    `    ${JSON.stringify(youtubeId).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}: \\{[\\s\\S]*?\\n    \\},?`,
  );

  if (existingPattern.test(catalog)) {
    if (!force) {
      throw new Error(`${youtubeId} already exists in subtitles/catalog.js. Use --force to replace it.`);
    }
    catalog = catalog.replace(existingPattern, entry);
  } else {
    const importedMarker = "  imported: {\n";
    if (!catalog.includes(importedMarker)) {
      throw new Error("Could not find imported block in subtitles/catalog.js");
    }
    catalog = catalog.replace(importedMarker, `${importedMarker}${entry}\n`);
  }

  fs.writeFileSync(catalogPath, catalog);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const youtubeId = args.id;
  const input = args.input && path.resolve(args.input);
  if (!youtubeId) throw new Error("--id is required");
  if (!input) throw new Error("--input is required");
  if (!fs.existsSync(input)) throw new Error(`Input file does not exist: ${input}`);

  const outputPath = args.out
    ? path.resolve(args.out)
    : path.join(root, "subtitles", `${youtubeId}.json`);

  if (fs.existsSync(outputPath) && !args.force) {
    throw new Error(`Output file already exists: ${outputPath}. Use --force to replace it.`);
  }

  const cues = loadCues(input);
  const errors = validateCues(cues);
  if (errors.length > 0) {
    console.error(JSON.stringify({ errors }, null, 2));
    process.exitCode = 1;
    return;
  }

  const payload = {
    youtubeId,
    title: args.title || youtubeId,
    source: args.source || "user-provided subtitle import",
    status: "timed",
    cues,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

  if (args.register) {
    registerCatalogEntry(youtubeId, outputPath, payload.source, Boolean(args.force));
  }

  console.log(JSON.stringify({
    youtubeId,
    output: path.relative(root, outputPath).replace(/\\/g, "/"),
    cueCount: cues.length,
    registered: Boolean(args.register),
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
