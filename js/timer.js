// gets the local time in LA timezone and displays it in the format "HH:MM:SS (UTC ±hh:mm)"
function getUTCOffset(timeZone) {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate  = new Date(now.toLocaleString('en-US', { timeZone }));
    const diff    = (tzDate - utcDate) / 3600000; // hours
    const sign    = diff >= 0 ? '+' : '-';
    const abs     = Math.abs(diff);
    const h       = String(Math.floor(abs)).padStart(2, '0');
    const m       = String((abs % 1) * 60).padStart(2, '0');
    return `UTC ${sign}${h}:${m}`;
}

function updateLocalTime() {
    const tz   = 'America/Los_Angeles';
    const now  = new Date();
    const h    = String(now.toLocaleString('en-US', { timeZone: tz, hour: 'numeric',   hour12: false })).padStart(2, '0');
    const m    = String(now.toLocaleString('en-US', { timeZone: tz, minute: 'numeric'              })).padStart(2, '0');
    const s    = String(now.toLocaleString('en-US', { timeZone: tz, second: 'numeric'              })).padStart(2, '0');
    const off  = getUTCOffset(tz);
    const el   = document.getElementById('localTime');
    if (el) el.textContent = `${h}:${m}:${s} (${off})`;
}

updateLocalTime();

setInterval(updateLocalTime, 1000); // update every second
