/**
 * NORWEGIAN TAX RATES CONFIGURATION
 * Kalkulatornorge.no - Centralized Rate Management System
 *
 * This file contains all tax rates, deductions, thresholds, and financial
 * constants used across all calculators on the website.
 *
 * SOURCES:
 * - Skatteetaten (Norwegian Tax Authority): https://www.skatteetaten.no/satser/
 * - NAV (Norwegian Labour and Welfare): https://www.nav.no/grunnbelopet
 * - Last updated: 2025-12-25
 *
 * MAINTENANCE:
 * Update this file annually when new tax rates are published (typically November/December)
 */

const TAX_RATES = {
  /**
   * 2025 TAX RATES
   * Status: HISTORICAL (replaced by 2026 rates)
   */
  2025: {
    // Income tax brackets (Trinnskatt)
    // Progressive tax applied on top of municipal and social security taxes
    // NOTE: First 208,150 kr has 0% trinnskatt
    incomeTaxBrackets: [
      { trinn: 0, threshold: 0, upperLimit: 208150, rate: 0.000, ratePercent: '0%' },
      { trinn: 1, threshold: 208151, upperLimit: 292850, rate: 0.019, ratePercent: '1.9%' },
      { trinn: 2, threshold: 292851, upperLimit: 670000, rate: 0.042, ratePercent: '4.2%' },
      { trinn: 3, threshold: 670001, upperLimit: 937900, rate: 0.139, ratePercent: '13.9%' },
      { trinn: 4, threshold: 937901, upperLimit: 1350000, rate: 0.169, ratePercent: '16.9%' },
      { trinn: 5, threshold: 1350001, upperLimit: Infinity, rate: 0.179, ratePercent: '17.9%' }
    ],

    // Municipal income tax (Alminnelig inntekt / Kommuneskatt)
    municipalTax: {
      rate: 0.22,
      ratePercent: '22%',
      description: 'Flat rate on taxable income'
    },

    // Social security tax (Trygdeavgift)
    socialSecurityTax: {
      lonnsinntekt: {
        rate: 0.083,
        ratePercent: '8.3%',
        description: 'Salary income (age 17-69)'
      },
      underAge17OrOver69: {
        rate: 0.083,
        ratePercent: '8.3%',
        description: 'Under 17 or over 69 years old'
      },
      naering: {
        rate: 0.083,
        ratePercent: '8.3%',
        description: 'Self-employment income (næringsinntekt)'
      },
      pensjon: {
        rate: 0.083,
        ratePercent: '8.3%',
        description: 'Pension income'
      },
      nedreGrense: 54650,
      description: 'Applied on gross income minus deductions'
    },

    // Standard deduction (Minstefradrag)
    standardDeduction: {
      rate: 0.46,
      ratePercent: '46%',
      maxAmount: 104450,
      description: 'Automatic deduction for salary earners'
    },

    // Personal deduction (Personfradrag)
    // Note: In 2025, this was implicit in the bracket thresholds
    personalDeduction: {
      amount: 0,
      description: 'Built into tax bracket thresholds'
    },

    // Employer tax by geographic zone (Arbeidsgiveravgift)
    employerTax: {
      zone1: { rate: 0.141, ratePercent: '14.1%', areas: 'Oslo, Bergen, Stavanger, Trondheim' },
      zone2: { rate: 0.106, ratePercent: '10.6%', areas: 'Akershus, Rogaland, Hordaland' },
      zone3: { rate: 0.064, ratePercent: '6.4%', areas: 'Southern and Eastern Norway' },
      zone4: { rate: 0.051, ratePercent: '5.1%', areas: 'Northern Norway' },
      zone5: { rate: 0.00, ratePercent: '0%', areas: 'Svalbard, Norwegian ships in foreign trade' }
    },

    // Holiday pay (Feriepenger)
    holidayPay: {
      standard: 0.102,
      standardPercent: '10.2%',
      over60: 0.12,
      over60Percent: '12%',
      description: 'Percentage of annual salary'
    },

    // Commuter deduction (Pendlerfradrag / Reisefradrag)
    commuterDeduction: {
      ratePerKm: 1.72,
      threshold: 50000,
      description: 'Tax deduction for long commutes (over 50 km)'
    },

    // Child support (Barnebidrag)
    childSupport: {
      monthlyRate: 1710,
      description: 'Minimum child support payment (foreldrebetaling)'
    },

    // National Insurance base amount (Grunnbeløpet - G)
    grunnbeløpet: {
      G: 124028,
      '6G': 744168,
      description: 'Base amount for social security calculations'
    },

    // Sick leave (Sykepenger)
    sickLeave: {
      employerDays: 16,
      employerRate: 1.00,
      navDays: 248,
      navRate: 0.80,
      maxAmount: 744168,
      workingDaysPerYear: 260,
      description: 'Sick leave compensation structure'
    },

    // VAT rates (Merverdiavgift - MVA)
    vat: {
      standard: 0.25,
      standardPercent: '25%',
      food: 0.15,
      foodPercent: '15%',
      reduced: 0.12,
      reducedPercent: '12%',
      description: 'Value Added Tax rates'
    },

    // Overtime multipliers (Overtidsbetaling)
    overtime: {
      weekday: 1.5,
      evening: 2.0,
      weekend: 2.0,
      description: 'Standard overtime pay multipliers'
    },

    // Common constants
    constants: {
      workingDaysPerYear: 260,
      weeksPerMonth: 4.33,
      monthsPerYear: 12,
      workingHoursPerWeek: 37.5
    }
  },

  /**
   * 2026 TAX RATES (CURRENT)
   * Status: ACTIVE - Use these rates for all calculations
   * Source: Skatteetaten (verified official rates)
   */
  2026: {
    // Income tax brackets (Trinnskatt)
    // CORRECTED: Exact boundaries matching Skatteetaten
    // NOTE: First 226,100 kr has 0% trinnskatt
    incomeTaxBrackets: [
      { trinn: 0, threshold: 0, upperLimit: 226100, rate: 0.000, ratePercent: '0%' },
      { trinn: 1, threshold: 226101, upperLimit: 318300, rate: 0.017, ratePercent: '1.7%' },
      { trinn: 2, threshold: 318301, upperLimit: 725050, rate: 0.040, ratePercent: '4.0%' },
      { trinn: 3, threshold: 725051, upperLimit: 980100, rate: 0.137, ratePercent: '13.7%' },
      { trinn: 4, threshold: 980101, upperLimit: 1467200, rate: 0.168, ratePercent: '16.8%' },
      { trinn: 5, threshold: 1467201, upperLimit: Infinity, rate: 0.178, ratePercent: '17.8%' }
    ],

    // Municipal income tax (Alminnelig inntekt)
    municipalTax: {
      rate: 0.22,
      ratePercent: '22%',
      description: 'Flat rate on taxable income (unchanged from 2025)'
    },

    // Social security tax (Trygdeavgift)
    // CORRECTED: All categories with proper rates
    socialSecurityTax: {
      lonnsinntekt: {
        rate: 0.076,
        ratePercent: '7.6%',
        description: 'Salary income (age 17-69)'
      },
      underAge17OrOver69: {
        rate: 0.051,
        ratePercent: '5.1%',
        description: 'Under 17 or over 69 years old'
      },
      naering: {
        rate: 0.108,
        ratePercent: '10.8%',
        description: 'Self-employment income (næringsinntekt)'
      },
      fiskeOgFangst: {
        rate: 0.076,
        ratePercent: '7.6%',
        description: 'Fishing and hunting income'
      },
      pensjon: {
        rate: 0.051,
        ratePercent: '5.1%',
        description: 'Pension income'
      },
      nedreGrense: 99650,
      phaseInRate: 0.25,
      description: 'Lower threshold: 99,650 kr, phase-in rate: 25%'
    },

    // Standard deduction (Minstefradrag)
    // CHANGED: Maximum reduced from 104,450 kr to 95,700 kr
    standardDeduction: {
      rate: 0.46,
      ratePercent: '46%',
      maxAmount: 95700,
      description: 'Automatic deduction for salary earners'
    },

    // Personal deduction (Personfradrag)
    // NEW: Explicitly defined for 2026
    personalDeduction: {
      amount: 114540,
      description: 'Standard personal deduction applied before tax calculation'
    },

    // Employer tax by geographic zone (Arbeidsgiveravgift)
    // NEW: Zone 4a added with 7.9% rate
    employerTax: {
      zone1: { rate: 0.141, ratePercent: '14.1%', areas: 'Oslo, Bergen, Stavanger, Trondheim' },
      zone2: { rate: 0.106, ratePercent: '10.6%', areas: 'Akershus, Rogaland, Hordaland' },
      zone3: { rate: 0.064, ratePercent: '6.4%', areas: 'Southern and Eastern Norway' },
      zone4: { rate: 0.051, ratePercent: '5.1%', areas: 'Northern Norway (reduced rate)' },
      zone4a: { rate: 0.079, ratePercent: '7.9%', areas: 'Northern Norway (standard rate)' },
      zone5: { rate: 0.00, ratePercent: '0%', areas: 'Svalbard, Norwegian ships in foreign trade' }
    },

    // Holiday pay (Feriepenger)
    // UNCHANGED from 2025
    holidayPay: {
      standard: 0.102,
      standardPercent: '10.2%',
      over60: 0.12,
      over60Percent: '12%',
      description: 'Percentage of annual salary'
    },

    // Commuter deduction (Pendlerfradrag / Reisefradrag)
    // CHANGED: Rate increased, new egenandel (deductible) and max amount
    commuterDeduction: {
      ratePerKm: 1.90,
      egenandel: 12000,
      maxAmount: 120000,
      description: 'Tax deduction: 1.90 kr/km, deductible 12,000 kr, max 120,000 kr'
    },

    // Child support (Barnebidrag)
    // TODO: Verify 2026 rate (using 2025 as placeholder)
    childSupport: {
      monthlyRate: 1710,
      description: 'Minimum child support payment (verify 2026 rate)'
    },

    // National Insurance base amount (Grunnbeløpet - G)
    // CHANGED: Increased from 124,028 kr to 130,160 kr
    // NOTE: Updates again May 1, 2026
    grunnbeløpet: {
      G: 130160,
      '6G': 780960,
      description: 'Base amount for social security (updates May 1, 2026)'
    },

    // Sick leave (Sykepenger)
    // CHANGED: Cap increased due to G increase
    sickLeave: {
      employerDays: 16,
      employerRate: 1.00,
      navDays: 248,
      navRate: 0.80,
      maxAmount: 780960,
      workingDaysPerYear: 260,
      description: 'Sick leave compensation structure'
    },

    // VAT rates (Merverdiavgift - MVA)
    // UNCHANGED from 2025
    vat: {
      standard: 0.25,
      standardPercent: '25%',
      food: 0.15,
      foodPercent: '15%',
      reduced: 0.12,
      reducedPercent: '12%',
      description: 'Value Added Tax rates'
    },

    // Overtime multipliers (Overtidsbetaling)
    // UNCHANGED from 2025
    overtime: {
      weekday: 1.5,
      evening: 2.0,
      weekend: 2.0,
      description: 'Standard overtime pay multipliers'
    },

    // Common constants
    constants: {
      workingDaysPerYear: 260,
      weeksPerMonth: 4.33,
      monthsPerYear: 12,
      workingHoursPerWeek: 37.5
    }
  }
};

/**
 * CURRENT TAX YEAR
 * Update this to switch all calculators to new rates
 */
const CURRENT_YEAR = 2026;

/**
 * Get tax rates for a specific year
 * @param {number} year - Tax year (2025, 2026, etc.)
 * @returns {object} Tax rates object for the specified year
 */
function getRates(year = CURRENT_YEAR) {
  if (!TAX_RATES[year]) {
    console.warn(`Tax rates for year ${year} not found. Using ${CURRENT_YEAR} rates.`);
    return TAX_RATES[CURRENT_YEAR];
  }
  return TAX_RATES[year];
}

/**
 * Get current active tax year
 * @returns {number} Current tax year
 */
function getCurrentYear() {
  return CURRENT_YEAR;
}

/**
 * Calculate bracket tax (Trinnskatt)
 * @param {number} taxableIncome - Income after deductions
 * @param {number} year - Tax year (defaults to current)
 * @returns {number} Total bracket tax amount
 */
function calculateBracketTax(taxableIncome, year = CURRENT_YEAR) {
  const rates = getRates(year);
  const brackets = rates.incomeTaxBrackets;
  let tax = 0;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];

    // Skip if income hasn't reached this bracket
    if (taxableIncome <= bracket.threshold) {
      break;
    }

    // Calculate tax for this bracket
    const upperLimit = bracket.upperLimit === Infinity ? taxableIncome : Math.min(taxableIncome, bracket.upperLimit);
    const lowerLimit = bracket.threshold;
    const taxableInBracket = upperLimit - lowerLimit;

    if (taxableInBracket > 0) {
      tax += taxableInBracket * bracket.rate;
    }
  }

  return tax;
}

/**
 * Calculate standard deduction (Minstefradrag)
 * @param {number} income - Gross salary
 * @param {number} year - Tax year (defaults to current)
 * @returns {number} Standard deduction amount
 */
function calculateStandardDeduction(income, year = CURRENT_YEAR) {
  const rates = getRates(year);
  const deduction = rates.standardDeduction;
  return Math.min(income * deduction.rate, deduction.maxAmount);
}

/**
 * Calculate social security tax (Trygdeavgift) for salary income
 * @param {number} income - Gross income
 * @param {number} age - Person's age (optional, defaults to 17-69 bracket)
 * @param {number} year - Tax year (defaults to current)
 * @returns {number} Social security tax amount
 */
function calculateSocialSecurityTax(income, age = 30, year = CURRENT_YEAR) {
  const rates = getRates(year);
  const ssTax = rates.socialSecurityTax;

  // Determine rate based on age
  let rate;
  if (age < 17 || age > 69) {
    rate = ssTax.underAge17OrOver69.rate;
  } else {
    rate = ssTax.lonnsinntekt.rate;
  }

  // Apply lower threshold with phase-in
  if (income <= ssTax.nedreGrense) {
    return 0;
  }

  // Phase-in calculation if applicable
  const phaseInThreshold = ssTax.nedreGrense * (1 + (ssTax.phaseInRate || 0));
  if (income < phaseInThreshold && ssTax.phaseInRate) {
    const excessIncome = income - ssTax.nedreGrense;
    const phaseInAmount = (ssTax.nedreGrense * ssTax.phaseInRate);
    const phaseInRatio = excessIncome / phaseInAmount;
    return income * rate * phaseInRatio;
  }

  return income * rate;
}

/**
 * Get employer tax rate by zone
 * @param {string} zone - Zone identifier ('zone1', 'zone2', etc.)
 * @param {number} year - Tax year (defaults to current)
 * @returns {number} Employer tax rate (0.00 to 0.141)
 */
function getEmployerTaxRate(zone, year = CURRENT_YEAR) {
  const rates = getRates(year);
  const zoneRate = rates.employerTax[zone];

  if (!zoneRate) {
    console.warn(`Employer tax zone '${zone}' not found for year ${year}`);
    return 0;
  }

  return zoneRate.rate;
}

/**
 * Format currency in Norwegian locale
 * @param {number} amount - Amount in NOK
 * @param {boolean} includeDecimals - Show decimals (default: false)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, includeDecimals = false) {
  const options = {
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0
  };
  return amount.toLocaleString('nb-NO', options) + ' kr';
}

/**
 * Format percentage in Norwegian locale
 * @param {number} rate - Rate as decimal (e.g., 0.22 for 22%)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
function formatPercentage(rate, decimals = 1) {
  return (rate * 100).toLocaleString('nb-NO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }) + '%';
}

/**
 * COMPARISON: 2025 vs 2026 Changes
 *
 * KEY CHANGES FOR 2026:
 *
 * 1. TRINNSKATT (Income Tax Brackets):
 *    - Trinn 0: 0 - 226,100 kr @ 0% (was 0 - 208,150 kr)
 *    - Trinn 1: 226,101 - 318,300 kr @ 1.7% (was 208,151 - 292,850 kr @ 1.9%)
 *    - Trinn 2: 318,301 - 725,050 kr @ 4.0% (was 292,851 - 670,000 kr @ 4.2%)
 *    - Trinn 3: 725,051 - 980,100 kr @ 13.7% (was 670,001 - 937,900 kr @ 13.9%)
 *    - Trinn 4: 980,101 - 1,467,200 kr @ 16.8% (was 937,901 - 1,350,000 kr @ 16.9%)
 *    - Trinn 5: 1,467,201+ @ 17.8% (was 1,350,001+ @ 17.9%)
 *
 * 2. TRYGDEAVGIFT (Social Security Tax):
 *    - Lønnsinntekt (17-69): 8.3% → 7.6% (DECREASED 0.7%)
 *    - Under 17 or over 69: 8.3% → 5.1% (DECREASED 3.2%)
 *    - Næring: 8.3% → 10.8% (INCREASED 2.5%)
 *    - Fiske og fangst: NEW 7.6%
 *    - Pensjon: NEW 5.1%
 *    - Nedre grense: 54,650 kr → 99,650 kr (threshold increased)
 *    - Phase-in rate: NEW 25%
 *
 * 3. MINSTEFRADRAG (Standard Deduction):
 *    - Rate: UNCHANGED at 46%
 *    - Max: 104,450 kr → 95,700 kr (DECREASED 8,750 kr / -8.4%)
 *
 * 4. PERSONFRADRAG (Personal Deduction):
 *    - NEW: Explicitly 114,540 kr (was implicit in 2025)
 *
 * 5. GRUNNBELØPET (G):
 *    - 124,028 kr → 130,160 kr (INCREASED 6,132 kr / +4.9%)
 *    - 6G: 744,168 kr → 780,960 kr (affects sick leave cap)
 *
 * 6. ARBEIDSGIVERAVGIFT (Employer Tax):
 *    - NEW ZONE 4a: 7.9% (between zone 3 and zone 4)
 *    - Other zones: UNCHANGED
 *
 * 7. REISEFRADRAG (Commuter Deduction):
 *    - Rate: 1.72 kr/km → 1.90 kr/km (INCREASED 10.5%)
 *    - NEW: Egenandel (deductible) 12,000 kr
 *    - NEW: Maximum deduction 120,000 kr
 *
 * 8. UNCHANGED RATES:
 *    - Municipal tax: 22%
 *    - Holiday pay: 10.2% / 12%
 *    - VAT: 25% / 15% / 12%
 *    - Overtime multipliers: 1.5x / 2.0x
 */

// Export for use in calculators (if using ES6 modules)
// Uncomment if switching to module-based architecture:
// export { TAX_RATES, CURRENT_YEAR, getRates, getCurrentYear, calculateBracketTax, calculateStandardDeduction, calculateSocialSecurityTax, getEmployerTaxRate, formatCurrency, formatPercentage };
