# BellBoard — notes for Claude Code

School period display screen (Arabic, RTL) published with GitHub Pages:
https://computerclass310-sys.github.io/bellboard/ (short link: https://tinyurl.com/bellboard-sss)

## Layout
- `index.html` — the whole app (HTML + CSS + JS in one file, no build step).
- `manifest.webmanifest`, `icons/` — home-screen app name and icons.
- `legacy.js` — **generated**: the app script compiled to ES5 + polyfills for old browsers (loaded by the ES5
  compatibility probe in `<head>` when async/fetch/Promise are missing). **Rebuild after every change to
  `index.html`**: `cd tools/legacy && npm install && npm run build` (also checks the output parses as ES5).
  Test it with `?legacy=1`.
- `ui-kit/` — screenshots, design guide (`DESIGN.md`) and a ready Lovable prompt (`LOVABLE_PROMPT.md`).
  Re-capture the screenshots when the UI changes.

## Publishing
- Commit and push to `main`; GitHub Pages redeploys in about a minute.
- **Always bump `APP_VERSION`** in `index.html` (and the matching "الإصدار …" text in settings)
  with every change — open screens check it every 15 s (outside school hours) (GitHub API + ETag, falling back to the site),
  wait until the site serves the new version, then reload via `?v=<version>`.

## Behaviour to keep
- Flashing (period start) is only inside the schedule table — never the title/banner. Airport row flashes blue (#1fa3e0 ↔ #0e2a4d).
- Announcement = `sounds/chime.mp3` → spoken text → `sounds/chime.mp3` (built-in synth chime only as fallback).
  Spoken text is played from a **recording** when `sounds/voice/index.json` maps the phrase to a file in
  `sounds/voice/` (decoded and played like the chime — works wherever the chime works); otherwise the browser's
  speech engine is used as a fallback. Recordings are generated with ElevenLabs (female Arabic voice `NfdaqpoTPn7nF7WBBRTv`, model `eleven_multilingual_v2`, stability 0.65, similarity 0.8) and checked by transcribing them back.
  Schedule changes (sync/settings) must not trigger an announcement: `save()` resets `lastAnnounced`.
- Speech waits for voices to load and uses the chosen voice's own `lang` (else iOS falls back to its default male voice).
  A reload loses the browser's permission to speak, so app updates are **not** auto-applied during school hours
  (`inSchoolHours()`), only after the day ends. If speech is blocked (`not-allowed`) a red "tap to enable" hint shows;
  a stuck engine is retried once; settings show the last speech result (`lastSpeech`).
  The silent unlock utterance at load detects a blocked engine early, so the hint shows before the first period.
- Only one open copy per device announces a period start (`announceOnce`: Web Locks, localStorage fallback).
- One audio channel: never two sounds at once. `stopAllSound()` cancels chime + speech + pending steps;
  a new announcement is ignored while one plays; the auto call screen stops any announcement, plays the
  chime, then opens (so the call page's own sound never overlaps ours); turning sound off stops everything.
- Two themes: green (classic) and airport board; the layout scales to any screen with no scrolling,
  and has portrait (phone) and short-landscape modes.
- Schedule: Sun/Mon 7 periods (end 13:30), Tue–Thu 6 periods (end 12:40). Weekend = Friday + Saturday (no schedule, sound or call).
- Must keep working with no text-to-speech, no storage, offline or API down — guard with `HAS_TTS()`; `render` runs inside `safeRender`.
- Call screen opens automatically N minutes (default 5) before the day's end; it can be turned off in settings.
- School name is fixed and not editable in settings.
- User text is escaped before rendering; the call URL must be http(s); saved settings are sanitised.
- Shared schedule: `schedule.json` in this repo is the single source for the schedule, call on/off,
  minutes-before and return time. Every device reads it from the GitHub contents API (ETag, 304 when unchanged) every 3 seconds, on open, on focus, when back online and on return to the tab, falling back to the Pages copy when the API is rate-limited.
  Publishing from settings writes it via the GitHub contents API using a fine-grained token typed into
  settings and kept only in that device's localStorage (never commit a token).
  Unpublished local edits are kept (marked "dirty") and are not overwritten by the shared file.
- Nightly reset: `.github/workflows/reset-schedule.yml` (00:07 and 01:37 Riyadh, before 3 AM) runs
  `tools/reset-schedule.js`, which rewrites `schedule.json` to `DEFAULTS` from `index.html` (only when it differs).
  The base schedule is therefore `DEFAULTS` — change it there. On a device, unpublished edits from an earlier day
  are dropped (`dropStaleEdits`, `ss-dirty-day`) so every day starts from the shared schedule.
- Device-only settings (localStorage): theme, sound on/off, voice gender (default female, like the original; pitch raised when only male Arabic voices exist) and specific voice, "today only" override — **always off**: the option is hidden, any saved one is cleared at load, and the checkbox handler forces it off.
