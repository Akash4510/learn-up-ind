import { Country, State } from "country-state-city";

// Get all countries
export const getCountries = () => {
  return Country.getAllCountries().map((country) => ({
    code: country.isoCode,
    name: country.name,
  }));
};

// Get states for a specific country
export const getStates = (countryCode: string) => {
  return State.getStatesOfCountry(countryCode).map((state) => state.name);
};
