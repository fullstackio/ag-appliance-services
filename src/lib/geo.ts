/**
 * Country / state code → display name helpers, backed by `country-state-city`.
 * Bookings store ISO country/state codes (from the dependent Country → State → City
 * selects); this resolves them back to readable names for dashboard display.
 * Author: Avijit Ghosh
 */
import { Country, State } from "country-state-city";

export function countryName(isoCode: string): string {
  return Country.getCountryByCode(isoCode)?.name ?? isoCode;
}

export function stateName(
  countryIsoCode: string,
  stateIsoCode: string,
): string {
  return (
    State.getStateByCodeAndCountry(stateIsoCode, countryIsoCode)?.name ??
    stateIsoCode
  );
}
