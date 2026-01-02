#!/bin/bash

FILES=(
  "skatt.html"
  "brutto-netto.html"
  "feriepenger.html"
  "sykepenger.html"
  "overtid.html"
  "pendlerfradrag.html"
  "arbeidsgiveravgift.html"
  "bilkostnad.html"
  "stromkostnad.html"
  "tilhengervekt.html"
  "timelonn-frilanser.html"
  "barnebidrag.html"
)

echo "Wrapping tables in all calculator pages..."

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Check if already wrapped
    if grep -q "info-table-container" "$file"; then
      echo "⏭️  $file - Tables already wrapped"
    else
      # Wrap all <table> tags with div
      sed -i 's/<table>/<div class="info-table-container"><table>/g' "$file"
      sed -i 's/<\/table>/<\/table><\/div>/g' "$file"
      echo "✅ $file - Tables wrapped"
    fi
  fi
done

echo ""
echo "Done! Push with:"
echo "git add ."
echo 'git commit -m "Wrap tables for mobile scrolling"'
echo "git push origin main"
