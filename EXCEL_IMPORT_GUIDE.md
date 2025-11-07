# Excel Import Guide

This guide explains how to import product data from an Excel file into your PinWei Sales Tools website.

## Quick Start

1. **Create your Excel file** named `products.xlsx` in the root directory
2. **Run the import**: `npm run import-excel`
3. **Update the website data**: `npm run update-data`
4. **Push to GitHub**: `.\push.ps1 "Updated products from Excel"`

## Excel File Format

Create an Excel file with the following columns (you can use Chinese or English headers):

### Required Columns

| Column Name (Chinese) | Column Name (English) | Description | Example |
|----------------------|----------------------|-------------|---------|
| 产品编号 | Product Code | Unique product identifier | B0001 |
| 产品名称 | Product Name | Product name in Chinese | 高级羊毛混纺 |

### Optional Columns

| Column Name (Chinese) | Column Name (English) | Description | Example |
|----------------------|----------------------|-------------|---------|
| 价格 | Price | Product price | $45 / m |
| 产品開發 | Origin | Product origin/development | 奥地利 |
| 成分 | Composition | Material composition | 68%羊毛 26%涤纶 6%氨纶 |
| 面料特点 | Characteristics | Fabric characteristics | 悬垂感强,手感软糯 |
| 规格 | Specs | Product specifications | 172cm X 230g/m² |
| 出米数 | Yield | Yield information | 2.5m/kg |
| 洗护建议 | Care | Care instructions | 30°C水温常规机洗 |
| 温馨提示 | Warm Tips | Warm tips | 衣物清洗前,建议先翻面 |
| 产品介绍 | Description | Product description | 适合冬季服装的奢华羊毛混纺面料 |
| 卖点 | Selling Point | Selling points for sales team | 出色的保暖性 |
| 优点 | Pros | Product advantages (separate by commas or newlines) | 出色的保暖性,耐用且持久 |
| 缺点 | Cons | Product disadvantages (separate by commas or newlines) | 需要干洗,敏感皮肤可能会感到刺痒 |

### Tag Columns

Tags can be separated by commas (,) or semicolons (;) or newlines:

| Column Name (Chinese) | Column Name (English) | Description | Example |
|----------------------|----------------------|-------------|---------|
| 成分标签 | Composition Tags | Material tags | 羊毛,棉,丝 |
| 服装类型标签 | Garment Type Tags | Garment type tags | 外套,连衣裙,衬衫 |
| 风格标签 | Style Tags | Style tags | 简约,优雅,休闲 |
| 季节标签 | Season Tags | Season tags | 春季,夏季,秋季,冬季 |
| 大牌開發标签 | Brand Tags | Brand development tags | 品牌开发,电商推荐 |
| 自主開發标签 | Other Tags | Other/self-development tags | 自主開發 |

### Image Columns

Images can be:
- URLs (http:// or https://)
- File paths (relative to the website root)
- Filenames (will be placed in `images/{productCode}/`)

| Column Name (Chinese) | Column Name (English) | Description | Example |
|----------------------|----------------------|-------------|---------|
| 产品图片 | Product Images | Product sample images (comma separated) | https://example.com/img1.jpg,images/B0001/img2.jpg |
| 来源图片 | Origin Images | Origin/source images (comma separated) | https://example.com/origin1.jpg |

## Example Excel Structure

```
| 产品编号 | 产品名称 | 价格 | 成分标签 | 服装类型标签 | 风格标签 | 产品图片 |
|---------|---------|------|---------|------------|---------|---------|
| B0001 | 高级羊毛混纺 | $45 / m | 羊毛,混纺 | 外套,夹克 | 简约,优雅 | https://example.com/img1.jpg |
| B0002 | 真丝雪纺 | $28 / m | 丝 | 连衣裙 | 优雅,奢华 | https://example.com/img2.jpg |
```

## Workflow

### 1. Create/Update Excel File
- Place your `products.xlsx` file in the root directory
- Make sure it follows the column structure above

### 2. Import Excel Data
```bash
npm run import-excel
```
This will:
- Read your Excel file
- Convert it to the website data format
- Save to `data-imported.js`

### 3. Update Website Data
```bash
npm run update-data
```
This will:
- Merge imported data with existing data
- Update `data.js` (the file used by the website)
- Create a backup of your old data

### 4. Deploy to Website
```bash
.\push.ps1 "Updated products from Excel"
```
This will:
- Commit changes
- Push to GitHub
- Automatically deploy to your live site

## Tips

1. **Column Names**: The script is flexible - it will try to match column names in both Chinese and English
2. **Tags**: Separate multiple tags with commas, semicolons, or put them on separate lines
3. **Images**: Use full URLs for images hosted online, or relative paths for local images
4. **Backup**: Your old data is automatically backed up to `data-backup.js` before updating
5. **Incremental Updates**: You can add new products to your Excel file and re-import - it will replace all existing data

## Troubleshooting

### "Excel file not found"
- Make sure your Excel file is named exactly `products.xlsx`
- Make sure it's in the root directory (same folder as `package.json`)

### "Required columns not found"
- Check that you have columns for "产品编号" (Product Code) and "产品名称" (Product Name)
- Column names are case-insensitive and flexible

### Images not showing
- Check that image URLs are accessible
- For local images, make sure the file paths are correct
- Images should be uploaded to your repository or hosted online

## Advanced: Custom Column Mapping

If your Excel columns have different names, you can edit `scripts/importExcel.js` and modify the `COLUMN_MAPPING` object to add your custom column names.

