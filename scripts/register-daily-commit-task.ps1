<#
概要:
- 日次コミットタスク（WikiDailyCommit）を登録/更新する

実行対象:
- このプロジェクト配下の `scripts/daily-commit.ps1`

リスク評価:
- ☆☆☆★★ (3/5)
  理由: OS のタスクスケジューラへ登録を行うため（ファイル破壊はしない）
#>

param(
    [string]$TaskName = "WikiDailyCommit",
    [string]$At = "23:50",
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
$dailyScript = Join-Path -Path $repoRoot -ChildPath "scripts/daily-commit.ps1"
if (-not (Test-Path -LiteralPath $dailyScript -PathType Leaf)) {
    throw "daily commit script not found: $dailyScript"
}

try {
    $atTime = [datetime]::ParseExact($At, "HH:mm", [System.Globalization.CultureInfo]::InvariantCulture)
}
catch {
    throw "Invalid -At format. Use HH:mm (example: 23:50)."
}

$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$actionArgs = "-NoProfile -ExecutionPolicy Bypass -File `"$dailyScript`""

Write-Host "[register-daily-commit-task] task: $TaskName"
Write-Host "[register-daily-commit-task] schedule: Daily $At"
Write-Host "[register-daily-commit-task] user: $currentUser"
Write-Host "[register-daily-commit-task] command: powershell.exe $actionArgs"

if ($DryRun) {
    Write-Host "[register-daily-commit-task] dry-run mode; no task registration"
    return
}

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $actionArgs
$trigger = New-ScheduledTaskTrigger -Daily -At $atTime
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable
$principal = New-ScheduledTaskPrincipal -UserId $currentUser -LogonType Interactive -RunLevel Limited

Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description "Daily local commit for wiki repository." `
    -Force | Out-Null

$task = Get-ScheduledTask -TaskName $TaskName
$info = Get-ScheduledTaskInfo -TaskName $TaskName

Write-Host "[register-daily-commit-task] state: $($task.State)"
Write-Host "[register-daily-commit-task] next run: $($info.NextRunTime)"
Write-Host "[register-daily-commit-task] done"