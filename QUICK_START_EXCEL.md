# Quick Start: Excel Import

## Step-by-Step Guide

### 1. Create Your Excel File

Create a file named `products.xlsx` in the root directory with these columns:

**Minimum Required:**
- `产品编号` (or `Product Code`)
- `产品名称` (or `Product Name`)

**Recommended Columns:**
- `价格` / `Price`
- `成分标签` / `Composition Tags` (comma separated: 羊毛,棉,丝)
- `服装类型标签` / `Garment Type Tags` (comma separated: 外套,连衣裙)
- `风格标签` / `Style Tags` (comma separated: 简约,优雅)
- `季节标签` / `Season Tags` (comma separated: 春季,夏季)
- `产品图片` / `Product Images` (comma separated URLs or paths)
- `来源图片` / `Origin Images` (comma separated URLs or paths)

### 2. Install Dependencies (First Time Only)

```powershell
npm install
```

This installs the `xlsx` library needed to read Excel files.

### 3. Import Your Excel Data

```powershell
.\import-from-excel.ps1
```

Or manually:
```powershell
npm run import-excel
npm run update-data
```

### 4. Push to Your Website

```powershell
.\push.ps1 "Updated products from Excel"
```

### 5. Done!

Your website will automatically update in a few minutes with all your Excel data!

## Example Excel Row

| 产品编号 | 产品名称 | 价格 | 成分标签 | 服装类型标签 | 产品图片 |
|---------|---------|------|---------|------------|---------|
| B0001 | 高级羊毛混纺 | $45 / m | 羊毛,混纺 | 外套,夹克 | https://example.com/img1.jpg,https://example.com/img2.jpg |

## Tips

- **Tags**: Separate multiple tags with commas (,) or semicolons (;)
- **Images**: Use full URLs (https://...) or relative paths (images/B0001/img.jpg)
- **Updates**: Just edit your Excel file and run the import script again
- **Backup**: Your old data is automatically backed up to `data-backup.js`

## Need Help?

See `EXCEL_IMPORT_GUIDE.md` for detailed column descriptions and advanced options.

