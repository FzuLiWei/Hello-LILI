# Current State

## Current Phase
IMPLEMENTATION -> VERIFY

## Active Task
- (Completed) 彻底毁灭原先基于 YouTube IFrame 存在跨域锁死问题的 UI。
- (Completed) 重构为纯本地、无边界、带有原生字幕监听的 HTML5 Video 播放器。

## Recently Completed
- 移除了所有复杂的 `<section>` 路由。
- 使用 `python` 重新扫描了 `songs` 目录并生成了带有本地路径的 `songs_data.js`。
- 新增了一个极致简单的 `index.html`，只保留选歌和视频。
- 使用 `videoPlayer.ontimeupdate` 替代定时器，实现原生的精确字幕同步。
- 放大本地视频为满屏播放，移除外框缩小感。
- 放大自定义双语字幕层，英文黄字、中文白字，移动端也保持大字号。
- 为 54 首本地儿歌补齐字幕路径：3 首使用逐句双语字幕，51 首使用双语学习字幕兜底。
- Defined MVP as a 0-3 parent-facing English enlightenment assistant.
- Captured long-term roadmap from infancy to 12 years old.
- Added detailed 0-18 month parent assistant mode task list to `docs/TASKS.md`.
- Implemented static homepage in `index.html`, `styles.css`, and `app.js`.
- Verified desktop load, basic interaction, console errors, and mobile responsive layout.
- Reworked homepage after product review into a simpler mobile-first flow.
- Added selectable browser English voices and speech-rate options for temporary TTS.
- Created `style_preview.html` containing four distinct visual themes (Forest & Oat, Warm Macaron, Modern Minimalist, Gamified Toy Box) and an ambient "Bedtime Mode" toggle for visual testing.
- Synced the current local project to GitHub repository `FzuLiWei/Hello-LILI` on `main`.
- Confirmed the Codex Netlify connector OAuth callback remains blocked on this Windows setup; switching deployment path to Netlify CLI or Netlify GitHub import.
- Documented the "Gamified Toy Box" (Neo-Brutalism + Playful Neoteny) visual style guidelines into `docs/SPEC.md` as the unified standard for all future product screens.
- Completely redesigned the homepage (`index.html`, `styles.css`, and `app.js`) to apply the "Gamified Toy Box" visual style.
- Resolved layout issues and text truncations, optimized padding/spacing, implemented a mobile-native Bottom Sheet settings drawer, integrated the game HUD progress bar with habit tracking, and added safe area layout support.
- Verified Netlify continuous deployment from GitHub `FzuLiWei/Hello-LILI` on `main`; commit `7bba964` automatically deployed to production.
- Added a project workflow rule requiring future completed tasks to push to GitHub `main`, wait for Netlify auto deployment, and report the live production URL.
- Implemented onboarding for child nickname, birthdate, parent English comfort level, daily available time, and preferred scene.
- Added a 14-day 0-18 month parent assistant seed plan covering 8 routine scenes, 56 phrases, song cues, picture book cues, offline steps, and response options.
- Connected homepage content, phrase drawer, routine steps, progress, day switching, and response recording to the 14-day seed plan.
- Added a mobile weekly summary card with completed days, practiced scenes, observed responses, seven-day status strip, and one low-pressure next-step suggestion.
- Updated the bottom navigation to include and correctly highlight the weekly summary entry.
- Added a lightweight parent guidance area with a bottom navigation entry, dynamic "today how to use it" prompt, and seven low-screen parent guidance cards.
- Removed the global 320px minimum width so the mobile shell does not create horizontal overflow in narrow viewport tests.
- Moved the current-scene phrase list into the Today card so the Short Phrases entry expands near the core phrase instead of at the page bottom.
- Compressed parent guidance from seven longer cards into four short, action-first reminders.
- Replaced low-quality open song audio with an in-page official vocal video fallback, while preserving a local audio path for future family-provided MP3 files.
- Updated official song video embeds to request English captions by default and added a short parent-facing CC hint.

## Known Issues

- No separate A/B product documents were found in the project directory.
- Full application stack has not been chosen.
- Seed content is implemented as a first 14-day set, but still needs education/content review after real use.
- Homepage state is stored only in browser `localStorage`.
- No backend or account system has been added.
- Current TTS uses browser/system voices, so quality varies by device; it is intentionally limited to short phrase pronunciation.
- Production-grade voice likely requires a cloud TTS integration.
- Weekly summary is derived only from local daily completion and response data; it does not yet summarize song/book usage separately.
- Compressed parent guidance and in-page official song video playback still need real parent readability, device playback, subtitle availability, and usability review.
- YouTube caption display depends on the embedded video's available caption tracks and the YouTube player; the app requests English captions but cannot guarantee every video shows them automatically.
- 目前并非所有本地歌曲都有逐句歌词字幕；缺逐句数据的歌曲显示双语学习字幕，需要后续用合法字幕文件逐步替换。
- Codex Netlify connector OAuth callback is still blocked by the current Windows `codex://` protocol issue.
- Netlify production deploys automatically from GitHub `FzuLiWei/Hello-LILI` after pushes to `main`.
- Future task close-out should include GitHub commit, push result, Netlify deploy verification, and the live URL.

## Next Step

Validate the completed parent-assistant MVP slice:

1. Test the full flow on physical iPhone and Android devices.
2. Review the 14-day phrases, songs, books, and tasks for natural English and parent usability.
3. Review the local full-screen song player on physical devices, especially video cropping, subtitle size, and whether learning-caption fallback is acceptable before full timed captions are prepared.
