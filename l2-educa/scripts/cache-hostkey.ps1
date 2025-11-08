# ================================================================
# Cache SSH Host Key for PuTTY
# Run this once to accept the host key
# ================================================================

param(
    [string]$Host = "45.152.46.119",
    [string]$Port = "65002",
    [string]$User = "u511043813",
    [string]$Password = ""
)

Write-Host ""
Write-Host "============================================================="
Write-Host "          Caching SSH Host Key for PuTTY"
Write-Host "============================================================="
Write-Host ""

if ($Password -eq "") {
    Write-Host "Please provide your SSH password:" -ForegroundColor Yellow
    $SecurePassword = Read-Host -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecurePassword)
    $Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
}

Write-Host "Connecting to: $User@$Host on port $Port" -ForegroundColor Cyan
Write-Host ""
Write-Host "Accepting host key..." -ForegroundColor Gray

# Execute plink to cache the host key
$plinkArgs = @(
    "-P", $Port,
    "-pw", $Password,
    "$User@$Host",
    "echo Connection OK"
)

# Pipe 'y' to accept the host key
$result = echo y | plink @plinkArgs 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Host key cached successfully!" -ForegroundColor Green
    Write-Host "You can now run deployments without host key prompts." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[WARNING] Connection completed but may need manual verification" -ForegroundColor Yellow
    Write-Host "Result: $result" -ForegroundColor Gray
}

Write-Host ""
Write-Host "============================================================="
Write-Host ""

pause

