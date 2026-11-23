# BellBoard — UI design guide

School period display screen. Arabic, right-to-left (`dir="rtl"`, `lang="ar"`).
Live app: https://computerclass310-sys.github.io/bellboard/ (short: https://tinyurl.com/bellboard-sss)

## Screens (see `screens/`)

| File | What it shows |
|---|---|
| 01, 03 | Green theme — desktop / laptop |
| 02, 04 | Airport (departures board) theme — desktop / laptop |
| 05, 06 | Phone portrait — green / airport |
| 07, 08 | Period start: current row flashes (green: yellow; airport: blue) |
| 09 | Bottom toolbar opened from the round toggle (bottom-left) |
| 10, 11, 12 | Settings panel (sticky header with round close ×) |
| 13 | Weekend (Friday/Saturday) — green and airport |
| 14 | "انتهى اليوم الدراسي" end-of-day full-screen message |

## Font
- **Tajawal** (Google Fonts) — weights 400, 500, 700, 800, 900. Used everywhere.
- Times in the schedule use Latin digits (`07:15`); the clock and dates use Arabic-Indic digits (`٩:٥٠ ص`).

## Colours

### Green theme
| Token | Value | Use |
|---|---|---|
| Background | radial-gradient(circle at 50% 0%, `#145b48`, `#002f2a`) | page |
| Header band | linear-gradient(`rgba(0,0,0,.10)` → `rgba(0,0,0,.22)`) + shadow | full-width top band |
| School name chip | glass: linear-gradient(`rgba(6,70,55,.78)` → `rgba(0,38,32,.62)`), border `rgba(140,230,190,.32)`, radius 10px, white text | |
| Accent (yellow) | `#ffe044` | current period title, times, end-of-day row |
| Text | `#f2faf6` | |
| Cards | background `rgba(255,255,255,.06)`, border `rgba(255,255,255,.14)`, radius 20px, shadow `0 12px 32px rgba(0,0,0,.25)` | clock card + schedule card |
| Current row | background `rgba(255,224,68,.14)` + 4px yellow inner bar on the right | |
| Row flash | alternates `#ffe044` (text `#07332e`) ↔ `rgba(255,224,68,.14)` every 0.4s for 15s | period start |

### Airport theme
| Token | Value |
|---|---|
| Page | radial-gradient(ellipse at 50% -10%, `#3a4257`, `#151a26` 45%, `#06080d`) |
| Board frame | linear-gradient(`#141518`, `#0a0a0c`), border `#2a2c31`, radius 12px |
| Screen | `#08152b`, border 4px `#1c1f26` |
| Header bar | linear-gradient(`#38bdf0` → `#1590cf` → `#0f7ab5`) |
| Column headers | `#5ccaf0`, text `#05223a` |
| Rows | alternating `#0e1f3b` / `#132a4e`; current `#1b4a7a` |
| Row flash | `#1fa3e0` ↔ `#0e2a4d` |
| Status chips | past: outline `#2b4566` text `#7d93ad` · now: `#1fbf5b` (blinks) · next: white · later: outline `#2a6c93` text `#5ccaf0` · end: white |

## Components
- **Current period title**: large (≈63px on 1366 wide), weight 800, centred, never animated.
- **Schedule card**: rows `time | period name` (green) or `time | period | until | status` (airport). Row padding 9px 16px, thin separators `rgba(255,255,255,.08)`.
- **Clock card (green)**: railway-station analog clock (off-white face `#f3eee4`, navy rim `#1b2138`, 60 minute ticks, bar hands, no second hand), then digital time (yellow, 40px, 800), weekday, a thin rule, Hijri date (Umm al-Qura).
- **Airport header**: bell sign (white rounded square, black bell) + «الحصص / SCHEDULE» on the right; small white analog clock with red second hand + digital time on the left.
- **Bottom controls**: round glass toggle (38px, bottom-left) that reveals a glass pill toolbar (نداء · ملء الشاشة · ⚙︎) for 4s; round glass sound button bottom-right (speaker / speaker-× icons).
- **Glass style**: background linear-gradient(`rgba(255,255,255,.22)` → `rgba(255,255,255,.06)`), `backdrop-filter: blur(12px) saturate(160%)`, border `rgba(255,255,255,.35)`, inset top highlight, drop shadow; pressed = scale(.96) + inner shadow.
- **Settings**: white panel (max 672px, radius 16px), sticky header with title right and round × close left; yellow buttons in green theme.

## Layout rules
- Whole board scales to fit the screen — **no scrolling ever**.
- Margins: ~4% left/right, ~6% bottom (keeps the toolbar clear), green: header band at top.
- Phone portrait: clock card on top (clock beside time/date), schedule full width below; airport hides the "until" column.
- Phone landscape: compact mode (no school header, smaller clock).

## Assets
- `icons/` — app icon (split blue/green with gold bell + clock), favicon, home-screen icons.
- `logo/` — BellBoard wordmark (first **B** yellow, second **B** blue).
- `sounds/chime.mp3` — airport chime (played before and after the spoken announcement).
