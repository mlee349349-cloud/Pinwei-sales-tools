# PinWei 品蔚 Sales Tools

產品管理與銷售工具系統

## 功能特性

- 📦 產品管理：添加、編輯、刪除產品
- 🔍 產品搜索：按編號、名稱、標籤、成分搜索
- 🏷️ 標籤系統：多類別標籤管理（成分、服裝類型、風格、季節等）
- 📸 多圖片上傳：支持產品圖片和來源圖片的多圖片管理
- 👥 用戶權限：管理員和銷售專員角色管理
- 🌐 多語言支持：中文/英文切換
- 💾 本地存儲：數據自動保存到瀏覽器本地存儲

## 技術棧

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- LocalStorage

## 使用說明



### 銷售專員
- 點擊 "以銷售專員身份進入" 進行訪客登錄
- 僅可查看和搜索產品

## 文件結構

```
├── index.html          # 主頁面
├── script.js           # 主要 JavaScript 邏輯
├── styles.css          # 樣式文件
├── README.md           # 說明文檔
└── .gitignore          # Git 忽略文件
```

## 開發說明

直接打開 `index.html` 文件在瀏覽器中運行，無需額外配置。

## 部署說明

### 自動部署 (GitHub Pages)

本項目已配置 GitHub Actions 自動部署工作流。當您推送更改到 `main` 分支時，網站會自動部署到 GitHub Pages。

**首次設置：**
1. 前往 GitHub 倉庫設置頁面：`Settings` → `Pages`
2. 在 "Source" 部分，選擇 "GitHub Actions" 作為部署源
3. 保存設置

**部署流程：**
- 在 Cursor 中編輯文件並保存
- 使用快速推送腳本（推薦）：
  - **PowerShell**: `.\push.ps1 "Your commit message"`
  - **Command Prompt**: `push.bat "Your commit message"`
  - 或手動執行：`git add .` → `git commit -m "Your message"` → `git push origin main`
- GitHub Actions 會自動觸發部署
- 幾分鐘後，您的網站將在 `https://[username].github.io/Pinwei-sales-tools/` 上線

**查看部署狀態：**
- 前往 GitHub 倉庫的 "Actions" 標籤頁查看部署進度
- 部署完成後，可在 "Settings" → "Pages" 中查看網站 URL

## Excel 數據導入

### 從 Excel 文件導入產品數據

您可以通過 Excel 文件批量導入產品數據，系統會自動同步到網站。

**快速開始：**

1. **創建 Excel 文件**：在根目錄創建 `products.xlsx` 文件
2. **運行導入腳本**：
   ```powershell
   .\import-from-excel.ps1
   ```
   或使用 npm：
   ```bash
   npm run full-import
   ```
3. **推送到網站**：
   ```powershell
   .\push.ps1 "Updated products from Excel"
   ```

**Excel 文件格式：**

必需欄位：
- **產品編號** (Product Code) - 產品唯一標識符
- **產品名稱** (Product Name) - 產品中文名稱

可選欄位：
- 價格、產品開發、成分、面料特點、規格、出米數、洗護建議等
- **標籤欄位**：成分標籤、服裝類型標籤、風格標籤、季節標籤、大牌開發標籤、自主開發標籤
- **圖片欄位**：產品圖片、來源圖片（支持多張，用逗號分隔）

詳細格式說明請參考：`EXCEL_IMPORT_GUIDE.md`

**工作流程：**
1. 在 Excel 中編輯產品數據（包括圖片 URL 或路徑）
2. 運行 `.\import-from-excel.ps1` 導入數據
3. 運行 `.\push.ps1` 推送到 GitHub
4. 網站會自動更新，顯示最新產品數據

## 功能模塊

1. **首頁**：產品推薦和客戶諮詢
2. **添加產品**：管理員添加新產品（僅管理員可見）
3. **匹配頁面**：搜索和瀏覽所有產品，支持排序和搜索
4. **產品詳情**：查看產品完整信息，包括多張圖片
5. **Excel 導入**：批量導入產品數據和圖片

## 許可證

版權所有 © PinWei 品蔚

