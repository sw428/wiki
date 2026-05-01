param(
    [string]$Remote = "origin",
    [string]$Branch = "",
    [string]$Summary = "",
    [string]$ExpectedRemotePattern = "(?i)(github\.com[:/]).*/wiki(\.git)?$",
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

function Get-TargetBranch {
    param([string]$RequestedBranch)

    if (-not [string]::IsNullOrWhiteSpace($RequestedBranch)) {
        return $RequestedBranch.Trim()
    }

    $current = Get-GitText -Args @("branch", "--show-current")
    if ([string]::IsNullOrWhiteSpace($current)) {
        throw "Cannot detect current branch. Pass -Branch explicitly."
    }

    return $current
}

function Get-WeekKey {
    $now = Get-Date
    $cal = [System.Globalization.CultureInfo]::InvariantCulture.Calendar
    $week = $cal.GetWeekOfYear($now, [System.Globalization.CalendarWeekRule]::FirstFourDayWeek, [System.DayOfWeek]::Monday)
    return ("{0}-W{1:D2}" -f $now.Year, $week)
}

function Get-AutoSummary {
    param([string]$Fallback = "weekly sync")

    $statusLines = & git -c core.quotepath=false status --porcelain
    if ($LASTEXITCODE -ne 0) {
        throw "git status --porcelain failed with exit code $LASTEXITCODE"
    }

    if (-not $statusLines) {
        return "weekly heartbeat"
    }

    $top = @{}
    foreach ($line in $statusLines) {
        if ($line.Length -lt 4) {
            continue
        }

        $path = $line.Substring(3)
        if ($path -match " -> ") {
            $path = ($path -split " -> ")[-1]
        }

        $path = $path.Trim('"').Trim()
        if ([string]::IsNullOrWhiteSpace($path)) {
            continue
        }

        $parts = $path -split "[\\/]"
        if ($parts.Length -gt 0 -and -not [string]::IsNullOrWhiteSpace($parts[0])) {
            $top[$parts[0]] = $true
        }
    }

    $keys = @($top.Keys | Sort-Object)
    if ($keys.Count -eq 0) {
        return $Fallback
    }

    $pick = @($keys | Select-Object -First 3)
    if ($keys.Count -gt 3) {
        return "update: " + ($pick -join ", ") + ", others"
    }

    return "update: " + ($pick -join ", ")
}

function Write-State {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][hashtable]$Data
    )

    $json = $Data | ConvertTo-Json -Depth 4
    Set-Content -LiteralPath $Path -Value $json -Encoding UTF8
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

$remoteUrl = Get-GitText -Args @("remote", "get-url", $Remote)
if ($remoteUrl -notmatch $ExpectedRemotePattern) {
    throw "Remote '$Remote' URL '$remoteUrl' does not match expected project pattern '$ExpectedRemotePattern'."
}

$gitDir = Get-GitText -Args @("rev-parse", "--git-dir")
if (-not [System.IO.Path]::IsPathRooted($gitDir)) {
    $gitDir = Join-Path -Path $repoRoot -ChildPath $gitDir
}
$stateFile = Join-Path -Path $gitDir -ChildPath "weekly-sync-state.json"

$targetBranch = Get-TargetBranch -RequestedBranch $Branch
$weekKey = Get-WeekKey
$summaryText = if ([string]::IsNullOrWhiteSpace($Summary)) { Get-AutoSummary } else { $Summary.Trim() }
$commitMessage = "$weekKey / $summaryText"

Write-Host "[weekly-sync] branch: $targetBranch"
Write-Host "[weekly-sync] remote: $remoteUrl"
Write-Host "[weekly-sync] commit: $commitMessage"

if ($DryRun) {
    Write-Host "[weekly-sync] dry-run mode; no commit/push executed"
    return
}

& git add -A
if ($LASTEXITCODE -ne 0) {
    throw "git add failed with exit code $LASTEXITCODE"
}

& git diff --cached --quiet
$hasChanges = $LASTEXITCODE -eq 1
if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 1) {
    throw "git diff --cached --quiet failed with exit code $LASTEXITCODE"
}

if ($hasChanges) {
    & git commit -m $commitMessage
    if ($LASTEXITCODE -ne 0) {
        throw "git commit failed with exit code $LASTEXITCODE"
    }
}
else {
    Write-Host "[weekly-sync] no file changes; skip commit"
}

# Push without force. If remote has diverged, this fails safely.
& git push $Remote "HEAD:refs/heads/$targetBranch"
if ($LASTEXITCODE -ne 0) {
    throw "git push failed with exit code $LASTEXITCODE"
}

$head = Get-GitText -Args @("rev-parse", "HEAD")
Write-State -Path $stateFile -Data @{
    last_synced_week = $weekKey
    last_success_local = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    branch = $targetBranch
    remote = $Remote
    remote_url = $remoteUrl
    head = $head
}

Write-Host "[weekly-sync] done"
