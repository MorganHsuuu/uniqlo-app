# Google Sheets 研究資料收集 — 連線設定

**你的試算表**：[UNIQLO測試](https://docs.google.com/spreadsheets/d/1keWDlRS2qzHEMn0VHbSHB_ytBZjM6mz99aMlsIBlmJA/edit)

> ⚠️ App 需要的是 **Apps Script 網路應用程式 URL**（`script.google.com/macros/s/.../exec`），  
> **不是**試算表網址（`docs.google.com/spreadsheets/...`）。

## 你只需要完成這一步（在試算表裡部署 Script）

1. 開啟上方試算表連結
2. **擴充功能** → **Apps Script**
2. 刪除預設程式碼，貼上專案內 `scripts/google-apps-script.js` 的**全部內容**
3. 點 **部署** → **新增部署作業**
4. 類型選 **網路應用程式**，設定：
   - **說明**：UNIQLO research
   - **執行身分**：我
   - **誰可以存取**：**任何人**
5. 點 **部署** → 授權（選 Google 帳號 → 進階 → 前往 → 允許）
6. 複製 **網路應用程式 URL**（格式如 `https://script.google.com/macros/s/xxxxx/exec`）

### 步驟 3：驗證端點

在瀏覽器開啟剛複製的 URL，應看到：

```json
{"ok":true,"message":"UNIQLO research endpoint ready"}
```

### 步驟 4：寫入專案 `.env`

在專案根目錄建立 `.env`（可複製 `.env.example`）：

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/你的部署ID/exec
VITE_RESEARCH_ENABLED=true
```

### 步驟 5：重啟 dev server

```bash
npm run dev
```

完成一次研究問卷後，試算表的 `Responses` 工作表會自動新增一列資料。

---

## 疑難排解

| 問題 | 解法 |
|------|------|
| 試算表沒資料 | 確認 `.env` URL 正確、已重啟 `npm run dev` |
| 授權失敗 | 部署時選「任何人」，並完成 Google 授權 |
| 改了 Script 沒生效 | 部署 → **管理部署作業** → 編輯 → **版本：新版本** → 部署 |
| 本地測試備份 | 未設定 URL 時資料存於 `localStorage`（key: `uq_research_*`） |

## 欄位說明

| 欄位 | 說明 |
|------|------|
| task1Sec | 童裝 → 外套類（秒） |
| task2Sec | 搜尋黑色長褲 → 商品頁（秒） |
| task3Sec | 女性 T 恤 + M + 價格低至高（秒） |
| task4Sec | 亮色加入購物車 → 移除（秒） |
| task5Sec | 開啟智能客服（秒） |
| susScore | SUS 總分（0–100） |

受測者**不會**在畫面上看到計時秒數。
