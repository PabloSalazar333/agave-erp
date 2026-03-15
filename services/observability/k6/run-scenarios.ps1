# run-scenarios.ps1
# Ejecuta los 16 escenarios experimentales de la matriz de tesis
# Uso: .\run-scenarios.ps1 -Scenario E1
# Para ejecutar todos: .\run-scenarios.ps1 -All

param(
  [string]$Scenario = "E1",
  [switch]$All = $false
)

$BASE_URL = "https://welcoming-quietude-production-9908.up.railway.app"
$TENANT_ID = "a98378c8-ff85-4ac4-8260-3dbd2bad475c"
$SCRIPT = "inventory-load-test.js"
$RESULTS_DIR = "results"

# Crear directorio de resultados
New-Item -ItemType Directory -Force -Path $RESULTS_DIR | Out-Null

function Run-Scenario {
  param([string]$ScenarioId)

  Write-Host "────────────────────────────────────────" -ForegroundColor Cyan
  Write-Host "Ejecutando escenario: $ScenarioId" -ForegroundColor Cyan
  Write-Host "────────────────────────────────────────" -ForegroundColor Cyan

  $outputFile = "$RESULTS_DIR/${ScenarioId}_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"

  k6 run `
    --env BASE_URL=$BASE_URL `
    --env TENANT_ID=$TENANT_ID `
    --env SCENARIO=$ScenarioId `
    --out json=$outputFile `
    $SCRIPT

  Write-Host "Resultados guardados en: $outputFile" -ForegroundColor Green
}

if ($All) {
  $scenarios = @("E1","E2","E3","E4","E5","E6","E7","E8",
                 "E9","E10","E11","E12","E13","E14","E15","E16")
  foreach ($s in $scenarios) {
    Run-Scenario -ScenarioId $s
    Write-Host "Esperando 60 segundos antes del siguiente escenario..." -ForegroundColor Yellow
    Start-Sleep -Seconds 60
  }
} else {
  Run-Scenario -ScenarioId $Scenario
}