# PowerShell script to replace console.log with logger.log in all .jsx and .js files
# Run this in the l2-educa directory: .\update-console-logs.ps1

$files = Get-ChildItem -Path "src" -Include *.jsx,*.js -Recurse -File

$replacements = @{
    'console\.log' = 'logger.log'
    'console\.error' = 'logger.error'
    'console\.warn' = 'logger.warn'
    'console\.info' = 'logger.info'
    'console\.debug' = 'logger.debug'
}

$importStatement = "import logger from '../utils/logger';"
$modifiedFiles = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $needsImport = $false
    
    # Check if file has console statements
    foreach ($pattern in $replacements.Keys) {
        if ($content -match $pattern) {
            Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
            $needsImport = $true
            $content = $content -replace $pattern, $replacements[$pattern]
        }
    }
    
    # Add import if needed and not already present
    if ($needsImport -and $content -notmatch "import.*logger.*from.*utils/logger") {
        # Find the right place to add import (after other imports)
        if ($content -match "import.*from.*[';`"]") {
            $lastImportIndex = $content.LastIndexOf("`n", $content.IndexOf($Matches[0]) + $Matches[0].Length)
            if ($lastImportIndex -gt 0) {
                $content = $content.Insert($lastImportIndex + 1, "$importStatement`n")
            } else {
                # Add at the beginning if no imports found
                $content = "$importStatement`n$content"
            }
        }
    }
    
    # Write back if changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $modifiedFiles += $file.Name
        Write-Host "  ✅ Updated: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Modified $($modifiedFiles.Count) files:" -ForegroundColor Cyan
$modifiedFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
Write-Host "`n✨ Done! All console statements replaced with logger." -ForegroundColor Green
Write-Host "📝 Build for production to verify: npm run build" -ForegroundColor Yellow

