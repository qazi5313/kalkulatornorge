#!/bin/bash
# Script to add Google Fonts and new CSS links to all HTML files

for file in *.html; do
    echo "Processing $file..."
    
    # Check if Google Fonts already added
    if grep -q "fonts.googleapis.com/css2.*Source" "$file"; then
        echo "  - Google Fonts already added"
    else
        # Add Google Fonts after <head> tag
        sed -i '/<head>/a\    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">' "$file"
        echo "  - Added Google Fonts"
    fi
    
    # Add new CSS links (after any existing link tags but before closing </head>)
    if grep -q "design-system.css" "$file"; then
        echo "  - New CSS already linked"
    else
        sed -i '/<\/head>/i\    <link rel="stylesheet" href="css/design-system.css">\n    <link rel="stylesheet" href="css/components.css">' "$file"
        echo "  - Added new CSS links"
    fi
done

echo "Done!"
