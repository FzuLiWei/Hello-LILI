# Current State

## Current Phase

Compressed local media packaging for GitHub and Netlify

## Active Task

- Publish the compressed local-media song player build through GitHub and Netlify.
- Keep every deployable MP4 under `songs/` below 50 MB; prefer 5-20 MB per song.
- Preserve full-size local source media only in ignored backup folders such as `scratch/`.

## Recently Completed

- Local song playback uses a full-screen HTML5 video player with a custom large bilingual subtitle layer.
- All 54 local songs have large timed bilingual subtitle coverage registered in `subtitles/catalog.js`.
- Added `subtitles/` subtitle import structure, `subtitles/catalog.js`, `subtitles/sources.js`, and `scripts/import-subtitle.js`.
- Added `scripts/validate-subtitles.js` so large-caption coverage and timed-lyric coverage are reported separately.
- Imported 54/54 timed bilingual caption sets: 3 legacy inline songs plus 51 standalone files under `subtitles/`.
- Completed the final subtitle batch from 36/54 to 54/54, including official-caption imports, manual segmented cues, machine-translated full-compilation cues, and descriptive captions for the no-lyrics lofi lullaby video.
- `subtitles/sources.js` now marks all 54 local songs complete and keeps quality notes for non-official sources.
- Fixed the local-video subtitle overlay so large bilingual captions render above the native video layer on desktop and mobile viewports.
- Replaced the 118.46 MB `The Itsy Bitsy Spider + More` local compilation with a 145-second, 4.43 MB deployable `The Itsy Bitsy Spider` clip while keeping the original under `scratch/original-songs-before-compression-20260704`.
- Trimmed `subtitles/TbKI-jjpPx8.json` to the 145-second local clip and updated the displayed song title.
- Added `scripts/check-media-size.js`; current local media validation reports 54 MP4 files, 319.27 MB total, no files above 20 MB, and no files above the 50 MB limit.
- Cleaned `.gitignore` so compressed `songs/` media can be committed while `.netlify/`, `node_modules/`, `scratch/`, and temporary compression outputs stay ignored.

## Known Issues

- `The Itsy Bitsy Spider` now uses a trimmed local clip and auto-caption-derived bilingual cues; polish the Chinese wording later if it becomes a core learning asset.
- `SHAKE BREAK` uses manual action captions because the downloadable JSON caption track was recognition noise; replace if a cleaner official transcript appears.
- `Super Simple Lullaby Medley` appears to be a no-lyrics lofi lullaby video and uses timed descriptive music captions rather than lyric captions.
- Browser/system TTS quality varies by device and remains limited to short parent phrase pronunciation.
- Homepage state is stored only in browser `localStorage`; no backend or account sync exists.
- The current entry UI is still the song player view; the earlier parent-assistant homepage should be restored as the main app shell with the song player as a separate entrance.

## Next Step

1. Commit only the task-related app, subtitle, script, and compressed `songs/` files.
2. Push `main`, wait for the matching Netlify production deploy, and verify production HTTP 200 plus visible local video playback/subtitles.
3. After this media publish is verified, restore the parent-assistant homepage as the main entry and keep the song player as a separate route or tab.
