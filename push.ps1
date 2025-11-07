# Quick Push Script - Push all changes to GitHub
# Usage: .\push.ps1 "Your commit message"

param(
    [string]$message = "Update files"
)

Write-Host "Pushing changes to GitHub..." -ForegroundColor Cyan

# Check if git is available
try {
    git --version | Out-Null
} catch {
    Write-Host "Error: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/" -ForegroundColor Yellow
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not a git repository" -ForegroundColor Red
    exit 1
}

# Check for changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit" -ForegroundColor Yellow
    exit 0
}

Write-Host "Staging all changes..." -ForegroundColor Cyan
git add .

Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m $message

if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit failed" -ForegroundColor Red
    exit 1
}

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Your site will update in a few minutes at:" -ForegroundColor Cyan
    Write-Host "   https://mlee349349-cloud.github.io/Pinwei-sales-tools/" -ForegroundColor Yellow
} else {
    Write-Host "Push failed. Please check your git configuration." -ForegroundColor Red
    exit 1
}

