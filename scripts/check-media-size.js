const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SONGS_DIR = path.join(ROOT, "songs");
const MAX_MB = Number(process.env.MAX_MEDIA_MB || 10);
const WARN_MB = Number(process.env.WARN_MEDIA_MB || 9);
const BYTES_PER_MB = 1024 * 1024;

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(filePath, results);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".mp4")) {
      results.push(filePath);
    }
  }

  return results;
}

const files = walk(SONGS_DIR).map((filePath) => {
  const size = fs.statSync(filePath).size;
  return {
    path: path.relative(ROOT, filePath).replace(/\\/g, "/"),
    mb: Number((size / BYTES_PER_MB).toFixed(2)),
  };
});

const tooLarge = files.filter((file) => file.mb > MAX_MB);
const warnings = files.filter((file) => file.mb > WARN_MB && file.mb <= MAX_MB);
const totalMb = Number(files.reduce((sum, file) => sum + file.mb, 0).toFixed(2));

const summary = {
  mediaDir: "songs",
  count: files.length,
  totalMb,
  maxAllowedMb: MAX_MB,
  warningAboveMb: WARN_MB,
  largest: [...files].sort((a, b) => b.mb - a.mb).slice(0, 10),
  warnings,
  errors: tooLarge,
};

console.log(JSON.stringify(summary, null, 2));

if (tooLarge.length > 0) {
  process.exitCode = 1;
}
