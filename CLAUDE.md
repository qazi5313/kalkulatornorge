# Kalkulatornorge.no - Project Documentation

## Project Overview

**Kalkulatornorge.no** is a Norwegian calculator website providing 12 financial and tax calculators for Norwegian citizens. The site is built as a static website hosted on GitHub Pages with all calculations performed client-side using JavaScript.

### Key Features
- 100% client-side calculations (no backend required)
- Privacy-focused: No data storage or tracking beyond analytics
- Norwegian language (Bokmål)
- Mobile-responsive design
- SEO optimized
- GDPR-compliant cookie consent

### Repository
- **GitHub:** https://github.com/qazi5313/kalkulatornorge
- **Hosting:** GitHub Pages
- **Domain:** kalkulatornorge.no

---

## Current State: 12 Calculators with Hardcoded 2025 Tax Rates

All tax rates, deductions, and financial formulas are **hardcoded directly in JavaScript** within each HTML file. There is no centralized configuration system.

### Complete Calculator List

| # | Calculator | File | Status |
|---|------------|------|--------|
| 1 | **Skattekalkulator** (Income Tax) | `skatt.html` | 2025 rates hardcoded |
| 2 | **Brutto/Netto Lønnskalkulator** (Gross/Net Salary) | `brutto-netto.html` | 2025 rates hardcoded |
| 3 | **Feriepengekalkulator** (Holiday Pay) | `feriepenger.html` | 2025 rates hardcoded |
| 4 | **Overtidsbetaling** (Overtime Pay) | `overtid.html` | 2025 rates hardcoded |
| 5 | **Arbeidsgiveravgift** (Employer Tax) | `arbeidsgiveravgift.html` | 2025 rates hardcoded |
| 6 | **Strømkostnad** (Electricity Cost) | `stromkostnad.html` | 2025 rates hardcoded |
| 7 | **Bilkostnad** (Car Costs) | `bilkostnad.html` | 2025 rates hardcoded |
| 8 | **Barnebidrag** (Child Support) | `barnebidrag.html` | 2025 rates hardcoded |
| 9 | **Sykepenger** (Sick Leave Pay) | `sykepenger.html` | 2025 rates hardcoded |
| 10 | **Pendlerfradrag** (Commuter Deduction) | `pendlerfradrag.html` | 2025 rates hardcoded |
| 11 | **Tilhengervekt** (Trailer Weight) | `tilhengervekt.html` | Legal limits (no tax rates) |
| 12 | **Timelønn for Frilansere** (Freelancer Hourly Rate) | `timelonn-frilanser.html` | User-configurable rates |

---

## The Problem

### Issues with Current Architecture

1. **Hardcoded Values in 12+ Locations**
   - Tax rates, brackets, deductions, and thresholds are scattered across 12 HTML files
   - Same rates duplicated in multiple calculators (e.g., VAT, social security tax)
   - Updating to 2026 rates requires editing multiple files

2. **High Maintenance Burden**
   - Annual tax rate updates require manual changes in each calculator
   - Risk of inconsistency if one calculator is missed or updated incorrectly
   - No single source of truth for Norwegian tax rates

3. **Error-Prone Updates**
   - Copy-paste errors when updating rates
   - Version mismatches (e.g., one calculator on 2025, another on 2026)
   - No validation that all calculators use consistent rates

4. **Limited Flexibility**
   - Cannot easily compare rates across years
   - Cannot implement "historical calculator" feature
   - Cannot A/B test rate changes before publishing

---

## 2025 Tax Rates Currently Hardcoded

### Skattekalkulator (skatt.html)

**Trinnskatt (Bracket Tax) - 2025:**
- Bracket 1: **1.9%** on income 208,151 - 292,850 kr
- Bracket 2: **4.2%** on income 292,851 - 670,000 kr
- Bracket 3: **13.9%** on income 670,001 - 937,900 kr
- Bracket 4: **16.9%** on income 937,901 - 1,350,000 kr
- Bracket 5: **17.9%** on income over 1,350,000 kr

**Other Tax Components:**
- Minstefradrag (Standard Deduction): **46%** (max 104,450 kr)
- Kommuneskatt (Municipal Tax): **22%**
- Trygdeavgift (Social Security Tax): **8.3%**

### Brutto/Netto Lønnskalkulator (brutto-netto.html)
- Simplified flat tax rate: **28%**

### Feriepengekalkulator (feriepenger.html)
- Standard employees: **10.2%**
- Employees over 60 or high earners: **12%**

### Overtidsbetaling (overtid.html)
- Weekday overtime: **1.5x** (50% bonus)
- Evening/weekend overtime: **2.0x** (100% bonus)

### Arbeidsgiveravgift (arbeidsgiveravgift.html)
- Sone 1 (Oslo, Bergen, Stavanger, Trondheim): **14.1%**
- Sone 2 (Akershus, Rogaland, Hordaland): **10.6%**
- Sone 3 (South/East Norway): **6.4%**
- Sone 4 (North Norway): **5.1%**
- Sone 5 (Svalbard, foreign ships): **0%**

### Barnebidrag (barnebidrag.html)
- Child support rate: **1,710 kr/month per child**

### Sykepenger (sykepenger.html)
- Sick leave cap: **744,168 kr** (6G - 6x Grunnbeløpet)
- Sick leave rate (days 17+): **80%** of capped salary

### Pendlerfradrag (pendlerfradrag.html)
- Commuter deduction: **1.72 kr/km** (for distance over 50 km)

### Strømkostnad (stromkostnad.html)
- Electricity VAT: **25%**

### Shared Constants
- **G (Grunnbeløpet)**: 124,028 kr (base amount for Norwegian social security)
- **Working days per year**: 260 days
- **Average weeks per month**: 4.33 weeks

---

## Proposed Solution: Centralized Rate Configuration System

### Architecture Overview

Create a **single JavaScript configuration file** (`tax-rates-config.js`) that contains all tax rates, deductions, brackets, and thresholds for multiple years.

### Benefits

1. **Single Source of Truth**
   - All rates defined in one file
   - Easy to audit and verify accuracy
   - Consistent rates across all calculators

2. **Year-Based Versioning**
   - Support multiple tax years simultaneously
   - Easy comparison between 2025 and 2026 rates
   - Historical data preserved for reference

3. **Easy Annual Updates**
   - Update one file instead of 12+ HTML files
   - Reduced risk of errors or omissions
   - Version control tracks all rate changes

4. **Future-Proof Design**
   - Can add new calculators without duplicating rate logic
   - Can implement year selector for historical calculations
   - Can programmatically validate rate consistency

---

## Implementation Plan

### Phase 1: Create Centralized Configuration (PRIORITY)

**File:** `tax-rates-config.js`

```javascript
const TAX_RATES = {
  2025: {
    // Income tax brackets (Trinnskatt)
    incomeTaxBrackets: [
      { min: 208151, max: 292850, rate: 0.019 },
      { min: 292851, max: 670000, rate: 0.042 },
      { min: 670001, max: 937900, rate: 0.139 },
      { min: 937901, max: 1350000, rate: 0.169 },
      { min: 1350001, max: Infinity, rate: 0.179 }
    ],

    // Deductions and taxes
    standardDeduction: { rate: 0.46, max: 104450 },
    municipalTax: 0.22,
    socialSecurityTax: 0.083,

    // Employer tax by zone
    employerTax: {
      zone1: 0.141,
      zone2: 0.106,
      zone3: 0.064,
      zone4: 0.051,
      zone5: 0.00
    },

    // Holiday pay
    holidayPay: {
      standard: 0.102,
      over60: 0.12
    },

    // Other rates
    childSupport: 1710,
    commuterDeduction: 1.72,
    grunnbeløpet: 124028,
    sickLeaveCap: 744168,
    electricityVAT: 0.25,

    // Constants
    workingDaysPerYear: 260,
    weeksPerMonth: 4.33
  },

  2026: {
    // TODO: Update with official 2026 rates when published
    // Expected changes: Bracket thresholds, municipal tax, employer tax zones
    incomeTaxBrackets: [
      { min: 0, max: 0, rate: 0.00 }  // Placeholder
    ],
    standardDeduction: { rate: 0.46, max: 104450 },
    municipalTax: 0.22,
    // ... rest of 2026 rates
  }
};

// Default to current year
const CURRENT_YEAR = 2025;

// Helper function to get rates for a specific year
function getRates(year = CURRENT_YEAR) {
  return TAX_RATES[year] || TAX_RATES[CURRENT_YEAR];
}
```

### Phase 2: Update Calculator Files

For each calculator HTML file:

1. Add `<script src="tax-rates-config.js"></script>` before calculator logic
2. Replace hardcoded values with `getRates().propertyName`
3. Update comments to reference config file instead of inline rates
4. Update page titles from "2025" to dynamic year

**Example Refactoring:**

**Before (skatt.html):**
```javascript
const municipalTax = taxableIncome * 0.22;  // Hardcoded
```

**After (skatt.html):**
```javascript
const rates = getRates();
const municipalTax = taxableIncome * rates.municipalTax;
```

### Phase 3: Add 2026 Tax Rates

Once Norwegian tax authorities (Skatteetaten) publish 2026 rates:

1. Update `TAX_RATES.2026` object in `tax-rates-config.js`
2. Change `CURRENT_YEAR = 2026`
3. Update page titles across all calculators
4. Test all 12 calculators thoroughly
5. Deploy to GitHub Pages

**Expected 2026 Changes (to monitor):**
- Income tax brackets (thresholds and rates)
- Grunnbeløpet (G) adjustment (affects sick leave cap)
- Employer tax zone percentages
- Child support rates
- Commuter deduction rate
- Standard deduction maximum

### Phase 4: Quality Assurance

- [ ] Create test suite to validate all calculators
- [ ] Compare results against Skatteetaten's official calculators
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)
- [ ] Test on mobile devices
- [ ] Verify Norwegian locale formatting (thousands separator, decimals)

---

## File Structure (After Refactoring)

```
kalkulatornorge/
├── index.html                      # Homepage
├── tax-rates-config.js             # ⭐ NEW: Centralized rate configuration
├── skatt.html                      # Updated to use config
├── brutto-netto.html               # Updated to use config
├── feriepenger.html                # Updated to use config
├── overtid.html                    # Updated to use config
├── arbeidsgiveravgift.html         # Updated to use config
├── stromkostnad.html               # Updated to use config
├── bilkostnad.html                 # Updated to use config
├── barnebidrag.html                # Updated to use config
├── sykepenger.html                 # Updated to use config
├── pendlerfradrag.html             # Updated to use config
├── tilhengervekt.html              # (No changes needed)
├── timelonn-frilanser.html         # (No changes needed - user input)
├── blog.html
├── personvern.html
└── README.md
```

---

## Maintenance Schedule

### Annual Tax Rate Updates (November/December)

When Skatteetaten publishes new tax rates:

1. **Research Phase:**
   - Monitor https://www.skatteetaten.no/ for rate announcements
   - Review changes to Grunnbeløpet (G)
   - Check employer tax zone adjustments
   - Verify child support rate changes

2. **Update Phase:**
   - Add new year to `TAX_RATES` object in `tax-rates-config.js`
   - Update `CURRENT_YEAR` constant
   - Update all page titles from "202X" to new year
   - Update info boxes with new rate explanations

3. **Testing Phase:**
   - Test all 12 calculators with sample data
   - Cross-reference results with official sources
   - Verify mobile responsiveness
   - Check Norwegian locale formatting

4. **Deployment Phase:**
   - Commit changes to git
   - Push to GitHub (auto-deploys via GitHub Pages)
   - Monitor analytics for errors
   - Update sitemap.xml if needed

---

## Sources for Official Tax Rates

### Primary Sources
- **Skatteetaten:** https://www.skatteetaten.no/
- **Satser og beløp:** https://www.skatteetaten.no/satser/
- **NAV (for Grunnbeløpet):** https://www.nav.no/grunnbelopet
- **Finans Norge:** https://www.finansnorge.no/

### Calculator-Specific Sources
- **Feriepenger:** https://www.arbeidstilsynet.no/
- **Arbeidsgiveravgift:** https://www.skatteetaten.no/satser/arbeidsgiveravgift/
- **Barnebidrag:** https://www.nav.no/barnebidrag
- **Pendlerfradrag:** https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/reise/

---

## Technical Notes

### Current Architecture
- **Framework:** None (vanilla HTML/CSS/JavaScript)
- **Dependencies:** None (no npm packages, no build system)
- **Hosting:** GitHub Pages (static hosting)
- **Analytics:** Google Analytics (GA-1LJB1LYD72)
- **Domain:** Custom domain via CNAME

### Design Patterns
- Each calculator is a standalone HTML file
- Embedded CSS in `<style>` tags
- Embedded JavaScript in `<script>` tags
- No external CSS/JS files (except future `tax-rates-config.js`)
- Norwegian locale number formatting: `toLocaleString('nb-NO')`

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used
- Mobile-responsive via CSS media queries

---

## Future Enhancements

### Potential Features
1. **Year Selector:** Allow users to calculate with historical rates
2. **Rate Comparison Tool:** Compare tax rates between years
3. **Multi-Language Support:** Add English version for expats
4. **PDF Export:** Generate printable tax calculation reports
5. **API Integration:** Pull rates directly from Skatteetaten API (if available)
6. **Calculator Recommendations:** Suggest related calculators based on user input
7. **Email Results:** Allow users to email calculation results
8. **Dark Mode:** Add dark theme toggle

### Code Quality Improvements
1. **Extract Common CSS:** Create shared stylesheet for consistent design
2. **Extract Common JS:** Shared utility functions (formatting, validation)
3. **Unit Tests:** Automated testing for calculation accuracy
4. **Linting:** ESLint for code consistency
5. **Minification:** Optimize file sizes for faster loading
6. **Service Worker:** Offline PWA functionality

---

## Contributing

### How to Update Tax Rates

1. Clone the repository
2. Edit `tax-rates-config.js` (after it's created)
3. Add new year or update existing rates
4. Test locally by opening HTML files in browser
5. Commit with descriptive message: `Update tax rates for 2026`
6. Push to `main` branch
7. GitHub Pages automatically deploys

### Code Standards
- **Language:** Norwegian (Bokmål) for all user-facing text
- **Currency:** Always format as "kr" suffix
- **Numbers:** Use Norwegian locale formatting (space as thousands separator)
- **Validation:** Always validate user input before calculations
- **Accessibility:** Maintain semantic HTML and ARIA labels

---

## Changelog

### 2025-12-24
- Created `CLAUDE.md` documentation
- Identified 12 calculators with hardcoded 2025 rates
- Proposed centralized rate configuration system
- Documented all current tax rates and thresholds

### 2025 (Earlier)
- Homepage redesign with unified branding
- Applied teal/cyan color scheme
- Improved search functionality
- Added blog page
- Created 12 tax calculators

---

## Contact & Support

- **GitHub Issues:** https://github.com/qazi5313/kalkulatornorge/issues
- **Repository:** https://github.com/qazi5313/kalkulatornorge
- **Website:** https://kalkulatornorge.no

---

**Last Updated:** 2025-12-24
**Tax Rates Version:** 2025
**Next Update Required:** January 2026 (when 2026 rates are published)
