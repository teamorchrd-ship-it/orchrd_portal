const SESSION_KEY = 'orchrd_session_id';

export function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // sessionStorage unavailable (private mode etc.) — fall back to a
    // per-call id; funnel correlation is best-effort in that case.
    return crypto.randomUUID();
  }
}

export function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    referrer: document.referrer || '',
  };
}

/**
 * Fire-and-forget funnel event, sent to the same Google Sheets webhook as
 * leads with type:'event' so drop-off can be measured against type:'lead'
 * rows sharing the same sessionId. Never throws — analytics must not be
 * able to break the demo.
 */
export function track(event, data = {}) {
  const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  const payload = {
    type: 'event',
    event,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    ...getAttribution(),
    ...data,
  };

  if (!googleSheetUrl) {
    console.warn(`[analytics] VITE_GOOGLE_SHEETS_URL not set — "${event}" not sent:`, payload);
    return;
  }

  try {
    fetch(googleSheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true, // survives navigation/tab-close for exit-intent-style events
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => { /* best-effort — funnel events aren't worth retry/backup logic */ });
  } catch {
    // fetch can throw synchronously in rare environments — swallow it
  }
}
