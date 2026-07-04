# Current

## Product Definition Sprint

Goal:

Turn the long-term English enlightenment concept into a clear product plan and development-ready task structure.

Status:

- Product positioning defined.
- MVP scope defined as 0-3 parent assistant.
- Requirements captured in `docs/SPEC.md`.
- Mobile-first static homepage has been implemented for the 0-18 month parent assistant mode.
- Onboarding questionnaire is implemented in the static prototype.
- 14-day seed content is implemented and drives the homepage.
- Weekly summary is implemented in the static prototype using completion and response data.
- Lightweight parent guidance area is implemented and compressed into short, action-first cards.
- Daily song support now prioritizes local audio files when available and otherwise embeds official high-quality vocal song videos in-page with English captions requested by default.
- Local song playback now uses a full-screen HTML5 video player with a large bilingual subtitle layer; all 54 local songs have registered timed bilingual caption files.
- Local song media is now prepared for temporary GitHub + Netlify hosting: all deployable MP4 files under `songs/` are below 10 MB, with the former 42-minute `The Itsy Bitsy Spider + More` compilation trimmed to a 145-second single-song clip. Netlify publishes the app and subtitles, while production video playback loads the compressed MP4 files from GitHub raw URLs.
- Project repository is now initialized and synced to GitHub `FzuLiWei/Hello-LILI` on `main`.
- Gamified visual style "Toy Box" (游戏化玩偶盒) defined and documented.
- Current static site is deployed to Netlify at `https://cheerful-mooncake-bf41c5.netlify.app`.
- Netlify continuous deployment is connected to `FzuLiWei/Hello-LILI` and verified from `main`.
- Project workflow now requires post-task GitHub push and Netlify deploy verification after successful validation.

Current tasks:

- Review and refine the 14-day seed content with real parent use.
- Validate the weekly summary during real parent use and refine its next-step suggestion copy.
- Validate the compressed parent guidance and in-page real song playback with requested English captions during real parent use.
- QA and polish the completed 54-song timed bilingual subtitle set; source quality notes are tracked in `subtitles/sources.js`, and coverage is checked by `node scripts/validate-subtitles.js`.
- Publish the compressed local media build to GitHub and Netlify, then verify production playback and subtitles on the public URL.
- Test browser TTS on physical iPhone and Android devices for short phrase pronunciation only.
- Keep the current implementation static until the core flow is validated.

# Next Milestone

## Milestone 1: MVP Product Design

Objective:

Prepare enough product detail to start implementation without ambiguity.

## 0-18 Month Parent Assistant Task List

Objective:

Design the first product mode for infants from birth to 18 months. This mode serves parents only. The child should not independently use the screen.

Product rule:

- 0-18 months is parent-assistant mode, not child-learning mode.
- All learning happens offline through parent voice, facial expression, touch, songs, picture books, and daily care routines.
- The app's job is to tell parents what to say, when to say it, how to repeat it, and what child responses to observe.

### P0: Mode Rules and Boundaries

- Define 0-18 month mode as parent-only by default.
- Hide child-facing games, quizzes, scores, and rankings in this mode.
- Add low-screen guidance in onboarding and parent support.
- Define daily recommended use as 5-15 minutes of parent app use, followed by offline interaction.
- Define success as consistent parent input, not child output.

Acceptance criteria:

- Parent can understand that the child should not be asked to use the app directly.
- The first screen gives parent actions, not baby-facing content.
- No task asks the infant to answer questions on screen.

### P0: Parent Onboarding

- Collect child nickname.
- Collect date of birth.
- Calculate exact age in months.
- Assign learning sub-stage:
  - 0-6 months: sound bonding.
  - 7-12 months: response and routine.
  - 13-18 months: comprehension and imitation.
- Collect parent English comfort level.
- Collect daily available time.
- Collect preferred routine scenes.

Acceptance criteria:

- Parent can finish onboarding in under 2 minutes.
- App generates a suitable first daily plan after onboarding.
- Parent can edit profile settings later.

### P0: Daily Plan

- Create a daily plan structure for 0-18 months.
- Each plan includes:
  - One routine scene.
  - 3-5 short English phrases.
  - One song or chant.
  - One picture book or object interaction.
  - One offline parent-child task.
  - One observation prompt.
- Add done, skipped, and save-for-later states.
- Add repetition logic so phrases repeat across days.

Acceptance criteria:

- A parent can understand today's action within 10 seconds.
- A daily plan can be completed without preparation.
- The plan can be completed during normal caregiving routines.

### P0: Routine Scene Library

- Create core scenes:
  - Wake up.
  - Diaper change.
  - Feeding.
  - Play time.
  - Bath time.
  - Going out.
  - Bedtime.
  - Comforting emotions.
- For each scene, create parent-friendly phrase cards.
- Each phrase card includes:
  - English phrase.
  - Chinese meaning.
  - When to say it.
  - How to act it out.
  - Optional replacement word.

Acceptance criteria:

- Each scene has at least 5 usable phrases.
- Phrases are short, natural, and repeatable.
- Parent can save preferred phrases.

### P0: Infant Task Cards

- Define task card types:
  - Say: parent repeats one phrase during a routine.
  - Sing: parent sings or plays one song with movement.
  - Read: parent reads or shows one picture book.
  - Point: parent points to a real object and says its English name.
  - Play: parent uses a gesture game such as peekaboo.
  - Comfort: parent uses English during soothing.
- Ensure every task is offline-first.
- Keep each task under 5 minutes.

Acceptance criteria:

- Parent can complete one task while holding or caring for the child.
- Tasks do not require printing, preparation, or special teaching tools.
- Task wording is concrete enough to execute immediately.

### P0: Child Response Log

- Define simple response options:
  - Looked at parent.
  - Smiled or laughed.
  - Calmed down.
  - Reached for object.
  - Pointed.
  - Imitated sound.
  - Imitated gesture.
  - Responded to repeated routine.
- Add optional free note.
- Keep logging under 30 seconds.

Acceptance criteria:

- Parent can record a response after finishing a task.
- The app does not label lack of response as failure.
- Logs can support weekly review.

### P0: Parent Guidance Area

- Add short guidance articles:
  - What 0-18 month English exposure should look like.
  - Why parents should not expect early speaking.
  - How to use English during daily routines.
  - How to repeat without pressure.
  - How to read a board book to an infant.
  - How to use songs and gestures.
  - How to keep Chinese as the family language foundation.
- Keep each article short and action-oriented.

Acceptance criteria:

- Guidance reduces anxiety and increases parent confidence.
- Guidance is connected to daily tasks, not hidden as long theory.

### P1: Seed Content

- Write initial phrase set:
  - 8 scenes.
  - 5-10 phrases per scene.
  - Total 40-80 phrases.
- Write initial task set:
  - 20-30 infant task cards.
- Prepare initial song list:
  - 10 songs or chants.
- Prepare initial picture book list:
  - 10 board books or infant-friendly books.
- Add age tags for 0-6, 7-12, and 13-18 months.

Acceptance criteria:

- A parent can use the app for at least 14 days without seeing empty content.
- Core content repeats intentionally instead of feeling random.

### P1: Weekly Summary

- Summarize:
  - Days used.
  - Scenes practiced.
  - Phrases repeated.
  - Songs used.
  - Books read.
  - Tasks completed.
  - Child responses observed.
- Add one next-week suggestion.
- Avoid scores and achievement pressure.

Acceptance criteria:

- Weekly summary helps parent continue the routine.
- Summary rewards consistency rather than performance.

### P1: Personalization Rules

- Adjust plan by child age sub-stage.
- Adjust phrase difficulty by parent English comfort level.
- Prefer scenes selected by parent.
- Repeat content that parent marks as useful.
- Reduce plan size if parent repeatedly skips tasks.

Acceptance criteria:

- Daily plans feel relevant to the family routine.
- Product does not become too complex for tired parents.

### P2: Parent Pronunciation Support

- Add slow pronunciation for phrases.
- Add natural-speed pronunciation.
- Add simple pronunciation notes only where useful.
- Allow parent to replay audio before using the phrase offline.
- For static prototype, use browser Web Speech API with selectable English voices.
- For production-quality voice, evaluate cloud TTS providers and backend requirements.

Acceptance criteria:

- Parent can prepare quickly before speaking to the child.
- Audio supports parent confidence without turning the app into a child audio player.
- The product clearly communicates when TTS quality depends on the browser.

### Explicit Non-Goals for 0-18 Months

- No independent baby screen mode.
- No tapping games for infants.
- No formal vocabulary testing.
- No speaking requirement for the child.
- No fluency promises.
- No leaderboard or competitive progress.
- No long video-watching workflow.

Tasks:

1. Define core user flows.
   - Parent creates child profile.
   - Parent views today's plan.
   - Parent opens a scene phrase card.
   - Parent marks tasks as done.
   - Parent records child response.
   - Parent reviews weekly summary.

2. Define information architecture.
   - Home: today's plan.
   - Scenes: phrase library.
   - Songs: song list and usage records.
   - Books: picture book list and reading records.
   - Logs: task completion and child responses.
   - Growth: stage goals and weekly summary.
   - Parent: guidance and pronunciation support.

3. Define MVP data entities.
   - Child profile.
   - Learning stage.
   - Daily plan.
   - Scene phrase.
   - Song.
   - Picture book.
   - Task card.
   - Response log.
   - Weekly summary.

4. Define sample seed content.
   - 8 daily scenes.
   - 40-80 scene phrases.
   - 10 songs or chants.
   - 10 picture books.
   - 20 task cards.
   - 8 response log options.

5. Define MVP UX wireframe requirements.
   - First screen must show today's plan.
   - Parent can finish the main daily workflow within 1 minute of app interaction.
   - 0-18 month mode must not show independent child games.
   - Task completion and response logging must be quick.

6. Define acceptance criteria for MVP.
   - Parent can create and edit a child profile.
   - System can classify child age stage.
   - Parent can complete a daily plan.
   - Parent can browse phrases by scene.
   - Parent can record song/book/task usage.
   - Parent can record child response.
   - Parent can view a weekly summary.

## Milestone 2: MVP Implementation Planning

Objective:

Choose technical direction and prepare a small, low-risk implementation plan.

Tasks:

1. Decide application type.
   - Static web prototype.
   - Local-first web app.
   - Full-stack app with user accounts.

2. Decide data persistence.
   - Browser local storage for prototype.
   - Local database for personal use.
   - Cloud database for multi-device use.

3. Decide content strategy.
   - Hard-coded seed content for MVP.
   - Editable admin content.
   - AI-generated daily content with reviewed templates.

4. Decide whether AI is included in MVP.
   - No AI: fixed daily plan templates.
   - Light AI: generate parent phrases and plans.
   - Later AI: personalized recommendations after enough logs exist.

5. Define implementation phases.
   - Phase 1: static product shell and navigation.
   - Phase 2: child profile and age stage.
   - Phase 3: daily plan and task cards.
   - Phase 4: scenes, songs, and books.
   - Phase 5: response logs and weekly summary.
   - Phase 6: polish, verification, and documentation.

# Backlog

## Phase 2: 18-36 Month Parent-Child Interaction

- Add parent-led picture selection activities.
- Add listen-and-point prompts.
- Add TPR action games.
- Add simple object and color recognition.
- Add parent co-play instructions.

## Phase 3: 3-6 Interactive Listening and Speaking

- Add interactive picture-book mode.
- Add recording and replay.
- Add story comprehension prompts.
- Add theme-based games.
- Add rhyme and first-sound awareness activities.
- Add simple speaking prompts.

## Phase 4: 6-9 Phonics and Graded Reading

- Add letter sound curriculum.
- Add CVC word practice.
- Add digraph practice.
- Add sight words.
- Add graded reader library.
- Add read-aloud tracking.
- Add short sentence writing.

## Phase 5: 9-12 Knowledge Projects

- Add science and knowledge reading modules.
- Add project templates.
- Add presentation builder.
- Add English journal prompts.
- Add AI discussion support.
- Add writing feedback workflow.

## Future Product Capabilities

- Multi-child profiles.
- Parent pronunciation audio.
- Content import/export.
- Calendar view.
- Long-term growth timeline.
- Offline-first support.
- Multi-device sync.
- Privacy and data retention settings.
- Optional AI personalization.
- Optional speech recording with explicit consent.
