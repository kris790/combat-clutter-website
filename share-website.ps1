Write-Host "=== SHARING COMBAT CLUTTER WEBSITE ===" -ForegroundColor Cyan

# Check if dev server is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✅ Dev server is running on port 3001" -ForegroundColor Green
} catch {
    Write-Host "❌ Dev server not running on port 3001" -ForegroundColor Red
    Write-Host "Starting dev server..." -ForegroundColor Yellow
    Start-Job -ScriptBlock { npm run dev } -Name "NextDevServer"
    Start-Sleep -Seconds 5
}

# Install ngrok if not installed
if (-not (Get-Command ngrok -ErrorAction SilentlyContinue)) {
    Write-Host "Installing ngrok..." -ForegroundColor Yellow
    npm install -g ngrok
}

# Start ngrok tunnel
Write-Host "`n🚀 Creating public URL..." -ForegroundColor Green
Write-Host "This will give you a link like: https://abc123.ngrok.io" -ForegroundColor Cyan
Write-Host "Anyone can visit that URL!" -ForegroundColor Cyan
Write-Host "-" * 50

ngrok http 3001
