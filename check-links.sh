#!/usr/bin/env bash
# check-links.sh — Verifica disponibilidad de URLs en resources.json
# Uso: ./check-links.sh [--timeout N] [--parallel N]

set -euo pipefail

RESOURCES_FILE="$(dirname "$0")/src/data/resources.json"
TIMEOUT=10
PARALLEL=10
BROKEN=()
TOTAL=0
CHECKED=0

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --timeout) TIMEOUT="$2"; shift 2 ;;
    --parallel) PARALLEL="$2"; shift 2 ;;
    *) echo "Uso: $0 [--timeout N] [--parallel N]"; exit 1 ;;
  esac
done

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

# Check dependencies
for cmd in curl python3 jq; do
  if ! command -v "$cmd" &>/dev/null; then
    FALLBACK=python3; break
  fi
done

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BLUE}  Bookmark Link Checker${RESET}"
echo -e "${BLUE}  Archivo: ${RESOURCES_FILE}${RESET}"
echo -e "${BLUE}  Timeout: ${TIMEOUT}s | Paralelo: ${PARALLEL} workers${RESET}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

if [[ ! -f "$RESOURCES_FILE" ]]; then
  echo -e "${RED}ERROR: No se encontró el archivo $RESOURCES_FILE${RESET}"
  exit 1
fi

# Extract id, title, url using python3 (avoids jq dependency)
ENTRIES=$(python3 -c "
import json, sys
with open('$RESOURCES_FILE') as f:
    data = json.load(f)
for r in data:
    title = r.get('title', '').replace('|', ' ')
    url   = r.get('url', '')
    rid   = r.get('id', '')
    if url:
        print(f\"{rid}|{title}|{url}\")
")

TOTAL=$(echo "$ENTRIES" | wc -l | tr -d ' ')
echo -e "  Verificando ${TOTAL} enlaces...\n"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

# Function to check a single URL
check_url() {
  local rid="$1"
  local title="$2"
  local url="$3"
  local result_file="$4"

  http_code=$(curl \
    --silent \
    --output /dev/null \
    --write-out "%{http_code}" \
    --max-time "$TIMEOUT" \
    --connect-timeout "$TIMEOUT" \
    --location \
    --user-agent "Mozilla/5.0 (compatible; LinkChecker/1.0)" \
    "$url" 2>/dev/null) || http_code="000"

  if [[ "$http_code" =~ ^(200|201|202|203|204|301|302|307|308)$ ]]; then
    echo "OK|${rid}|${title}|${url}|${http_code}" >> "$result_file"
  else
    echo "BROKEN|${rid}|${title}|${url}|${http_code}" >> "$result_file"
  fi
}

export -f check_url
export TIMEOUT

RESULT_FILE="$TMP_DIR/results.txt"
touch "$RESULT_FILE"

# Run checks in parallel using a simple semaphore
count=0
pids=()

while IFS='|' read -r rid title url; do
  check_url "$rid" "$title" "$url" "$RESULT_FILE" &
  pids+=($!)
  count=$((count + 1))

  # Limit parallelism
  if (( ${#pids[@]} >= PARALLEL )); then
    wait "${pids[0]}"
    pids=("${pids[@]:1}")
  fi

  # Progress indicator
  printf "\r  Progreso: %d / %d" "$count" "$TOTAL"
done <<< "$ENTRIES"

# Wait for remaining jobs
for pid in "${pids[@]}"; do
  wait "$pid"
done

echo -e "\r  Progreso: ${TOTAL} / ${TOTAL} ✓\n"

# Count results
OK_COUNT=$(grep -c "^OK|" "$RESULT_FILE" 2>/dev/null || echo 0)
BROKEN_COUNT=$(grep -c "^BROKEN|" "$RESULT_FILE" 2>/dev/null || echo 0)

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "  ${GREEN}✓ Disponibles:${RESET} ${OK_COUNT}"
echo -e "  ${RED}✗ Rotos/Inaccesibles:${RESET} ${BROKEN_COUNT}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"

if [[ "$BROKEN_COUNT" -gt 0 ]]; then
  echo ""
  echo -e "${YELLOW}  ENLACES ROTOS O INACCESIBLES:${RESET}"
  echo ""
  printf "  %-5s %-6s %-35s %s\n" "ID" "HTTP" "Título" "URL"
  printf "  %s\n" "──────────────────────────────────────────────────────────────"
  while IFS='|' read -r status rid title url http_code; do
    printf "  %-5s ${RED}%-6s${RESET} %-35s %s\n" "$rid" "$http_code" "${title:0:35}" "$url"
  done < <(grep "^BROKEN|" "$RESULT_FILE")
  echo ""
  echo -e "  ${YELLOW}Para eliminar un recurso, edita manualmente: src/data/resources.json${RESET}"
  echo ""
fi

# Save broken links report
if [[ "$BROKEN_COUNT" -gt 0 ]]; then
  REPORT_FILE="broken-links-$(date +%Y%m%d-%H%M%S).txt"
  {
    echo "Reporte de enlaces rotos — $(date)"
    echo "================================================"
    grep "^BROKEN|" "$RESULT_FILE" | while IFS='|' read -r status rid title url http_code; do
      echo "ID: $rid | HTTP: $http_code | $title"
      echo "    $url"
      echo ""
    done
  } > "$REPORT_FILE"
  echo -e "  Reporte guardado en: ${BLUE}${REPORT_FILE}${RESET}"
  echo ""
fi

exit $(( BROKEN_COUNT > 0 ? 1 : 0 ))
