@echo off
setlocal
cd /d "%~dp0"
if errorlevel 1 goto failed

where node.exe >nul 2>&1
if errorlevel 1 (
  echo Node.js 22 or later is required. Install it and try again.
  goto failed
)

if not exist "node_modules\vitepress\bin\vitepress.js" (
  echo Installing site dependencies...
  call npm.cmd ci
  if errorlevel 1 goto failed
)

echo.
echo Wiki site: http://127.0.0.1:5173/
echo Keep this window open. Press Ctrl+C to stop.
echo.
call npm.cmd run dev
if errorlevel 1 goto failed
exit /b 0

:failed
echo.
echo The site could not be started. See the message above.
pause
exit /b 1
