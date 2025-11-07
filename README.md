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

## 功能模塊

1. **首頁**：產品推薦和客戶諮詢
2. **添加產品**：管理員添加新產品（僅管理員可見）
3. **匹配頁面**：搜索和瀏覽所有產品，支持排序和搜索
4. **產品詳情**：查看產品完整信息，包括多張圖片

## 許可證

版權所有 © PinWei 品蔚

