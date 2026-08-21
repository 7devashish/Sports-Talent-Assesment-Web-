$content = Get-Content 'server/src/services/mlEngine.js' -Raw
$pattern = '(?s)function determineArchetype\([^)]+\) \{.*?return \{\s*primary: candidates\[0\]\.name,.*?similarity: candidates\[0\]\.similarity\s*\};\s*\}'
$new_content = [regex]::Replace($content, $pattern, $args[0])
$new_content = $new_content -replace 'function evaluatePlayerTalent', 'async function evaluatePlayerTalent'
$new_content = $new_content -replace 'const archetypeInfo = determineArchetype', 'const archetypeInfo = await determineArchetype'
Set-Content 'server/src/services/mlEngine.js' -Value $new_content
