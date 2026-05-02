<#
概要:
- wiki lint を週次で自動実行するタスク（WikiWeeklyLint）を登録/更新する

実行対象:
- このプロジェクト配下の `scripts/wiki-lint.ps1`

リスク評価:
- ☆☆☆★★ (3/5)
  理由: OS のタスクスケジューラへ登録を行うため（ファイル破壊はしない）
#>

param(
    [string]$TaskName = "WikiWeeklyLint",
    [ValidateSet("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")]
    [string]$DayOfWeek = "Sunday",
    [string]$At = "23:40",
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# This script lives in repo/scripts. Move to repo root.
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

function Normalize-PathString {
    param([Parameter(Mandatory = $true)][string]$PathText)

    $full = [System.IO.Path]::GetFullPath($PathText)
    while ($full.Length -gt 1 -and ($full.EndsWith("\") -or $full.EndsWith("/"))) {
        $full = $full.Substring(0, $full.Length - 1)
    }

    return $full
}

$repoRoot = Normalize-PathString -PathText "."
$lintScript = Join-Path -Path $repoRoot -ChildPath "scripts/wiki-lint.ps1"
if (-not (Test-Path -LiteralPath $lintScript -PathType Leaf)) {
    throw "wiki lint script not found: $lintScript"
}

try {
    $atTime = [datetime]::ParseExact($At, "HH:mm", [System.Globalization.CultureInfo]::InvariantCulture)
}
catch {
    throw "Invalid -At format. Use HH:mm (example: 23:40)."
}

$dayEnum = [System.DayOfWeek]::$DayOfWeek
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$actionArgs = "-NoProfile -ExecutionPolicy Bypass -File `"$lintScript`" -FailOnIssue"

Write-Host "[register-weekly-lint-task] task: $TaskName"
Write-Host "[register-weekly-lint-task] schedule: $DayOfWeek $At"
Write-Host "[register-weekly-lint-task] user: $currentUser"
Write-Host "[register-weekly-lint-task] command: powershell.exe $actionArgs"

if ($DryRun) {
    Write-Host "[register-weekly-lint-task] dry-run mode; no task registration"
    return
}

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $actionArgs
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek $dayEnum -At $atTime
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable
$principal = New-ScheduledTaskPrincipal -UserId $currentUser -LogonType Interactive -RunLevel Limited

Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description "Weekly wiki lint for broken links, orphan pages, and stale claims." `
    -Force | Out-Null

$task = Get-ScheduledTask -TaskName $TaskName
$info = Get-ScheduledTaskInfo -TaskName $TaskName

Write-Host "[register-weekly-lint-task] state: $($task.State)"
Write-Host "[register-weekly-lint-task] next run: $($info.NextRunTime)"
Write-Host "[register-weekly-lint-task] done"
