# Prompt for Lovable

Attach the screenshots from `screens/` (at least 01, 02, 05, 07, 09, 10) to the first message, then paste the prompt below.
Tip: send it in two steps — first the main screens, then the settings panel — Lovable handles smaller steps better.

---

Build **BellBoard**, a full-screen school period display in **Arabic, right-to-left** (`dir="rtl"`), matching the attached screenshots exactly. Use the **Tajawal** font (Google Fonts, weights 400–900). No scrolling ever: the whole layout scales to fit any screen (TV, laptop, phone).

**Data (default schedule, Sunday–Thursday; Friday and Saturday are the weekend):**
- Every school day: 07:15 الحصة الأولى · 08:05 الحصة الثانية · 08:55 الحصة الثالثة · 09:45 الفسحة · 10:10 الحصة الرابعة · 11:00 الحصة الخامسة · 11:50 الحصة السادسة
- Sunday & Monday add: 12:40 الحصة السابعة · 13:30 نهاية اليوم الدراسي
- Tuesday–Thursday add: 12:40 نهاية اليوم الدراسي
- School name (fixed): الثانوية الثانية بالخبر

**Two themes (toggle in settings, remembered per device):**

1. **Green (screenshots 01/03/05)** — background radial gradient #145b48 → #002f2a. A full-width darker header band with the school name in a dark-green glass chip, centred. Below it the current period name, very large, yellow #ffe044, weight 800. Then two glass cards side by side (bg rgba(255,255,255,.06), border rgba(255,255,255,.14), radius 20px): on the right the schedule (time in yellow, period name in white, thin separators, the current row highlighted with a soft yellow background and a 4px yellow bar on its right edge, the end-of-day row in yellow); on the left a railway-station analog clock (off-white face #f3eee4, navy rim, 60 minute ticks, bar hands, no second hand), under it the digital time in yellow, the weekday, a thin line and the Hijri date (Umm al-Qura calendar, Arabic digits). On phones the clock card goes on top (clock beside the text) and the schedule below.

2. **Airport departures board (screenshots 02/04/06)** — dark board frame; top: bell sign + «الحصص / SCHEDULE» on the right, small white analog clock (red second hand) + digital time on the left; a sky-blue gradient header bar (#38bdf0 → #0f7ab5) with the school name and «TIMETABLE» + weekday tag; a dark banner with the current period and a green «الآن» tag; a table with light-blue column headers (الوقت TIME · الحصة PERIOD · حتى UNTIL · الحالة STATUS), alternating navy rows (#0e1f3b / #132a4e), current row #1b4a7a, status chips: انتهت (muted outline), الآن (green, blinking), التالية (white), قادمة (blue outline), نهاية الدوام (white). Footer: weekday | Hijri date.

**Behaviour:**
- Highlight the current period from the device clock; before the first period show «قبل بداية اليوم الدراسي», on Friday/Saturday «إجازة نهاية الأسبوع».
- At each period start: flash **only the current table row** for 15 seconds (green: yellow ↔ soft; airport: #1fa3e0 ↔ #0e2a4d). Titles never blink.
- Announcement at each period start: play `chime.mp3`, then speak the row text (e.g. «تبدأ الآن الحصة الثانية») with the browser's Arabic speech (prefer a female voice), then the chime again. Never two sounds at once.
- 5 minutes before the end of the school day, open a full-screen "call" page (an iframe URL from settings) after the chime; at 16:00 replace it with a full-screen message «انتهى اليوم الدراسي»; clear it at midnight.
- Bottom-left: a round glass toggle button that reveals a glass pill toolbar for 4 seconds (نداء · ملء الشاشة · settings gear). Bottom-right: a round glass sound on/off button.

**Settings panel (screenshots 10–12):** white panel, max width 672px, radius 16px, sticky header with «الإعدادات» on the right and a round × close button on the left. Sections: «تغيير عارض لهذا اليوم فقط» checkbox, «طابع شاشة المطار» checkbox, editable rows (time + announcement text + حذف) for: all days, Sunday–Monday only, Tuesday–Thursday only, each with an add button; school name shown read-only; «تمكين الربط بشاشة النداء» checkbox with minutes-before field; return time; voice (female/male); buttons «تجربة فتح شاشة النداء», «تجربة التنبيه والصوت», «إرجاع الجدول الأساسي» (two-tap confirm). Save settings in localStorage.

Use the exact colours above; glass buttons use a white translucent gradient, `backdrop-filter: blur(12px)`, a thin white border and a soft shadow.
