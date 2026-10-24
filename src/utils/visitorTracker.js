// Unique Visitor Tracker with Device Deduplication & Telegram Notifications

const COUNTER_KEY = 'dharun_portfolio_unique_visitors_2026';
const STORAGE_KEY = 'dharun_portfolio_unique_device_v1';

const getEnvVar = (val) => (val || '').replace(/['";]/g, '').trim();

function getDeviceAndOS() {
  const ua = navigator.userAgent || '';
  let os = 'Unknown OS';
  let deviceType = 'Desktop';

  if (/Mobile|Android|iPhone|iPod/i.test(ua)) {
    deviceType = 'Mobile';
  } else if (/iPad|Tablet/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))) {
    deviceType = 'Tablet';
  }

  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  return { deviceType, os };
}

function getBrowser() {
  const ua = navigator.userAgent || '';
  if (/Edg\//i.test(ua)) return 'Microsoft Edge';
  if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) return 'Google Chrome';
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return 'Safari';
  if (/Firefox\//i.test(ua)) return 'Firefox';
  if (/Opera|OPR\//i.test(ua)) return 'Opera';
  return 'Browser';
}

async function sendTelegramAlert(data) {
  const token = getEnvVar(import.meta.env.VITE_TELEGRAM_BOT_TOKEN);
  const chatId = getEnvVar(import.meta.env.VITE_TELEGRAM_CHAT_ID);

  if (!token || !chatId) {
    return;
  }

  const escapeHtml = (str) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const message = `
🚀 <b>New Unique Visitor on Portfolio!</b> (#${data.visitorNumber || 'New'})

🌐 <b>IP Address:</b> <code>${escapeHtml(data.ip)}</code>
🏢 <b>ISP / Network:</b> ${escapeHtml(data.isp || 'N/A')}
📍 <b>Location:</b> ${escapeHtml(data.location)}
📱 <b>Device:</b> ${escapeHtml(data.deviceType)} (${escapeHtml(data.os)})
🌐 <b>Browser:</b> ${escapeHtml(data.browser)} (${escapeHtml(data.language)})
📐 <b>Screen:</b> ${escapeHtml(data.screen)}
🔗 <b>Referrer:</b> ${escapeHtml(data.referrer)}
🕒 <b>Time:</b> ${escapeHtml(data.timestamp)}
`.trim();

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.warn('Telegram notification skipped:', err);
  }
}

export async function initVisitorTracking() {
  const hasVisited = localStorage.getItem(STORAGE_KEY);

  // If already visited on this device/browser, only fetch current count (no notification)
  if (hasVisited) {
    try {
      const res = await fetch(`https://countapi.mileshilliard.com/api/v1/get/${COUNTER_KEY}`);
      const data = await res.json();
      return typeof data?.value === 'number' ? data.value : null;
    } catch {
      return null;
    }
  }

  // BRAND NEW UNIQUE VISITOR
  // 1. Immediately flag device so rapid refreshes don't double count
  localStorage.setItem(STORAGE_KEY, Date.now().toString());

  // 2. Increment counter
  let newCount = null;
  try {
    const countRes = await fetch(`https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`);
    const countData = await countRes.json();
    if (typeof countData?.value === 'number') {
      newCount = countData.value;
    }
  } catch (err) {
    console.warn('Counter increment error:', err);
  }

  // 3. Fetch visitor telemetry (IP, location, ISP)
  let geo = null;
  try {
    const geoRes = await fetch('https://ipwho.is/');
    geo = await geoRes.json();
  } catch {
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      geo = { ip: ipData.ip };
    } catch {
      geo = { ip: 'Unknown' };
    }
  }

  const { deviceType, os } = getDeviceAndOS();
  const browser = getBrowser();
  const location = geo && geo.city ? `${geo.city}, ${geo.region || ''}, ${geo.country || ''}`.replace(/,\s*,/g, ',') : 'Unknown';
  const isp = geo?.connection?.isp || geo?.connection?.org || geo?.isp || 'Unknown';
  const screen = typeof window !== 'undefined' ? `${window.screen?.width || 0}x${window.screen?.height || 0}` : 'Unknown';
  const language = typeof navigator !== 'undefined' ? navigator.language || 'en' : 'en';
  const referrer = (typeof document !== 'undefined' && document.referrer) ? document.referrer : 'Direct / Bookmark';

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 4. Send Telegram alert ONLY for this new visitor
  await sendTelegramAlert({
    visitorNumber: newCount,
    ip: geo?.ip || 'Unknown',
    isp,
    location,
    deviceType,
    os,
    browser,
    language,
    screen,
    referrer,
    timestamp,
  });

  return newCount;
}
