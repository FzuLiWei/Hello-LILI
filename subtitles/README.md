# Subtitle Import Format

This folder is the working area for per-song timed subtitles.

Use one JSON file per song when a verified subtitle source is available:

```text
subtitles/<youtubeId>.json
```

Each file should follow `_template.json`:

```json
{
  "youtubeId": "VIDEO_ID",
  "title": "Song title",
  "source": "official captions / user transcript / manually verified",
  "status": "timed",
  "cues": [
    {
      "start": 0,
      "end": 4,
      "en": "English line",
      "zh": "Chinese translation"
    }
  ]
}
```

Rules:

- `start` and `end` are seconds from the video start.
- `end` must be greater than `start`.
- Every cue must include both `en` and `zh`.
- Use verified subtitles, user-provided transcripts, or manual family transcripts.
- Do not add low-confidence lyrics just to mark a song as complete.

Current state:

- Timed bilingual captions are loaded from `subtitles_data.js` for the first completed songs.
- `Row Row Row Your Boat` is loaded from a standalone subtitle file at `subtitles/7otAJa3jui8.json`.
- `Baa Baa Black Sheep` is loaded from a standalone subtitle file at `subtitles/CRHvTTOR8Ns.json`.
- `Hickory Dickory Dock` is loaded from a standalone subtitle file at `subtitles/HGgsklW-mtg.json`.
- `Humpty Dumpty` is loaded from a standalone subtitle file at `subtitles/nrv495corBc.json`.
- `Pat-A-Cake` is loaded from a standalone subtitle file at `subtitles/jdg50KzCR9w.json`.
- `Rain Rain Go Away` is loaded from a standalone subtitle file at `subtitles/LFrKYjrIDs8.json`.
- `Old MacDonald Had A Farm` is loaded from a standalone subtitle file at `subtitles/5oYKonYBujg.json`.
- `Hush Little Baby` is loaded from a standalone subtitle file at `subtitles/f_raDpgx_3M.json`.
- `Five Little Ducks` is loaded from a standalone subtitle file at `subtitles/pZw9veQ76fo.json`.
- `Open Shut Them` is loaded from a standalone subtitle file at `subtitles/rfLLlxgE8nk.json`.
- `Where Is Thumbkin？` is loaded from a standalone subtitle file at `subtitles/TCoQ_2WWwxQ.json`.
- `The Wheels On The Bus` is loaded from a standalone subtitle file at `subtitles/9UasekNr8KI.json`.
- `The Muffin Man` is loaded from a standalone subtitle file at `subtitles/fXFg5QsTcLQ.json`.
- `Walking In The Jungle` is loaded from a standalone subtitle file at `subtitles/GoSq-yZcJ-4.json`.
- `We All Fall Down` is loaded from a standalone subtitle file at `subtitles/JRMAptlBgTk.json`.
- `Walking Walking` is loaded from a standalone subtitle file at `subtitles/P-uznC3AmaE.json`.
- `Ten In The Bed` is loaded from a standalone subtitle file at `subtitles/TdDypyS_5zE.json`.
- `The Shape Song #1` is loaded from a standalone subtitle file at `subtitles/TJhfl5vdxp4.json`.
- `The Pinocchio` is loaded from a standalone subtitle file at `subtitles/JV-D_K4drsA.json`.
- `Good Morning, Mr. Rooster` is loaded from a standalone subtitle file at `subtitles/1Ziku4FLka4.json`.
- `Rock-A-Bye Little One` is loaded from a standalone subtitle file at `subtitles/1jX8XyYvtWs.json`.
- `This Is The Way` is loaded from a standalone subtitle file at `subtitles/4XLQpRI_wOQ.json`.
- `My Teddy Bear` is loaded from a standalone subtitle file at `subtitles/666UZRBO5q8.json`.
- `The Bath Song` is loaded from a standalone subtitle file at `subtitles/aUgy3u5Mvzk.json`.
- `Driving In My Car` is loaded from a standalone subtitle file at `subtitles/BdrZWu2dZ4c.json`.
- `One Little Finger` is loaded from a standalone subtitle file at `subtitles/EqVHR2vIwIE.json`.
- `Head Shoulders Knees & Toes (Learn It)` is loaded from a standalone subtitle file at `subtitles/lMQcwNZVUO8.json`.
- `Peekaboo` is loaded from a standalone subtitle file at `subtitles/lVFj91Z1AfM.json`.
- `Sweet Dreams (Goodnight Song)` is loaded from a standalone subtitle file at `subtitles/OKbpLQp509Y.json`.
- `Skidamarink` is loaded from a standalone subtitle file at `subtitles/ug1pI-Ephns.json`.
- `If You're Happy` is loaded from a standalone subtitle file at `subtitles/wqvQAcloTRQ.json`.
- `What Do You Hear?` is loaded from a standalone subtitle file at `subtitles/YVgv1EFJZHc.json`.
- `The Animals On The Farm` is loaded from a standalone subtitle file at `subtitles/zXEq-QO3xTg.json`.
- `Going on a Bear Hunt` is loaded from a standalone subtitle file at `subtitles/5_ShP3fiEhU.json`.
- `SHAKE BREAK` is loaded from a standalone subtitle file at `subtitles/7oOaPVq07g8.json`.
- `Are You Sleeping, Baby Bear?` is loaded from a standalone subtitle file at `subtitles/chxQb4YRC2U.json`.
- `Beddy-Bye Butterfly` is loaded from a standalone subtitle file at `subtitles/ij_eHTvhIlE.json`.
- `One Foot Then The Next Foot` is loaded from a standalone subtitle file at `subtitles/JXIILWwaHQc.json`.
- `I See Something Blue` is loaded from a standalone subtitle file at `subtitles/jYAWf8Y91hA.json`.
- `Super Simple Lullaby Medley` is loaded from a standalone subtitle file at `subtitles/WQtbFDPOdT8.json`.
- `Baby Shark Dance` is loaded from a standalone subtitle file at `subtitles/XqZsoesa55w.json`.
- `Nap Time` is loaded from a standalone subtitle file at `subtitles/Yq6qYbwqAk8.json`.
- `The ABC Song` is loaded from a standalone subtitle file at `subtitles/75p-N9YKqNo.json`.
- `Please and Thank You Song` is loaded from a standalone subtitle file at `subtitles/ANChOA4SyL0.json`.
- `Phonics Song 2` is loaded from a standalone subtitle file at `subtitles/ffeZXPtTGC4.json`.
- `Do You Like Broccoli Ice Cream?` is loaded from a standalone subtitle file at `subtitles/frN3nvhIHUk.json`.
- `Yes Yes Vegetables Song` is loaded from a standalone subtitle file at `subtitles/ohHYABXMqUQ.json`.
- `Clean Up Song` is loaded from a standalone subtitle file at `subtitles/SFE0mMWbA-Y.json`.
- `Brush Your Teeth` is loaded from a standalone subtitle file at `subtitles/wCio_xVlgQ0.json`.
- `See It, Say It, Sign It` is loaded from a standalone subtitle file at `subtitles/WP1blVh1ZQM.json`.
- `The Itsy Bitsy Spider + More` is loaded from a standalone subtitle file at `subtitles/TbKI-jjpPx8.json`.
- New timed files can be registered in `subtitles/catalog.js` by adding `file: "subtitles/<youtubeId>.json"` to the matching song entry.
- All 54 local songs now have timed bilingual caption files registered in `subtitles/catalog.js`.

## Source Tracking

`sources.js` tracks the subtitle work queue separately from the runtime catalog.

- `catalog.js` means "the app can load timed cues now".
- `sources.js` means "we know where this song stands in the subtitle workflow".

Do not mark a song as complete in `catalog.js` until there is a verified timed cue file.

## Import Workflow

Use the importer when a verified `.srt`, `.vtt`, or project-format `.json` file is available:

```bash
node scripts/import-subtitle.js --id VIDEO_ID --input path/to/file.srt --title "Song title" --source "source note"
```

This writes:

```text
subtitles/VIDEO_ID.json
```

To also register the song in the runtime catalog:

```bash
node scripts/import-subtitle.js --id VIDEO_ID --input path/to/file.srt --title "Song title" --source "source note" --register
```

The importer expects each SRT/VTT cue to include English and Chinese text:

```text
00:00:01.000 --> 00:00:04.000
English line
Chinese translation
```

One-line split format is also supported:

```text
00:00:01.000 --> 00:00:04.000
English line | Chinese translation
```

After every import, run:

```bash
node scripts/validate-subtitles.js
```
