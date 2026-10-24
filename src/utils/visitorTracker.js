// Visitor Tracker with Exact Mobile Model Detection & Telegram Push Notifications

const COUNTER_KEY = 'dharun_portfolio_unique_visitors_2026';
const STORAGE_KEY = 'dharun_portfolio_unique_device_v1';

const getEnvVar = (val) => (val || '').replace(/['";]/g, '').trim();

function detectBrand(model, ua) {
  const m = (model || '').toUpperCase();
  const u = (ua || '').toUpperCase();

  if (/^SM-|^GT-|^SCH-|SAMSUNG/i.test(m) || u.includes('SAMSUNG')) return 'Samsung';
  if (/^PIXEL/i.test(m) || u.includes('PIXEL')) return 'Google';
  if (/^CPH2|^NE2|^HD1|^IN2|^KB2|^GM1|^ONEPLUS/i.test(m) || u.includes('ONEPLUS')) return 'OnePlus';
  if (/^CPH|^PGF|^PGT|^PD|^PE|^PF|^PH|^PK|^OPPO/i.test(m) || u.includes('OPPO')) return 'OPPO';
  if (/^RMX/i.test(m) || u.includes('REALME')) return 'Realme';
  if (/^V2|^V1|^I2|^IQOO/i.test(m) || u.includes('VIVO') || u.includes('IQOO')) return 'Vivo / iQOO';
  if (/^2[0-9]{3}|^M2[0-9]|^REDMI|^POCO|^XIAOMI/i.test(m) || u.includes('XIAOMI') || u.includes('REDMI') || u.includes('POCO')) return 'Xiaomi / Redmi / POCO';
  if (/^MOTO|^XT[0-9]/i.test(m) || u.includes('MOTOROLA')) return 'Motorola';
  if (/^X[0-9]{4}|^INFINIX/i.test(m) || u.includes('INFINIX')) return 'Infinix';
  if (/^TECNO|^CK[0-9]|^LH[0-9]/i.test(m) || u.includes('TECNO')) return 'Tecno';
  if (/^A06[0-9]|^NOTHING/i.test(m) || u.includes('NOTHING')) return 'Nothing Phone';
  if (u.includes('IPHONE') || u.includes('IPAD') || u.includes('MACINTOSH')) return 'Apple';
  if (/^ASUS|^ROG/i.test(m) || u.includes('ASUS')) return 'Asus';
  if (/^XQ-|^SO-|XPERIA/i.test(m) || u.includes('XPERIA')) return 'Sony Xperia';
  if (/^LGE?|^LM-/i.test(m) || u.includes('LG-')) return 'LG';
  if (/^TA-[0-9]|NOKIA/i.test(m) || u.includes('NOKIA')) return 'Nokia';

  return 'Mobile Device';
}

function parseAndroidModelFromUA(ua) {
  if (!ua) return null;
  const paren = ua.match(/\(([^)]+)\)/);
  if (!paren) return null;
  const parts = paren[1].split(';').map(p => p.trim());

  // 1. Search for part containing 'Build/'
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.includes('Build/')) {
      const candidate = part.split('Build/')[0].trim();
      if (candidate && !/^(Linux|U|Android|wv|Mobile|[a-z]{2}(?:-[a-z]{2,})?|K)$/i.test(candidate)) {
        return candidate;
      }
    }
  }

  // 2. Search parts following 'Android' token
  const androidIdx = parts.findIndex(p => /^Android/i.test(p));
  if (androidIdx !== -1) {
    for (let i = androidIdx + 1; i < parts.length; i++) {
      const candidate = parts[i].replace(/Build\/.*$/, '').trim();
      if (candidate && !/^(Linux|U|Android|wv|Mobile|[a-z]{2}(?:-[a-z]{2,})?|K)$/i.test(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

async function getDetailedDeviceInfo() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  let model = '';
  let os = 'Unknown OS';
  let deviceType = 'Desktop';

  // 1. Modern User-Agent Client Hints API (Chrome / Edge / Samsung Internet on Android)
  if (typeof navigator !== 'undefined' && navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
    try {
      const hints = await navigator.userAgentData.getHighEntropyValues([
        'model',
        'platform',
        'platformVersion',
      ]);
      if (hints.model && !/^(K|wv|Mobile)$/i.test(hints.model.trim())) {
        model = hints.model.trim();
      }
      if (hints.platform) {
        os = hints.platform;
      }
    } catch {
      // fallback
    }
  }

  // 2. Android hardware model extraction from User-Agent (supports international variants, in-app webviews)
  if (!model && ua) {
    const parsedModel = parseAndroidModelFromUA(ua);
    if (parsedModel) {
      model = parsedModel;
    }
  }

  // 3. Apple iOS Model Identification
  const isApple = /iPhone|iPad|iPod/i.test(ua) || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua));
  if (isApple) {
    os = 'iOS';
    deviceType = /iPad/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua)) ? 'Tablet' : 'Mobile';

    if (typeof window !== 'undefined' && window.screen) {
      const dpr = window.devicePixelRatio || 1;
      const physW = Math.round(window.screen.width * dpr);
      const physH = Math.round(window.screen.height * dpr);
      const minP = Math.min(physW, physH);
      const maxP = Math.max(physW, physH);

      if (minP === 1320 && maxP === 2868) model = 'iPhone 16 Pro Max';
      else if (minP === 1206 && maxP === 2622) model = 'iPhone 16 Pro';
      else if (minP === 1290 && maxP === 2796) model = 'iPhone 14/15/16 Pro Max / Plus';
      else if (minP === 1179 && maxP === 2556) model = 'iPhone 14/15/16 Pro / 15/16';
      else if (minP === 1284 && maxP === 2778) model = 'iPhone 12/13 Pro Max / 14 Plus';
      else if (minP === 1170 && maxP === 2532) model = 'iPhone 12/12 Pro / 13/13 Pro / 14';
      else if (minP === 1125 && maxP === 2436) model = 'iPhone X/XS/11 Pro/12 mini/13 mini';
      else if (minP === 1242 && maxP === 2688) model = 'iPhone XS Max / 11 Pro Max';
      else if (minP === 828 && maxP === 1792) model = 'iPhone XR / iPhone 11';
      else if (minP === 1080 && maxP === 1920) model = 'iPhone 6+/7+/8+';
      else if (minP === 750 && maxP === 1334) model = 'iPhone 6/7/8/SE (2nd/3rd gen)';
      else if (deviceType === 'Tablet') model = `iPad (${minP}x${maxP} px)`;
      else model = `iPhone (${minP}x${maxP} px)`;
    } else {
      model = 'Apple iPhone';
    }
  } else if (/Android/i.test(ua)) {
    os = 'Android';
    deviceType = /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Mobile';
    if (!model) model = 'Android Device';
  } else if (/Windows NT 10.0/i.test(ua)) {
    os = 'Windows 10/11';
    deviceType = 'Desktop';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = 'macOS';
    deviceType = 'Desktop';
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
    deviceType = 'Desktop';
  }

  // Detect Brand dynamically
  const brand = (deviceType === 'Mobile' || deviceType === 'Tablet') ? detectBrand(model, ua) : 'PC / Desktop';

  // Calculate true physical hardware resolution
  let screenResolution = 'Unknown';
  if (typeof window !== 'undefined' && window.screen) {
    const dpr = window.devicePixelRatio || 1;
    const logW = window.screen.width || 0;
    const logH = window.screen.height || 0;
    const physW = Math.round(logW * dpr);
    const physH = Math.round(logH * dpr);
    const minPhys = Math.min(physW, physH);
    const maxPhys = Math.max(physW, physH);
    const minLog = Math.min(logW, logH);
    const maxLog = Math.max(logW, logH);

    screenResolution = `${minPhys} x ${maxPhys} px (DPR: ${dpr}x, Viewport: ${minLog} x ${maxLog} px)`;
  }

  // Detect GPU / Chipset
  let gpu = '';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      if (dbg) {
        gpu = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '';
      }
    }
  } catch {}

  return {
    deviceType,
    os,
    brand,
    model: model || deviceType,
    gpu,
    screenResolution,
  };
}

function getBrowser() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
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
<b>[New Visitor Notification]</b> (#${data.visitorNumber || 'New'})

<b>IP Address:</b> <code>${escapeHtml(data.ip)}</code>
<b>ISP / Network:</b> ${escapeHtml(data.isp || 'N/A')}
<b>Location:</b> ${escapeHtml(data.location)}
<b>Device Type:</b> ${escapeHtml(data.deviceType)}
<b>Brand:</b> ${escapeHtml(data.brand)}
<b>Exact Model:</b> <code>${escapeHtml(data.model)}</code>
${data.gpu ? `<b>GPU:</b> ${escapeHtml(data.gpu)}\n` : ''}<b>Browser:</b> ${escapeHtml(data.browser)} (${escapeHtml(data.language)})
<b>Hardware Screen:</b> ${escapeHtml(data.screenResolution)}
<b>Referrer:</b> ${escapeHtml(data.referrer)}
<b>Time:</b> ${escapeHtml(data.timestamp)}
`.trim();

  try {
    // Transmit securely over encrypted TLS HTTPS
    const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(endpoint, {
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
    console.warn('Telemetry transmission error');
  }
}

export async function initVisitorTracking() {
  const hasVisited = localStorage.getItem(STORAGE_KEY);

  // If already visited on this device, fetch current count only (DO NOT notify)
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
  // 1. Immediately flag device to prevent duplicate triggers
  localStorage.setItem(STORAGE_KEY, Date.now().toString());

  // 2. Increment visitor counter
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

  // 3. Fetch visitor IP & location via secure HTTPS
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

  const { deviceType, os, brand, model, gpu, screenResolution } = await getDetailedDeviceInfo();
  const browser = getBrowser();
  const location = geo && geo.city ? `${geo.city}, ${geo.region || ''}, ${geo.country || ''}`.replace(/,\s*,/g, ',') : 'Unknown';
  const isp = geo?.connection?.isp || geo?.connection?.org || geo?.isp || 'Unknown';
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
    brand,
    model,
    gpu,
    os,
    browser,
    language,
    screenResolution,
    referrer,
    timestamp,
  });

  return newCount;
}
