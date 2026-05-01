param(
    [Parameter(Mandatory = $true)][string]$SourcePath,
    [Parameter(Mandatory = $true)][string]$PortfolioName,
    [string]$CasesRoot = "",
    [string]$StagingFolderName = "review-staging",
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# This script lives in repo/scripts. Move to repo root.
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

function Get-GitText {
    param([Parameter(Mandatory = $true)][string[]]$Args)

    $out = & git @Args
    if ($LASTEXITCODE -ne 0) {
        throw "git $($Args -join ' ') failed with exit code $LASTEXITCODE"
    }

    return ($out -join "`n").Trim()
}

function Normalize-PathString {
    param([Parameter(Mandatory = $true)][string]$PathText)

    $full = [System.IO.Path]::GetFullPath($PathText)
    while ($full.Length -gt 1 -and ($full.EndsWith("\") -or $full.EndsWith("/"))) {
        $full = $full.Substring(0, $full.Length - 1)
    }

    return $full
}

function Resolve-ExistingDirectory {
    param([Parameter(Mandatory = $true)][string]$PathText)

    $resolved = Resolve-Path -LiteralPath $PathText -ErrorAction Stop
    $full = Normalize-PathString -PathText $resolved.ProviderPath
    if (-not (Test-Path -LiteralPath $full -PathType Container)) {
        throw "Directory not found: $PathText"
    }

    return $full
}

# Validate repository context.
$inside = Get-GitText -Args @("rev-parse", "--is-inside-work-tree")
if ($inside -ne "true") {
    throw "Not inside a Git repository."
}

$repoRoot = Normalize-PathString -PathText (Get-GitText -Args @("rev-parse", "--show-toplevel"))
$scriptRoot = Normalize-PathString -PathText (Split-Path -Parent $PSScriptRoot)
if ($repoRoot -ine $scriptRoot) {
    throw "Repository root mismatch. Refusing to run outside the expected project root."
}

$sourceDir = Resolve-ExistingDirectory -PathText $SourcePath
$casesDir = $null
if ([string]::IsNullOrWhiteSpace($CasesRoot)) {
    $autoCases = Get-ChildItem -LiteralPath $repoRoot -Directory | Where-Object { $_.Name -like "02_*" } | Select-Object -First 1
    if ($null -eq $autoCases) {
        throw "Could not auto-detect cases root folder (expected a folder like '02_*'). Pass -CasesRoot explicitly."
    }
    $casesDir = $autoCases.FullName
}
else {
    $casesDir = Join-Path -Path $repoRoot -ChildPath $CasesRoot
    if (-not (Test-Path -LiteralPath $casesDir -PathType Container)) {
        throw "Cases root not found: $casesDir"
    }
}

$portfolioDir = Join-Path -Path $casesDir -ChildPath $PortfolioName
if (-not (Test-Path -LiteralPath $portfolioDir -PathType Container)) {
    throw "Portfolio folder not found: $portfolioDir"
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$stagingDir = Join-Path -Path $portfolioDir -ChildPath "$StagingFolderName\$timestamp"
$importedSourceDir = Join-Path -Path $stagingDir -ChildPath "source"
$reviewFile = Join-Path -Path $stagingDir -ChildPath "review.md"
$metaFile = Join-Path -Path $stagingDir -ChildPath "import-metadata.json"

Write-Host "[stage-review] source: $sourceDir"
Write-Host "[stage-review] portfolio: $portfolioDir"
Write-Host "[stage-review] staging: $stagingDir"

if ($DryRun) {
    Write-Host "[stage-review] dry-run mode; no copy/write executed"
    return
}

New-Item -ItemType Directory -Path $importedSourceDir -Force | Out-Null

# Copy source folder to staging/source while excluding large and noisy folders.
$excludeDirs = @(".git", "node_modules", ".next", "dist", "coverage")
$roboArgs = @(
    $sourceDir,
    $importedSourceDir,
    "/E",
    "/R:1",
    "/W:1",
    "/NFL",
    "/NDL",
    "/NJH",
    "/NJS",
    "/NP",
    "/XD"
) + $excludeDirs

& robocopy @roboArgs | Out-Null
$roboExit = $LASTEXITCODE
if ($roboExit -gt 7) {
    throw "robocopy failed with exit code $roboExit"
}

$reviewTemplate = @"
# Review: $PortfolioName / $timestamp

- Date: $(Get-Date -Format "yyyy-MM-dd")
- Import type: temporary copy from an external local folder
- Imported source folder: ./source

## References

- Review guide: <relative-path-to-review-workflow>
- Practical rules: <relative-path-to-css-policy>

## Evidence links

- Learning baseline: <path>
- Current implementation: ./source
- Web reference: <URL>

## 3-way comparison

| Aspect | Learning baseline | Current implementation | Web reference | Notes |
|---|---|---|---|---|
| Naming |  |  |  |  |
| Layout responsibility |  |  |  |  |
| Spacing policy |  |  |  |  |
| Reusability |  |  |  |  |
| Maintainability |  |  |  |  |
| Accessibility |  |  |  |  |
| Change resilience |  |  |  |  |

## Decision

- Result: Adopt / Conditional / Reject
- Reason:
- Code updates:
- Remaining tasks:
"@

Set-Content -LiteralPath $reviewFile -Value $reviewTemplate -Encoding UTF8

$meta = @{
    imported_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    portfolio = $PortfolioName
    source_folder_name = (Split-Path -Leaf $sourceDir)
    source_path_stored = $false
    staging_folder = $timestamp
    script = "stage-portfolio-review.ps1"
}
$meta | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $metaFile -Encoding UTF8

Write-Host "[stage-review] copy done"
Write-Host "[stage-review] review template: $reviewFile"
