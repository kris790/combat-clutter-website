# fix-npm.ps1
Write-Host "=== FIXING NODE_MODULES CORRUPTION ===" -ForegroundColor Cyan

# 1. Kill everything
taskkill /f /im node.exe 2>$null
Start-Sleep -Seconds 2

# 2. Check Node.js installation
Write-Host "`n1. Checking Node.js installation..." -ForegroundColor Yellow
$nodePath = where node 2>$null
$npmPath = where npm 2>$null
$npxPath = where npx 2>$null

Write-Host "Node: $nodePath" -ForegroundColor $(if($nodePath){"Green"}else{"Red"})
Write-Host "npm: $npmPath" -ForegroundColor $(if($npmPath){"Green"}else{"Red"})  
Write-Host "npx: $npxPath" -ForegroundColor $(if($npxPath){"Green"}else{"Red"})

# 3. Remove corrupted node_modules
Write-Host "`n2. Removing corrupted files..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules, .next, package-lock.json, .turbo -ErrorAction SilentlyContinue
Write-Host "✅ Removed corrupted files" -ForegroundColor Green

# 4. Check package.json
Write-Host "`n3. Checking package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $pkg = Get-Content package.json -Raw | ConvertFrom-Json
    Write-Host "Project: $($pkg.name)" -ForegroundColor Green
    Write-Host "Dependencies: $($pkg.dependencies.PSObject.Properties.Count)" -ForegroundColor Green
} else {
    Write-Host "❌ No package.json found!" -ForegroundColor Red
    exit 1
}

# 5. Clean npm cache
Write-Host "`n4. Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>&1 | Out-Null
Write-Host "✅ Cache cleared" -ForegroundColor Green

# 6. Install dependencies
Write-Host "`n5. Installing dependencies..." -ForegroundColor Green
npm install --verbose 2>&1 | ForEach-Object {
    if ($_ -match "error" -or $_ -match "ERR!") {
        Write-Host "  [ERROR] $_" -ForegroundColor Red
    } elseif ($_ -match "warn") {
        Write-Host "  [WARN] $_" -ForegroundColor Yellow
    } elseif ($_ -match "added") {
        Write-Host "  [+] $_" -ForegroundColor Green
    }
}

# 7. Verify installation
Write-Host "`n6. Verifying installation..." -ForegroundColor Yellow
if (Test-Path "node_modules\next") {
    Write-Host "✅ Next.js installed" -ForegroundColor Green
} else {
    Write-Host "❌ Next.js NOT installed" -ForegroundColor Red
}

if (Test-Path "node_modules\react") {
    Write-Host "✅ React installed" -ForegroundColor Green
} else {
    Write-Host "❌ React NOT installed" -ForegroundColor Red
}

# 8. Try to start dev server
Write-Host "`n7. Starting dev server..." -ForegroundColor Cyan
Write-Host "URL: http://localhost:3001" -ForegroundColor White
Write-Host "-" * 50

# Run Next.js directly
node "node_modules\next\dist\bin\next" dev --port 3001