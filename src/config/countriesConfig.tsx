export interface Country {
  label: string; // Country name with currency code
  value: string; // Currency code
  flag: string; // URL or emoji for the flag
  currencySymbol: string; // Currency symbol
}

export const availableCountries: Country[] = [
  {
    label: "UAE (AED)",
    value: "AED",
    flag: "https://flagcdn.com/w320/ae.png",
    currencySymbol: "د.إ", // UAE Dirham symbol
  },
  {
    label: "UK (GBP)",
    value: "GBP",
    flag: "https://flagcdn.com/w320/gb.png",
    currencySymbol: "£", // British Pound symbol
  },
];
