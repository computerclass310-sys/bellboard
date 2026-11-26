// Nightly reset: writes schedule.json back to the base schedule (DEFAULTS in index.html).
// Run by .github/workflows/reset-schedule.yml shortly after midnight (Riyadh) — before 3 AM.
// Only rewrites the file when it differs from the base, so quiet nights make no commit.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const m = html.match(/const DEFAULTS=(\{[\s\S]*?\n\});/);
if (!m) throw new Error('DEFAULTS not found in index.html');
const DEFAULTS = new Function('return ' + m[1])();
const k = html.match(/const SHARED_KEYS=(\[[^\]]*\])/);
if (!k) throw new Error('SHARED_KEYS not found in index.html');
const KEYS = new Function('return ' + k[1])();
const settings = {};
KEYS.forEach(key => { settings[key] = DEFAULTS[key]; });
const file = path.join(root, 'schedule.json');
let current = null;
try { current = JSON.parse(fs.readFileSync(file, 'utf8')).settings; } catch (e) {}
if (JSON.stringify(current) === JSON.stringify(settings)) { console.log('schedule.json already matches the base schedule'); process.exit(0); }
fs.writeFileSync(file, JSON.stringify({ updated: new Date().toISOString(), settings }, null, 2) + '\n');
console.log('schedule.json reset to the base schedule');
