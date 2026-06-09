/**
 * UNIQLO 研究資料收集 — Google Apps Script
 *
 * 部署步驟：
 * 1. 新建 Google 試算表
 * 2. 擴充功能 → Apps Script → 貼上此檔全部內容
 * 3. 部署 → 新增部署作業 → 網路應用程式
 *    - 執行身分：我
 *    - 誰可以存取：任何人
 * 4. 複製 Web App URL 到專案 .env 的 VITE_GOOGLE_SCRIPT_URL
 */

const HEADERS = [
  "sessionId", "submittedAt",
  "profileQ1", "profileQ2", "profileQ3", "profileQ4",
  "email", "feedback", "susScore",
  "susQ1", "susQ2", "susQ3", "susQ4", "susQ5",
  "susQ6", "susQ7", "susQ8", "susQ9", "susQ10",
  "task1Sec", "task2Sec", "task3Sec", "task4Sec", "task5Sec",
  "task1Done", "task2Done", "task3Done", "task4Done", "task5Done",
  "userAgent",
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Responses");
  if (!sheet) {
    sheet = ss.insertSheet("Responses");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const sheet = getSheet_();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.sessionId || "",
      data.submittedAt || "",
      data.profileQ1 ?? "", data.profileQ2 ?? "", data.profileQ3 ?? "", data.profileQ4 ?? "",
      data.email || "",
      data.feedback || "",
      data.susScore ?? "",
      data.susQ1 ?? "", data.susQ2 ?? "", data.susQ3 ?? "", data.susQ4 ?? "", data.susQ5 ?? "",
      data.susQ6 ?? "", data.susQ7 ?? "", data.susQ8 ?? "", data.susQ9 ?? "", data.susQ10 ?? "",
      data.task1Sec ?? "", data.task2Sec ?? "", data.task3Sec ?? "", data.task4Sec ?? "", data.task5Sec ?? "",
      data.task1Done ?? "", data.task2Done ?? "", data.task3Done ?? "", data.task4Done ?? "", data.task5Done ?? "",
      data.userAgent || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "UNIQLO research endpoint ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** 在 Apps Script 編輯器執行一次，可手動建立 Responses 工作表與標題列 */
function setupSheet() {
  getSheet_();
}
