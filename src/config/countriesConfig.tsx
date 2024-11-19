export interface Country {
  label: string;
  value: string;
  flag: string;
  currencySymbol: string;
}

export const availableCountries: Country[] = [
  {
    label: "UAE (AED)",
    value: "AED",
    flag: "https://flagcdn.com/w320/ae.png",
    currencySymbol: "د.إ",
  },
  {
    label: "UK (GBP)",
    value: "GBP",
    flag: "https://flagcdn.com/w320/gb.png",
    currencySymbol: "£",
  },
];
