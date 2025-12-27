# save as debug-server.ps1
$ErrorActionPreference = "Continue"
$DebugPreference = "Continue"

Write-Host "=== NEXT.JS DEBUG START ===" -ForegroundColor Cyan
Write-Host "Time: $(Get-Date)" -ForegroundColor Yellow
Write-Host "Directory: $(Get-Location)" -ForegroundColor Yellow

# Check critical files
Write-Host "`n=== FILE CHECK ===" -ForegroundColor Cyan
$criticalFiles = @(
    "package.json",
    "next.config.js",
    "tsconfig.json", 
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/lib/brand/constants.ts"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "OK $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "MISSING $file" -ForegroundColor Red
    }
}

# Check package.json
Write-Host "`n=== PACKAGE.JSON ===" -ForegroundColor Cyan
Get-Content package.json | Select-String '"scripts"', '"dependencies"'

# Check node version
Write-Host "`n=== VERSIONS ===" -ForegroundColor Cyan
node --version
npm --version
npx next --version 2>&1

# Kill everything
Write-Host "`n=== CLEANING ===" -ForegroundColor Cyan
taskkill /f /im node.exe 2>$null | Out-Null
Remove-Item -Recurse -Force .next, node_modules\.cache, .turbo -ErrorAction SilentlyContinue

# Start with full output
Write-Host "`n=== STARTING NEXT.JS ===" -ForegroundColor Green
Write-Host "Command: npx next dev --port 3001" -ForegroundColor Yellow
Write-Host "Waiting for output... (timeout: 30 seconds)" -ForegroundColor Yellow
Write-Host "-" * 50

# Run and capture ALL output
$processInfo = New-Object System.Diagnostics.ProcessStartInfo
$processInfo.FileName = "npx.cmd"
$processInfo.Arguments = "next dev --port 3001"
$processInfo.RedirectStandardOutput = $true
$processInfo.RedirectStandardError = $true
$processInfo.UseShellExecute = $false
$processInfo.CreateNoWindow = $true

$process = New-Object System.Diagnostics.Process
$process.StartInfo = $processInfo

# Set up event handlers to capture output
$outputBuilder = New-Object System.Text.StringBuilder
$errorBuilder = New-Object System.Text.StringBuilder

$scripBlockOutput = {
    if (![String]::IsNullOrEmpty($EventArgs.Data)) {
        $outputBuilder.AppendLine($EventArgs.Data)
        Write-Host "[OUT] $($EventArgs.Data)" -ForegroundColor Gray
    }
}

$scripBlockError = {
    if (![String]::IsNullOrEmpty($EventArgs.Data)) {
        $errorBuilder.AppendLine($EventArgs.Data)
        Write-Host "[ERR] $($EventArgs.Data)" -ForegroundColor Red
    }
}

$eventOutput = Register-ObjectEvent -InputObject $process `
    -EventName 'OutputDataReceived' `
    -Action $scripBlockOutput

$eventError = Register-ObjectEvent -InputObject $process `
    -EventName 'ErrorDataReceived' `
    -Action $scripBlockError

# Start the process
$process.Start() | Out-Null
$process.BeginOutputReadLine()
$process.BeginErrorReadLine()

# Wait for 30 seconds or until process exits
$timeout = 30
$startTime = Get-Date
while (-not $process.HasExited -and ((Get-Date) - $startTime).TotalSeconds -lt $timeout) {
    Start-Sleep -Seconds 1
}

# Kill if still running after timeout
if (-not $process.HasExited) {
    Write-Host "`n=== TIMEOUT - KILLING PROCESS ===" -ForegroundColor Red
    $process.Kill($true)
    Start-Sleep -Seconds 2
}

# Output results
Write-Host "`n=== RESULTS ===" -ForegroundColor Cyan
Write-Host "Process exited: $($process.HasExited)" -ForegroundColor Yellow
Write-Host "Exit code: $($process.ExitCode)" -ForegroundColor Yellow

if ($outputBuilder.Length -gt 0) {
    Write-Host "`n=== CAPTURED OUTPUT ===" -ForegroundColor Green
    Write-Host $outputBuilder.ToString()
}

if ($errorBuilder.Length -gt 0) {
    Write-Host "`n=== CAPTURED ERRORS ===" -ForegroundColor Red
    Write-Host $errorBuilder.ToString()
}

# Cleanup
Unregister-Event -SourceIdentifier $eventOutput.Name -ErrorAction SilentlyContinue
Unregister-Event -SourceIdentifier $eventError.Name -ErrorAction SilentlyContinue

Write-Host "`n=== DEBUG COMPLETE ===" -ForegroundColor Cyan