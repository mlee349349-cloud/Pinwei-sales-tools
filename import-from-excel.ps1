# Excel Import and Update Script
# This script imports data from Excel and updates the website
# Usage: .\import-from-excel.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Excel Import and Update Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if Excel file exists
$excelFile = "products.xlsx"
if (-not (Test-Path $excelFile)) {
    Write-Host "Warning: Excel file '$excelFile' not found in current directory" -ForegroundColor Yellow
    Write-Host "Please create an Excel file named 'products.xlsx' with your product data" -ForegroundColor Yellow
    Write-Host "See EXCEL_IMPORT_GUIDE.md for format details" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 0
    }
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Run import
Write-Host ""
Write-Host "Step 1: Importing Excel data..." -ForegroundColor Cyan
npm run import-excel

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Excel import failed" -ForegroundColor Red
    exit 1
}

# Update data
Write-Host ""
Write-Host "Step 2: Updating website data..." -ForegroundColor Cyan
npm run update-data

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Data update failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Import completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the updated data.js file" -ForegroundColor Yellow
Write-Host "2. Test your website locally" -ForegroundColor Yellow
Write-Host "3. Push to GitHub: .\push.ps1 'Updated products from Excel'" -ForegroundColor Yellow
Write-Host ""

