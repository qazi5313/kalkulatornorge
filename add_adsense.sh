#!/bin/bash

# AdSense code to insert
ADSENSE_CODE='    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4100900262694764" crossorigin="anonymous"></script>'

# List of all HTML files to update
FILES=(
  "index.html"
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
  "personvern.html"
)

echo "Adding AdSense code to all HTML files..."

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Check if AdSense code already exists
    if grep -q "pagead2.googlesyndication.com" "$file"; then
      echo "⏭️  $file - AdSense code already exists, skipping"
    else
      # Insert after <head> tag
      sed -i "/<head>/a\\
$ADSENSE_CODE" "$file"
      echo "✅ $file - AdSense code added"
    fi
  else
    echo "❌ $file - File not found"
  fi
done

echo ""
echo "✨ Done! Run these commands to push:"
echo "git add ."
echo 'git commit -m "Add Google AdSense code"'
echo "git push origin main"
