# HelloLILI English Product Spec

## Product Positioning

HelloLILI English is a long-term family English enlightenment web service for one child growing from infancy to preteen age.

The product is not a screen-first English learning app for babies. Its core purpose is to help parents provide consistent, age-appropriate English input through daily routines, parent-child interaction, songs, picture books, reading, and later project-based learning.

Core definition:

> A family-centered, age-aware, parent-child English growth system that changes its learning mode as the child develops.

Stage positioning:

| Age | Primary User | Product Mode | Core Goal |
| --- | --- | --- | --- |
| 0-18 months | Parent | Parent assistant | Help parents speak, sing, and read English naturally in daily routines |
| 18-36 months | Parent + child | Parent-child interaction | Build comprehension of simple words, actions, and instructions |
| 3-6 years | Child + parent | Interactive listening and speaking | Build oral expression, picture-book understanding, rhythm, and phonological awareness |
| 6-9 years | Child | Phonics and graded reading | Build decoding, sight words, reading fluency, and early writing |
| 9-12 years | Child | Knowledge and project learning | Use English to learn, research, present, and express ideas |

## Education Principles

1. Low-screen principle for infants.
   - Before 18 months, the product should serve parents, not invite the child to independently use screens.
   - For 18-36 months, any child-facing interaction should be short, parent-led, and concrete.

2. Parent-first English input.
   - Parents are the main delivery channel for early English exposure.
   - The product should reduce the parent's burden of choosing what to say, sing, read, and repeat.

3. Routine-based learning.
   - Early English should be embedded into wake-up, diaper changing, feeding, play, bath time, going out, and bedtime.
   - Daily scenes are more important than abstract lessons for children under 3.

4. Repetition over novelty.
   - Children need repeated exposure to the same sounds, books, songs, and phrases.
   - The product should intentionally recycle content instead of constantly pushing new material.

5. Home language remains foundational.
   - English learning must not weaken Chinese language development or parent-child emotional communication.
   - English is an additional input stream, not a replacement for the family language.

6. Observation over testing in early years.
   - From 0-3 years, the product should use parent observation records instead of scores, rankings, or formal tests.

## Target Users

### Primary User: Parent

Current primary user is the father of a 9-month-old child.

Parent needs:

- Know what English to say today.
- Get short, usable English phrases for real-life situations.
- Learn how to pronounce phrases.
- Know which songs and picture books are suitable for the child's age.
- Record whether the child responded, listened, imitated, pointed, or showed interest.
- Maintain a long-term plan without creating anxiety.

### Secondary User: Child

The child becomes a direct product user gradually.

Child needs by age:

- 0-18 months: hear warm, repeated English from parents.
- 18-36 months: point, move, respond, imitate, and say simple words.
- 3-6 years: play, listen, repeat, answer, and describe pictures.
- 6-9 years: decode, read, retell, and write short sentences.
- 9-12 years: read knowledge content, discuss, write, and present.

## Product Scope

### MVP Scope

The first version should focus on the 0-3 age range and serve parents.

MVP goal:

> Help parents complete a small daily English routine with their child, track completion, and gradually build consistent English exposure.

MVP modules:

- Child profile
- Daily English plan
- Scene phrase library
- Song list
- Picture book list
- Parent pronunciation support
- Daily task cards
- Child response log
- Weekly summary

### Out of Scope for MVP

The first version should not include:

- Independent baby screen mode
- Complex child games
- Formal tests
- Rankings or competitive scoring
- Full phonics curriculum
- AI oral scoring
- Social feed
- Large course marketplace

These can be considered only after the parent-assistant workflow is validated.

## Initial Technical Direction

The first implemented homepage uses a static web approach:

- `index.html` for page structure.
- `styles.css` for responsive visual design.
- `app.js` for lightweight local interaction.
- Browser `localStorage` for temporary task and response state.
- Browser Web Speech API for temporary TTS.
- No framework, build step, backend, or package dependency yet.

This direction keeps the first product slice easy to open, inspect, and revise before committing to a full application stack.

Current homepage direction:

- Mobile-first. The product is primarily used on a phone by the parent.
- Keep the early flow extremely simple: one phrase, one offline routine, one response record.
- Avoid desktop-style dashboards for the infant stage.
- Expose secondary content through small entrances instead of showing many modules at once.

TTS limitation:

- Current TTS quality depends on the browser and operating system voices.
- The static version can offer selectable local English voices and speech rate.
- Higher-quality voices require a backend integration with a cloud TTS provider.

## Core User Journey

### Daily Parent Journey

1. Parent opens the app.
2. App shows today's short English plan.
3. Parent chooses one or more daily scenes, such as bath time or bedtime.
4. App provides 3-8 English phrases, pronunciation, and interaction tips.
5. Parent uses the phrases with the child offline.
6. Parent marks tasks as done and records the child's response.
7. App schedules repetition and shows weekly progress.

### Example for 9-Month-Old Child

Daily plan:

- Scene: bath time
- Phrases:
  - Wash your hands.
  - Splash splash.
  - Where is your duck?
  - The duck is yellow.
  - Bath time is over.
- Song: Row, Row, Row Your Boat
- Book: Brown Bear, Brown Bear, What Do You See?
- Observation:
  - Looked at parent
  - Smiled
  - Imitated sound
  - Reached for book

## Functional Requirements

### 1. Child Profile

Purpose:

Create a basic profile so the product can recommend age-appropriate content.

Required fields:

- Child name or nickname
- Date of birth
- Current age auto-calculated from date of birth
- Home language
- Parent English level
- Daily available time
- Child interests
- Current stage

Acceptance criteria:

- Parent can create and edit a child profile.
- Product can classify the child into a learning stage by age.
- Product can use the profile to adjust daily plans.

### 2. Daily English Plan

Purpose:

Give parents a small, actionable plan every day.

Plan should include:

- Today's scene
- 3-8 useful phrases
- One song or chant
- One picture book suggestion
- One parent-child interaction task
- One observation prompt
- Estimated duration

Acceptance criteria:

- Plan can be completed in 5-15 minutes for 0-18 months.
- Plan avoids child-facing screen interaction before 18 months.
- Plan includes repeated content from previous days.
- Parent can mark each item as done or skipped.

### 3. Scene Phrase Library

Purpose:

Provide English phrases organized by real family situations.

Initial scenes:

- Wake up
- Diaper change
- Feeding
- Bath time
- Play time
- Going out
- Bedtime
- Comforting emotions

Each phrase should include:

- English text
- Chinese meaning
- Suggested usage context
- Parent pronunciation support
- Optional replacement words

Acceptance criteria:

- Parent can browse phrases by scene.
- Parent can save phrases for repeated use.
- Phrases are short and spoken-language oriented.
- Phrases are suitable for the child's stage.

### 4. Songs and Chants

Purpose:

Use rhythm and repetition to build sound familiarity.

Song entry should include:

- Title
- Suitable age range
- Scene recommendation
- Key words
- Movement suggestions
- Repetition frequency

Acceptance criteria:

- Parent can see recommended songs for the child's stage.
- Parent can mark a song as used.
- Product can repeat the same song over time.

### 5. Picture Book Library

Purpose:

Support parent-child English reading from infancy onward.

Book entry should include:

- Title
- Suitable age range
- Core sentence patterns
- Key words
- Reading tips
- Interaction prompts
- Reading history

Acceptance criteria:

- Parent can select, mark, and review books.
- Product can recommend simple board books for 0-3 years.
- Product can encourage rereading instead of only new books.

### 6. Task Cards

Purpose:

Turn the daily plan into concrete offline actions.

Task examples:

- Say "Good morning" three times during wake-up.
- Sing one English song with actions.
- Read one board book before sleep.
- Ask "Where is the ball?" during play.

Acceptance criteria:

- Each task is small and specific.
- Parent can complete a task without preparing materials.
- Task completion updates the daily and weekly records.

### 7. Child Response Log

Purpose:

Track development through parent observation, not testing.

Observation options for 0-3:

- Looked at parent
- Smiled or laughed
- Reached for object
- Pointed
- Imitated sound
- Responded to gesture
- Followed simple instruction
- Said a word or phrase

Acceptance criteria:

- Parent can record responses in under 30 seconds.
- Logs can be viewed by week.
- Product uses response history to adjust recommendations.

### 8. Parent Support Area

Purpose:

Help parents understand how to use English naturally at home.

Content areas:

- How to read picture books
- How to use English without translating every word
- How to repeat without pressure
- How to handle no response from the child
- Common pronunciation guidance

Acceptance criteria:

- Guidance is short and practical.
- Advice does not create performance anxiety.
- Guidance reinforces low-screen and parent-child interaction principles.

### 9. Weekly Summary

Purpose:

Show progress through family behavior and exposure consistency.

Weekly summary should include:

- Days used
- Tasks completed
- Scenes practiced
- Songs repeated
- Books read
- Phrases used
- Child responses observed
- Suggested focus for next week

Acceptance criteria:

- Summary emphasizes consistency, not scores.
- Summary gives one clear next action.
- Summary can help parents continue the routine.

## Non-Functional Requirements

### Product Tone

- Calm
- Practical
- Parent-friendly
- Non-anxious
- Developmentally appropriate

### UI Direction

- Early versions should feel like a mobile parent companion, not a desktop dashboard or children's game.
- Daily actions should be visible immediately on the first screen.
- The interface should be simple enough for tired parents to use quickly.
- Avoid decorative complexity that distracts from daily execution.
- For 0-18 months, the first screen should answer: what do I say, how do I do it offline, and what do I record?

### Privacy

- Child information should be treated as sensitive personal data.
- The product should collect only necessary information in early versions.
- Any future audio recording feature must have clear consent and retention rules.

### Content Quality

- Phrases must be natural spoken English.
- Content must match the child's age and development stage.
- Product should avoid exaggerated claims about fluency or early achievement.

## Success Metrics

### MVP Product Metrics

- Weekly active parent usage
- Daily plan completion rate
- Task completion rate
- Scene phrase usage count
- Song repetition count
- Picture book reading count
- Child response log count
- 4-week parent retention

### Education-Oriented Metrics

For 0-3 years:

- Child accepts English songs and routines.
- Child responds to repeated English phrases.
- Child shows attention to picture books.
- Child imitates sounds or actions.
- Child gradually understands simple instructions.

For later stages:

- Child speaks words and phrases.
- Child retells simple stories.
- Child recognizes letter sounds.
- Child reads graded books.
- Child uses English for projects and knowledge learning.

## Product Roadmap

### Phase 1: 0-3 Parent Assistant

Build the parent-facing foundation:

- Child profile
- Daily plan
- Scene phrases
- Songs
- Picture books
- Task cards
- Response logs
- Weekly summary

### Phase 2: 18-36 Month Parent-Child Interaction

Add short, parent-led interactive activities:

- Picture selection
- Listen-and-point games
- TPR action games
- Simple object recognition
- Parent-child prompts

### Phase 3: 3-6 Interactive Listening and Speaking

Add child-facing but still guided interactions:

- Interactive picture books
- Recording and replay
- Story questions
- Theme games
- Rhyme and first-sound games

### Phase 4: 6-9 Phonics and Reading

Add structured reading learning:

- Letter sounds
- CVC words
- Digraphs
- Sight words
- Graded reading
- Simple writing

### Phase 5: 9-12 Knowledge Projects

Add content-based English learning:

- Science and knowledge readings
- Project templates
- Speaking presentations
- English journals
- AI conversation support

## Key Risks

1. Parents may not continue if daily tasks are too large.
   - Mitigation: keep daily plans short and concrete.

2. The product may accidentally become a screen app for babies.
   - Mitigation: lock 0-18 months into parent assistant mode.

3. Content may become too broad too early.
   - Mitigation: MVP focuses only on 0-3 parent workflow.

4. Parents may expect visible English output too soon.
   - Mitigation: educate parents that infancy is an input and bonding stage.

5. English learning may compete with Chinese language growth.
   - Mitigation: position English as additional exposure, not replacement.
