/**
 * Backend for the Orchrd demo's lead + funnel capture.
 *
 * Setup:
 * 1. Open the target Google Sheet → Extensions → Apps Script.
 * 2. Replace the contents of the script with this file, save.
 * 3. Run `authorize` once from the function dropdown (top toolbar) → Run.
 *    Approve the consent screen. (Don't run `doPost` directly — the editor
 *    calls it with no arguments, which is a manual-test artifact, not a bug.)
 * 4. Deploy → New deployment → gear icon → type "Web app" → Execute as "Me" →
 *    Who has access "Anyone" → Deploy. Copy the resulting URL (must contain
 *    "/macros/s/" and end in "/exec" — a "Library" deployment will not work).
 * 5. Put that URL in VITE_GOOGLE_SHEETS_URL.
 * 6. Visit the URL directly in a browser — it should show "Orchrd capture
 *    endpoint is live." That confirms the deployment itself is reachable
 *    before testing the real POST flow from the app.
 *
 * The frontend POSTs JSON with a `type` field: 'lead' (full signup, has an
 * email) or 'event' (anonymous funnel step, keyed by sessionId). This routes
 * each into its own tab so funnel counts don't mix with lead details.
 */

const LEAD_HEADERS = ['timestamp', 'sessionId', 'email', 'wouldUse', 'priceBucket', 'feedback', 'utmSource', 'utmMedium', 'utmCampaign', 'referrer'];
const EVENT_HEADERS = ['timestamp', 'sessionId', 'event', 'template', 'appName', 'utmSource', 'utmMedium', 'utmCampaign', 'referrer'];

function authorize() {
  // Touches the Sheets scope so running this manually triggers the OAuth
  // consent screen. The result is unused — this is only for authorization.
  SpreadsheetApp.getActiveSpreadsheet().getName();
}

function doGet() {
  return ContentService.createTextOutput('Orchrd capture endpoint is live.');
}

function doPost(e) {
  if (!e || !e.postData) {
    // Hit via the editor's Run button or a bare browser request, not a real
    // POST from the app — nothing to record.
    return jsonResponse({ ok: false, error: 'no postData' });
  }

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'invalid JSON: ' + err.message });
  }

  try {
    const isLead = data.type === 'lead';
    const headers = isLead ? LEAD_HEADERS : EVENT_HEADERS;
    const sheet = getOrCreateSheet(isLead ? 'Leads' : 'Events', headers);
    sheet.appendRow(headers.map(key => data[key] ?? ''));
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
