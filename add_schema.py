#!/usr/bin/env python3
"""
Add schema markup to all calculator pages
Run this from your kalkulatornorge root directory
"""

# Schema templates for each calculator
schemas = {
    "brutto-netto.html": {
        "name": "Brutto Netto Kalkulator 2026",
        "description": "Beregn netto lønn fra brutto eller brutto fra netto. Se hvor mye du får utbetalt etter skatt og trekk."
    },
    "feriepenger.html": {
        "name": "Feriepengekalkulator 2026",
        "description": "Beregn feriepenger basert på nye satser for 2026. Se hvor mye du får utbetalt i juni."
    },
    "sykepenger.html": {
        "name": "Sykepengekalkulator 2026",
        "description": "Beregn sykepenger fra NAV og arbeidsgiver. Se hva du får utbetalt ved sykdom."
    },
    "overtid.html": {
        "name": "Overtidskalkulator 2026",
        "description": "Beregn overtidsbetaling med 40% og 100% overtidstillegg. Se hva du tjener på overtidsarbeid."
    },
    "pendlerfradrag.html": {
        "name": "Reisefradrag Kalkulator 2026",
        "description": "Beregn reisefradrag (pendlerfradrag) for 2026. Nye satser: 1,90 kr/km og 12 000 kr bunnfradrag."
    },
    "arbeidsgiveravgift.html": {
        "name": "Arbeidsgiveravgift Kalkulator 2026",
        "description": "Beregn arbeidsgiveravgift (AGA) per sone. Satser fra 0% til 14,1% avhengig av lokasjon."
    },
    "bilkostnad.html": {
        "name": "Bilkostnad Kalkulator 2026",
        "description": "Beregn årlige bilutgifter: drivstoff, forsikring, verditap og vedlikehold. Sammenlign elbil vs bensin."
    },
    "stromkostnad.html": {
        "name": "Strømkostnad Kalkulator 2026",
        "description": "Beregn strømregningen basert på forbruk, spotpris og nettleie. Inkluderer Norgespris-alternativet."
    },
    "tilhengervekt.html": {
        "name": "Tilhengervekt Kalkulator 2026",
        "description": "Sjekk om du kan trekke tilhenger lovlig med førerkort B, B96 eller BE. Beregn maks hengervekt."
    },
    "timelonn-frilanser.html": {
        "name": "Timelønn Kalkulator for Frilansere 2026",
        "description": "Beregn riktig timepris som frilanser. Inkluderer skatt, utgifter og buffer for selvstendig næringsdrivende."
    },
    "barnebidrag.html": {
        "name": "Barnebidrag Kalkulator 2026",
        "description": "Beregn estimert barnebidrag basert på inntekt, samvær og barnets alder. NAVs retningslinjer for 2026."
    }
}

def create_schema_markup(filename, name, description):
    """Create schema markup for a calculator"""
    url = f"https://kalkulatornorge.no/{filename}"
    
    return f'''
<!-- Schema Markup -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "{name}",
  "description": "{description}",
  "url": "{url}",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "inLanguage": "nb-NO",
  "offers": {{
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "NOK"
  }},
  "creator": {{
    "@type": "Organization",
    "name": "Kalkulatornorge.no",
    "url": "https://kalkulatornorge.no"
  }}
}}
</script>
'''

def add_schema_to_file(filename):
    """Add schema markup before closing body tag"""
    try:
        # Read file
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if schema already exists
        if '<!-- Schema Markup -->' in content:
            print(f"⏭️  {filename} - Schema already exists, skipping")
            return False
        
        # Check if </body> exists
        if '</body>' not in content:
            print(f"❌ {filename} - No </body> tag found")
            return False
        
        # Get schema info
        if filename not in schemas:
            print(f"❌ {filename} - No schema template defined")
            return False
        
        schema_info = schemas[filename]
        schema_markup = create_schema_markup(filename, schema_info['name'], schema_info['description'])
        
        # Insert schema before </body>
        new_content = content.replace('</body>', schema_markup + '\n</body>')
        
        # Write back
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ {filename} - Schema added successfully")
        return True
        
    except Exception as e:
        print(f"❌ {filename} - Error: {e}")
        return False

def main():
    """Main function"""
    print("🚀 Adding schema markup to calculators...\n")
    
    updated = 0
    for filename in schemas.keys():
        if add_schema_to_file(filename):
            updated += 1
    
    print(f"\n✨ Done! Updated {updated} files.")
    print("\nNext steps:")
    print("1. git add .")
    print('2. git commit -m "Add schema markup to all calculators"')
    print("3. git push origin main")

if __name__ == "__main__":
    main()
