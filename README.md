# UNIQLO App Interface Research

服飾品牌介面研究專案 — HMI UI/UX Design Study

## 專案結構

```
uniqlo-app/
├── src/
│   ├── App.jsx          # 主框架：Phone frame + Tab bar + 路由
│   ├── App.css          # 全域 Design Tokens + 所有元件樣式
│   ├── main.jsx         # Entry point
│   └── screens/
│       ├── HomeScreen.jsx      # KIDS/WOMEN/BABY banner
│       ├── CategoryScreen.jsx  # MEN 分類 grid + AIRism banner
│       └── SearchScreen.jsx    # 搜尋頁 + 最近搜尋
├── index.html
├── vite.config.js
└── package.json
```

## 快速啟動

```bash
npm install
npm run dev
```

瀏覽器開啟 http://localhost:5173

## 用 Claude Code 繼續開發

安裝 Claude Code：
```bash
npm install -g @anthropic-ai/claude-code
```

進入專案後啟動：
```bash
cd uniqlo-app
claude
```

### 建議的下一步 prompts

**新增商品列表頁：**
```
在 src/screens/ 新增 ProductListScreen.jsx
參考 App.css 現有 design token
實作商品卡片 grid（2欄）、篩選 bar、價格顯示
```

**新增商品詳情頁：**
```
新增 ProductDetailScreen.jsx
包含商品圖片輪播、顏色選擇、尺寸選擇、加入購物車按鈕
```

**AIRism 系列專頁：**
```
新增 AIRismSeriesScreen.jsx
使用 airism-banner 的藍色主題 token
加入系列產品 horizontal scroll card
```

## Design Tokens

主要 CSS 變數定義在 App.css：
- `--uq-red`: #e40012 (UNIQLO 主紅)
- `--uq-black`: #111111
- `--uq-airism-blue`: #1a73a7
- `--uq-border`: 0.5px solid #e0e0e0
