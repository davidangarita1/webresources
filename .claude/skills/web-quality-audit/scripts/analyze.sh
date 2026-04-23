#!/bin/bash
set -e


usage() {
  echo "Usage: $0 <file_or_directory>" >&2
  echo "Analyzes HTML files for web quality issues." >&2
  exit 1
}

if [ -z "$1" ]; then
  usage
fi

TARGET="$1"
ISSUES=()
WARNINGS=()

analyze_html() {
  local file="$1"
  echo "Analyzing: $file" >&2

  if ! grep -qi "<!doctype html>" "$file"; then
    ISSUES+=("$file: Missing HTML5 doctype")
  fi

  if ! grep -qi 'charset.*utf-8' "$file"; then
    WARNINGS+=("$file: Missing or non-UTF-8 charset declaration")
  fi

  if ! grep -qi 'name="viewport"' "$file"; then
    ISSUES+=("$file: Missing viewport meta tag")
  fi

  if ! grep -qi '<html.*lang=' "$file"; then
    ISSUES+=("$file: Missing lang attribute on <html>")
  fi

  if grep -qE '<img[^>]*>' "$file" && grep -qE '<img(?![^>]*alt=)[^>]*>' "$file" 2>/dev/null; then
    WARNINGS+=("$file: Possible images without alt text")
  fi

  if ! grep -qi '<title>' "$file"; then
    ISSUES+=("$file: Missing <title> tag")
  fi

  if grep -qE 'http://' "$file"; then
    WARNINGS+=("$file: Contains non-HTTPS URLs")
  fi
}

if [ -d "$TARGET" ]; then
  find "$TARGET" -name "*.html" -o -name "*.htm" | while read -r file; do
    analyze_html "$file"
  done
elif [ -f "$TARGET" ]; then
  analyze_html "$TARGET"
else
  echo "Error: $TARGET is not a valid file or directory" >&2
  exit 1
fi

echo '{'
echo '  "issues": ['
for i in "${!ISSUES[@]}"; do
  if [ $i -gt 0 ]; then echo ','; fi
  echo -n "    \"${ISSUES[$i]}\""
done
echo ''
echo '  ],'
echo '  "warnings": ['
for i in "${!WARNINGS[@]}"; do
  if [ $i -gt 0 ]; then echo ','; fi
  echo -n "    \"${WARNINGS[$i]}\""
done
echo ''
echo '  ],'
echo "  \"issueCount\": ${#ISSUES[@]},"
echo "  \"warningCount\": ${#WARNINGS[@]}"
echo '}'
