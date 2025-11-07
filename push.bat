@echo off
REM Quick Push Script - Push all changes to GitHub
REM Usage: push.bat "Your commit message"

setlocal

if "%1"=="" (
    set "COMMIT_MSG=Update files"
) else (
    set "COMMIT_MSG=%1"
)

echo.
echo 🚀 Pushing changes to GitHub...
echo.

REM Check if git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    exit /b 1
)

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not a git repository
    exit /b 1
)

echo 📦 Staging all changes...
git add .

echo 💾 Committing changes...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo ❌ Commit failed
    exit /b 1
)

echo ⬆️  Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ❌ Push failed. Please check your git configuration.
    exit /b 1
)

echo.
echo ✅ Successfully pushed to GitHub!
echo 🌐 Your site will update in a few minutes at:
echo    https://mlee349349-cloud.github.io/Pinwei-sales-tools/
echo.

endlocal


