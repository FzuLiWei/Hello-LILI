# Current State

## Current Phase

Parent assistant homepage restoration and standalone song player publish

## Active Task

- Publish the restored parent-assistant homepage as the default entry while keeping the 54-song video player as a separate "儿歌" entrance.
- Keep the song player using the existing GitHub raw media routing for Netlify production and local `songs/...` files during local preview.
- Keep loop playback enabled by default on the song player video element.
- After production is verified, shift focus to physical phone QA for the restored parent flow and video playback.

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
- Added `scripts/check-media-size.js`; current local media validation reports 54 MP4 files, 288.46 MB total, no files above the 9 MB warning threshold, and no files above the 10 MB Netlify safety limit.
- After Netlify rejected the first pushed media deploy for commit `3b23f92`, recompressed the 9 MP4 files above 9 MB so the largest deployable video is now 8.87 MB.
- After Netlify still rejected the 288 MB direct media deploy for commit `497fca6`, added `.netlifyignore` and changed the player so Netlify production maps `songs/...` paths to GitHub raw media URLs.
- After Netlify also rejected `77cfa62`, pinned production video URLs to that media commit and removed `songs/` from the current Git tree while keeping local files ignored for local preview.
- Restored the parent-assistant homepage from the previous Toy Box static app shell and embedded the current local video player as an independent `#songs` view.
- Added a bottom navigation "儿歌" entrance and changed the daily song card action to open the standalone player and auto-select the matching recommended song when possible.
- Split player logic into `song-player.js`, kept parent-assistant workflow in `app.js`, and updated subtitle validation to look for runtime fallback title translations in the new player file.
- Local browser QA verified root page defaults to the parent assistant, the song player opens from both entrances, 54 song options are present, `video.loop` is true, a selected local video reaches `readyState=4`, and the return button restores the homepage.

## Known Issues

- `The Itsy Bitsy Spider` now uses a trimmed local clip and auto-caption-derived bilingual cues; polish the Chinese wording later if it becomes a core learning asset.
- `SHAKE BREAK` uses manual action captions because the downloadable JSON caption track was recognition noise; replace if a cleaner official transcript appears.
- `Super Simple Lullaby Medley` appears to be a no-lyrics lofi lullaby video and uses timed descriptive music captions rather than lyric captions.
- Browser/system TTS quality varies by device and remains limited to short parent phrase pronunciation.
- Homepage state is stored only in browser `localStorage`; no backend or account sync exists.
- Browser autoplay policies can still require the parent to tap the video play control once before audio/video starts; once started, the current song loops by default.

## Next Step

1. Commit and push the restored homepage and standalone looping song player integration to `origin/main`.
2. Wait for the matching Netlify production deploy and verify the public URL returns HTTP 200 with the restored homepage.
3. After production verification, test the song player on physical iPhone/Android devices, including manual play, subtitles, looping, and return-to-home behavior.
