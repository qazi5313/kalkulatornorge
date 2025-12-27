#!/bin/bash
# Script to replace old colors and gradients with new design system

echo "Replacing colors and gradients in all HTML files..."

for file in index.html skatt.html brutto-netto.html feriepenger.html barnebidrag.html sykepenger.html overtid.html pendlerfradrag.html arbeidsgiveravgift.html bilkostnad.html stromkostnad.html tilhengervekt.html timelonn-frilanser.html personvern.html; do
    echo "Processing $file..."
    
    # Replace teal colors with rust
    sed -i 's/#1FD59B/#C4533A/g' "$file"
    sed -i 's/#00CED1/#C4533A/g' "$file"
    sed -i 's/#11998e/#C4533A/g' "$file"
    sed -i 's/#38ef7d/#C4533A/g' "$file"
    
    # Replace purple colors with rust
    sed -i 's/#667eea/#C4533A/g' "$file"
    sed -i 's/#764ba2/#C4533A/g' "$file"
    
    # Replace gradient backgrounds with solid cream
    sed -i 's/background: linear-gradient([^;]*);/background: #FAF9F7;/g' "$file"
    sed -i "s/background: linear-gradient([^']*)'/background: #FAF9F7'/g" "$file"
    
    # Replace dark backgrounds with cream
    sed -i 's/background: #333/background: #FAF9F7/g' "$file"
    sed -i 's/background: #444/background: #FAF9F7/g' "$file"
    sed -i 's/background:#333/background:#FAF9F7/g' "$file"
    
done

echo "Color transformation complete!"
