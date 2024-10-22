import { countries, getEmojiFlag, TCountryCode, ICountry } from 'countries-list'
import { RouteLocationNormalizedGeneric } from 'vue-router'

// Dictionary mapping currencies to flags for prioritized countries
const prioritizedCountries: Record<string, string> = {
  USD: '🇺🇸', // USA
  EUR: '🇪🇺', // EU
  UAH: '🇺🇦', // Ukraine
  GBP: '🇬🇧', // UK
  CHF: '🇨🇭', // Switzerland
  PLN: '🇵🇱', // Poland
  ILS: '🇮🇱', // Israel
  CNY: '🇨🇳', // China
  TRY: '🇹🇷', // Turkey
  CAD: '🇨🇦', // Canada
  AUD: '🇦🇺', // Australia
  SEK: '🇸🇪', // Sweden
  CZK: '🇨🇿', // Czech Republic
  HUF: '🇭🇺', // Hungary
  AED: '🇦🇪', // UAE
  HKD: '🇭🇰', // Hong Kong
}

// Utility function to check if a string is a valid TCountryCode
function isValidCountryCode(code: string): code is TCountryCode {
  return code in countries
}

// Function to safely get emoji flag for a country code
export const safeGetEmojiFlag = (countryCode: TCountryCode): string | null => {
  if (isValidCountryCode(countryCode)) {
    return getEmojiFlag(countryCode)
  } else {
    console.error('Invalid country code:', countryCode)
    return null
  }
}

// 1. Function to get all currencies
export const getAllCurrencies = (): string[] => {
  const uniqueCurrencies = Object.keys(countries).reduce<Set<string>>((acc, countryCode) => {
    const country = countries[countryCode as TCountryCode]
    if (country.currency && Array.isArray(country.currency)) {
      country.currency.forEach((currency) => acc.add(currency))
    }
    return acc
  }, new Set())

  return Array.from(uniqueCurrencies) // Convert Set to array
}

// 2. Function to get flag by currency using the safe method
export const getFlagByCurrency = (currency: string): string | null => {
  if (prioritizedCountries[currency]) {
    return prioritizedCountries[currency]
  }

  for (const countryCode of Object.keys(countries)) {
    if (isValidCountryCode(countryCode) && countries[countryCode].currency.includes(currency)) {
      return safeGetEmojiFlag(countryCode)
    }
  }

  return null // Return null if no flag is found
}

// 3. Function to get all currencies with flags
export const getAllCurrenciesWithFlags = (): string[] => {
  const currencyToCountries: Record<string, string[]> = {}

  Object.keys(countries).forEach((countryCode) => {
    const typedCountryCode = countryCode as TCountryCode // Type assertion
    const country: ICountry = countries[typedCountryCode]

    if (country.currency && Array.isArray(country.currency)) {
      country.currency.forEach((currency: string) => {
        currencyToCountries[currency] = currencyToCountries[currency] || []
        currencyToCountries[currency].push(safeGetEmojiFlag(typedCountryCode) ?? '🏳️')
      })
    }
  })

  return Object.entries(currencyToCountries).map(([currency, flags]) => {
    const flag = prioritizedCountries[currency] || flags[0]
    return `${currency} ${flag}`
  })
}

// 4. Function to get all flags using the safe method
export const getAllFlags = (): string[] => {
  return Object.keys(countries)
    .filter(isValidCountryCode)
    .map((countryCode: TCountryCode) => safeGetEmojiFlag(countryCode) ?? '🏳️')
}

// 5. Function to get countries with multiple currencies
export const getCountriesWithMultipleCurrencies = () => {
  return Object.keys(countries)
    .filter(
      (countryCode): countryCode is TCountryCode =>
        isValidCountryCode(countryCode) && countries[countryCode].currency.length > 1
    )
    .map((countryCode: TCountryCode) => ({
      countryCode,
      country: countries[countryCode],
      currencies: countries[countryCode].currency,
      name: countries[countryCode].name,
      flag: safeGetEmojiFlag(countryCode) ?? '🏳️',
    }))
}

// 6. Function to get all currencies from prioritized countries
export const getAllCurrenciesFromPrioritizedCountries = (): string[] => {
  return Object.keys(prioritizedCountries)
}

// Function to format date and time
export function formatDateTime(date: Date = new Date(), includeTime: boolean = true): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  return `${year}-${month}-${day}`
}

export function setBodyClass(route: RouteLocationNormalizedGeneric) {
  const prefix = 'app-page-'
  const defaultClass = `${prefix}default`
  const body = document.body

  body.classList.forEach((className) => {
    if (className.startsWith(prefix)) {
      body.classList.remove(className)
    }
  })

  switch (route.name) {
    case 'reports':
    case 'coin-gecko':
    case 'dashboard':
    case 'bot':
      body.classList.add(`${prefix}has-grid`)
      break
    case 'login':
      body.classList.add(`${prefix}login`)
      break
    default:
      body.classList.add(defaultClass)
      break
  }
}
