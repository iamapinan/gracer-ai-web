const CONFIG = {
  spreadsheetName: 'Gracer AI Leads',
  sheetName: 'Leads',
  ownerEmail: 'apinan@gracer.co.th',
  fromName: 'Gracer AI',
  lineUrl: PropertiesService.getScriptProperties().getProperty('LINE_OA_URL') || '',
  bookingUrl: PropertiesService.getScriptProperties().getProperty('BOOKING_URL') || '',
};

const HEADERS = [
  'lead_id', 'submitted_at', 'name', 'company', 'role', 'contact', 'preferred_channel',
  'workflow', 'frequency', 'team_size', 'score', 'stage', 'source', 'page_url',
  'consent', 'last_contacted_at', 'next_follow_up_at', 'notes',
];

function doPost(event) {
  try {
    const lead = JSON.parse(event.postData.contents || '{}');
    validateLead_(lead);
    const sheet = getLeadSheet_();
    const leadId = Utilities.getUuid();
    const now = new Date();
    const nextFollowUp = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    sheet.appendRow([
      leadId, lead.submittedAt || now.toISOString(), safe_(lead.name), safe_(lead.company),
      safe_(lead.role), safe_(lead.contact), safe_(lead.preferredChannel), safe_(lead.workflow),
      safe_(lead.frequency), safe_(lead.teamSize), Number(lead.score) || 0, 'new',
      safe_(lead.source), safe_(lead.pageUrl), Boolean(lead.consent), '', nextFollowUp, '',
    ]);

    notifySales_(lead, leadId);
    if (lead.preferredChannel === 'email' && isEmail_(lead.contact)) sendWelcomeEmail_(lead, leadId);

    return json_({ ok: true, leadId: leadId });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function setup() {
  getLeadSheet_();
  ScriptApp.getProjectTriggers().filter((trigger) => trigger.getHandlerFunction() === 'runFollowUps').forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger('runFollowUps').timeBased().everyHours(6).create();
}

function runFollowUps() {
  const sheet = getLeadSheet_();
  const rows = sheet.getDataRange().getValues();
  const now = new Date();

  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index];
    const lead = rowToObject_(rows[0], row);
    if (!lead.consent || lead.stage === 'won' || lead.stage === 'lost') continue;
    if (!lead.next_follow_up_at || new Date(lead.next_follow_up_at) > now) continue;

    if (lead.preferred_channel === 'email' && isEmail_(lead.contact)) {
      sendFollowUpEmail_(lead);
      sheet.getRange(index + 1, HEADERS.indexOf('last_contacted_at') + 1).setValue(now);
      sheet.getRange(index + 1, HEADERS.indexOf('next_follow_up_at') + 1).setValue(new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000));
      sheet.getRange(index + 1, HEADERS.indexOf('stage') + 1).setValue('nurturing');
    } else {
      MailApp.sendEmail({
        to: CONFIG.ownerEmail,
        subject: '[Lead follow-up] ' + lead.company + ' — ติดต่อทาง ' + lead.preferred_channel,
        htmlBody: '<p>ถึงเวลาติดตาม lead นี้ผ่านช่องทางที่ลูกค้าเลือก</p><p><b>' + escapeHtml_(lead.name) + '</b> • ' + escapeHtml_(lead.contact) + '</p><p>Workflow: ' + escapeHtml_(lead.workflow) + '</p>',
      });
      sheet.getRange(index + 1, HEADERS.indexOf('next_follow_up_at') + 1).setValue(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000));
    }
  }
}

function getLeadSheet_() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty('SPREADSHEET_ID');
  let spreadsheet;
  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create(CONFIG.spreadsheetName);
    spreadsheetId = spreadsheet.getId();
    properties.setProperty('SPREADSHEET_ID', spreadsheetId);
  }
  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#18181b').setFontColor('#ffffff');
  }
  return sheet;
}

function notifySales_(lead, leadId) {
  const priority = Number(lead.score) >= 75 ? 'HOT' : Number(lead.score) >= 55 ? 'WARM' : 'NURTURE';
  MailApp.sendEmail({
    to: CONFIG.ownerEmail,
    subject: '[' + priority + ' lead] ' + lead.company + ' — ' + lead.workflow,
    htmlBody: '<h2>มี lead ใหม่จาก Landing Page</h2><p><b>' + escapeHtml_(lead.name) + '</b> จาก ' + escapeHtml_(lead.company) + '</p><ul><li>Workflow: ' + escapeHtml_(lead.workflow) + '</li><li>ความถี่: ' + escapeHtml_(lead.frequency) + '</li><li>ทีม: ' + escapeHtml_(lead.teamSize) + '</li><li>คะแนน: ' + Number(lead.score) + '/100</li><li>ช่องทางที่เลือก: ' + escapeHtml_(lead.preferredChannel) + ' — ' + escapeHtml_(lead.contact) + '</li></ul><p>Lead ID: ' + leadId + '</p>',
  });
}

function sendWelcomeEmail_(lead, leadId) {
  const action = CONFIG.bookingUrl ? '<p><a href="' + CONFIG.bookingUrl + '">เลือกเวลาคุย 30 นาที</a></p>' : '';
  MailApp.sendEmail({
    to: lead.contact,
    name: CONFIG.fromName,
    subject: 'สรุป Workflow Assessment ของ ' + lead.company,
    htmlBody: '<p>สวัสดีคุณ ' + escapeHtml_(lead.name) + '</p><p>เราได้รับข้อมูล workflow <b>' + escapeHtml_(lead.workflow) + '</b> แล้ว ขั้นต่อไปเราจะช่วยวัดเวลาปัจจุบันและประเมินว่า Pilot ควรเริ่มตรงไหน</p>' + action + '<p>ทีม Gracer AI<br>อ้างอิง: ' + leadId + '</p>',
  });
}

function sendFollowUpEmail_(lead) {
  const action = CONFIG.bookingUrl ? '<p><a href="' + CONFIG.bookingUrl + '">เลือกเวลาที่สะดวก</a></p>' : '';
  MailApp.sendEmail({
    to: lead.contact,
    name: CONFIG.fromName,
    subject: 'หนึ่ง workflow ที่น่าจะลดเวลาของทีม ' + lead.company,
    htmlBody: '<p>สวัสดีคุณ ' + escapeHtml_(lead.name) + '</p><p>จากข้อมูลที่ส่งมา งาน <b>' + escapeHtml_(lead.workflow) + '</b> เป็นจุดที่เหมาะกับการวัดผลก่อน–หลัง เราเสนอให้คุยสั้น ๆ เพื่อดูตัวอย่างข้อมูลและกำหนดผลลัพธ์ของ Pilot</p>' + action + '<p>หากไม่ต้องการรับข้อมูลเพิ่มเติม ตอบกลับด้วยคำว่า “ยกเลิก” ได้ทันที</p>',
  });
}

function validateLead_(lead) {
  ['name', 'company', 'contact', 'workflow', 'frequency', 'teamSize', 'preferredChannel'].forEach((key) => {
    if (!lead[key] || String(lead[key]).length > 500) throw new Error('ข้อมูลไม่ครบหรือยาวเกินกำหนด: ' + key);
  });
  if (!lead.consent) throw new Error('ต้องได้รับความยินยอมก่อนบันทึก lead');
}

function rowToObject_(headers, row) { return headers.reduce((result, header, index) => { result[header] = row[index]; return result; }, {}); }
function safe_(value) { const text = String(value || ''); return /^[=+\-@]/.test(text) ? "'" + text : text; }
function isEmail_(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '')); }
function escapeHtml_(value) { return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function json_(payload) { return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON); }

