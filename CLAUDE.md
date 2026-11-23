# BellBoard — notes for Claude Code

School period display screen (Arabic, RTL) published with GitHub Pages:
https://computerclass310-sys.github.io/bellboard/ (short link: https://v.gd/bellboard)

## Layout
- `index.html` — the whole app (HTML + CSS + JS in one file, no build step).
- `manifest.webmanifest`, `icons/` — home-screen app name and icons.

## Publishing
- Commit and push to `main`; GitHub Pages redeploys in about a minute.
- **Always bump `APP_VERSION`** in `index.html` (and the matching "الإصدار …" text in settings)
  with every change — open screens compare it and reload themselves automatically.

## Behaviour to keep
- Flashing (period start) is only inside the schedule table — never the title/banner.
- Two themes: green (classic) and airport board; the layout scales to any screen with no scrolling,
  and has portrait (phone) and short-landscape modes.
- Schedule: Sun/Mon 7 periods (end 13:30), Tue–Thu 6 periods (end 12:40).
- Call screen opens automatically N minutes (default 5) before the day's end; it can be turned off in settings.
- School name is fixed and not editable in settings.
- User text is escaped before rendering; the call URL must be http(s); saved settings are sanitised.
- Shared schedule: `schedule.json` in this repo is the single source for the schedule, call on/off,
  minutes-before and return time. Every device fetches it on open, on return to the tab and every 15 seconds.
  Publishing from settings writes it via the GitHub contents API using a fine-grained token typed into
  settings and kept only in that device's localStorage (never commit a token).
  Unpublished local edits are kept (marked "dirty") and are not overwritten by the shared file.
- Device-only settings (localStorage): theme, sound on/off, fallback voice, "today only" override.
