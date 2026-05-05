<#
概要:
- wiki の md を対象に、定期チェック用レポートを生成する

実行対象:
- このプロジェクト配下の markdown（既定: repo 全体）

リスク評価:
- ☆☆★★★ (2/5)
  理由: 破壊的変更は行わず、レポート md を更新するのみ
#>
param(
    [string]$DocsRoot = ".",
    [string]$ReportPath = "03_雑記/wiki-lint-report.md",
    [int]$StaleDays = 120,
    [string]$StaleMarkerPattern = "(要修正|未確認|要検証|TODO|FIXME|暫定|保留|矛盾)",
    [string[]]$OrphanIgnore = @(
        "README.md",
        "AGENTS.md",
        "CURRENT.md",
        "scripts/README.md"
    ),
    [switch]$FailOnIssue
)

$ErrorActionPreference = "Stop"

# This script lives in repo/scripts. Move to repo root.
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

function Normalize-FullPath {
    param([Parameter(Mandatory = $true)][string]$PathText)

    if ([System.IO.Path]::IsPathRooted($PathText)) {
        $full = [System.IO.Path]::GetFullPath($PathText)
    }
    else {
        $full = [System.IO.Path]::GetFullPath((Join-Path -Path (Get-Location).Path -ChildPath $PathText))
    }

    while ($full.Length -gt 1 -and ($full.EndsWith("\\") -or $full.EndsWith("/"))) {
        $full = $full.Substring(0, $full.Length - 1)
    }

    return $full
}

function To-RepoRelativePath {
    param(
        [Parameter(Mandatory = $true)][string]$RepoRoot,
        [Parameter(Mandatory = $true)][string]$FullPath
    )

    $base = $RepoRoot.TrimEnd('\', '/')
    $full = $FullPath

    if ($full.StartsWith($base, [System.StringComparison]::OrdinalIgnoreCase)) {
        $rel = $full.Substring($base.Length).TrimStart('\', '/')
        if ([string]::IsNullOrWhiteSpace($rel)) {
            return "."
        }
        return $rel.Replace("\\", "/")
    }

    $baseUri = [System.Uri]::new(($base + "\\"))
    $targetUri = [System.Uri]::new($full)
    return [System.Uri]::UnescapeDataString($baseUri.MakeRelativeUri($targetUri).ToString()).Replace("\\", "/")
}

function Resolve-LocalLink {
    param(
        [Parameter(Mandatory = $true)][string]$SourceFile,
        [Parameter(Mandatory = $true)][string]$Target,
        [Parameter(Mandatory = $true)][string]$RepoRoot
    )

    $pathPart = $Target
    $anchor = ""
    $hashIndex = $Target.IndexOf("#")
    if ($hashIndex -ge 0) {
        $pathPart = $Target.Substring(0, $hashIndex)
        if ($hashIndex + 1 -lt $Target.Length) {
            $anchor = $Target.Substring($hashIndex + 1)
        }
    }

    $resolvedPath = $SourceFile
    if (-not [string]::IsNullOrWhiteSpace($pathPart)) {
        if ($pathPart.StartsWith("/")) {
            $rootRelative = $pathPart.TrimStart('/').Replace('/', '\\')
            $resolvedPath = [System.IO.Path]::GetFullPath((Join-Path -Path $RepoRoot -ChildPath $rootRelative))
        }
        else {
            $sourceDir = Split-Path -Parent $SourceFile
            $resolvedPath = [System.IO.Path]::GetFullPath((Join-Path -Path $sourceDir -ChildPath ($pathPart.Replace('/', '\\'))))
        }
    }

    [PSCustomObject]@{
        PathPart     = $pathPart
        Anchor       = $anchor
        ResolvedPath = $resolvedPath
    }
}

function Is-ExternalLink {
    param([Parameter(Mandatory = $true)][string]$Target)

    return $Target -match '^(?i)(https?:|mailto:|tel:|data:|javascript:|app://)'
}

function Normalize-LinkTarget {
    param([Parameter(Mandatory = $true)][string]$Raw)

    $target = $Raw.Trim()

    if ($target -match '^(?<u><[^>]+>|\S+)\s+("[^"]*"|''[^'']*'')$') {
        $target = $Matches['u']
    }

    if ($target.StartsWith("<") -and $target.EndsWith(">")) {
        $target = $target.Substring(1, $target.Length - 2)
    }

    return $target.Trim()
}

$repoRoot = Normalize-FullPath -PathText "."
$docsRootPath = Normalize-FullPath -PathText $DocsRoot
$reportFilePath = Normalize-FullPath -PathText $ReportPath

$excludedDirPattern = '(?i)[\\/](\.git|node_modules|\.obsidian|\.next|dist|coverage)[\\/]'
$mdFiles = Get-ChildItem -Path $docsRootPath -Filter "*.md" -File -Recurse |
    Where-Object {
        $_.FullName -notmatch $excludedDirPattern -and
        $_.FullName -ne $reportFilePath
    }

$allMd = @{}
$inboundCount = @{}
foreach ($file in $mdFiles) {
    $rel = To-RepoRelativePath -RepoRoot $repoRoot -FullPath $file.FullName
    $allMd[$rel] = $true
    if (-not $inboundCount.ContainsKey($rel)) {
        $inboundCount[$rel] = 0
    }
}

$brokenLinks = @()
$linkPattern = '\[[^\]]+\]\((?<target>(?:[^()]|\([^()]*\))+)\)'

foreach ($file in $mdFiles) {
    $sourceRel = To-RepoRelativePath -RepoRoot $repoRoot -FullPath $file.FullName
    $lines = Get-Content -LiteralPath $file.FullName -Encoding UTF8

    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        $matches = [System.Text.RegularExpressions.Regex]::Matches($line, $linkPattern)
        foreach ($m in $matches) {
            $rawTarget = $m.Groups['target'].Value
            $target = Normalize-LinkTarget -Raw $rawTarget
            if ([string]::IsNullOrWhiteSpace($target)) {
                continue
            }

            if (Is-ExternalLink -Target $target) {
                continue
            }

            $resolved = Resolve-LocalLink -SourceFile $file.FullName -Target $target -RepoRoot $repoRoot

            $exists = $true
            if (-not [string]::IsNullOrWhiteSpace($resolved.PathPart)) {
                $exists = (Test-Path -LiteralPath $resolved.ResolvedPath)
            }

            if (-not $exists) {
                $brokenLinks += [PSCustomObject]@{
                    Source = $sourceRel
                    Line   = $i + 1
                    Target = $target
                }
                continue
            }

            if (Test-Path -LiteralPath $resolved.ResolvedPath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($resolved.ResolvedPath)
                if ($ext -ieq ".md") {
                    $targetRel = To-RepoRelativePath -RepoRoot $repoRoot -FullPath $resolved.ResolvedPath
                    if ($allMd.ContainsKey($targetRel) -and ($targetRel -ne $sourceRel)) {
                        $inboundCount[$targetRel] = $inboundCount[$targetRel] + 1
                    }
                }
            }
        }
    }
}

$ignoreSet = @{}
foreach ($v in $OrphanIgnore) {
    $ignoreSet[$v.Replace('\\', '/')] = $true
}

$orphanPages = @()
foreach ($md in $allMd.Keys) {
    if ($ignoreSet.ContainsKey($md)) {
        continue
    }

    if ($inboundCount[$md] -eq 0) {
        $orphanPages += $md
    }
}
$orphanPages = $orphanPages | Sort-Object

$staleMarkerHits = @()
$staleByAge = @()
$threshold = (Get-Date).AddDays(-1 * [math]::Abs($StaleDays))

foreach ($file in $mdFiles) {
    $rel = To-RepoRelativePath -RepoRoot $repoRoot -FullPath $file.FullName

    $lines = Get-Content -LiteralPath $file.FullName -Encoding UTF8
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match $StaleMarkerPattern) {
            $staleMarkerHits += [PSCustomObject]@{
                File    = $rel
                Line    = $i + 1
                Content = $lines[$i].Trim()
            }
        }
    }

    if ($file.LastWriteTime -lt $threshold) {
        $staleByAge += [PSCustomObject]@{
            File          = $rel
            LastWriteTime = $file.LastWriteTime.ToString("yyyy-MM-dd")
            DaysOld       = [int]((Get-Date) - $file.LastWriteTime).TotalDays
        }
    }
}

$staleMarkerHits = $staleMarkerHits | Sort-Object File, Line
$staleByAge = $staleByAge | Sort-Object DaysOld -Descending

$brokenCount = $brokenLinks.Count
$orphanCount = $orphanPages.Count
$staleMarkerCount = $staleMarkerHits.Count
$staleAgeCount = $staleByAge.Count
$totalIssues = $brokenCount + $orphanCount + $staleMarkerCount

$reportLines = @()
$reportLines += "# Wiki Lint Report"
$reportLines += ""
$reportLines += "- Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$reportLines += "- Docs root: `"$DocsRoot`""
$reportLines += "- Stale threshold: $StaleDays days"
$reportLines += ""
$reportLines += "## Summary"
$reportLines += ""
$reportLines += "- Broken local links: $brokenCount"
$reportLines += "- Orphan pages (no inbound links): $orphanCount"
$reportLines += "- Stale marker hits: $staleMarkerCount"
$reportLines += "- Stale-by-age candidates: $staleAgeCount"
$reportLines += ""

$reportLines += "## Broken Local Links"
$reportLines += ""
if ($brokenCount -eq 0) {
    $reportLines += "- none"
}
else {
    foreach ($item in $brokenLinks | Sort-Object Source, Line) {
        $reportLines += "- $($item.Source):$($item.Line) -> $($item.Target)"
    }
}
$reportLines += ""

$reportLines += "## Orphan Pages"
$reportLines += ""
if ($orphanCount -eq 0) {
    $reportLines += "- none"
}
else {
    foreach ($item in $orphanPages) {
        $reportLines += "- $item"
    }
}
$reportLines += ""

$reportLines += "## Stale Marker Hits"
$reportLines += ""
if ($staleMarkerCount -eq 0) {
    $reportLines += "- none"
}
else {
    foreach ($item in $staleMarkerHits) {
        $reportLines += "- $($item.File):$($item.Line) | $($item.Content)"
    }
}
$reportLines += ""

$reportLines += "## Stale-by-Age Candidates"
$reportLines += ""
if ($staleAgeCount -eq 0) {
    $reportLines += "- none"
}
else {
    foreach ($item in $staleByAge) {
        $reportLines += "- $($item.File) | last update: $($item.LastWriteTime) | $($item.DaysOld) days old"
    }
}
$reportLines += ""
$reportLines += "## Notes"
$reportLines += ""
$reportLines += "- Contradiction detection is heuristic: this script reports stale markers and review candidates, not semantic truth checks."
$reportLines += "- Use this report as a triage list before manual review."

$reportDir = Split-Path -Parent $reportFilePath
if (-not (Test-Path -LiteralPath $reportDir)) {
    New-Item -ItemType Directory -Path $reportDir | Out-Null
}

Set-Content -LiteralPath $reportFilePath -Value $reportLines -Encoding UTF8

Write-Host "[wiki-lint] report: $reportFilePath"
Write-Host "[wiki-lint] broken=$brokenCount orphan=$orphanCount stale-marker=$staleMarkerCount stale-age=$staleAgeCount"

if ($FailOnIssue -and $totalIssues -gt 0) {
    throw "wiki lint found issues: $totalIssues"
}

