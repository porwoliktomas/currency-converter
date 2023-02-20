import { RatesResponse } from "../externalAPI/getRates";

/**
 * The param "from" must be present in the rates (must be checked in advance).
 */
export const convertToUSD = (
  rates: RatesResponse,
  amount: number,
  from: string
) => {
  const rateFrom = rates.rates[from];
  return amount / rateFrom;
};

/**
 * The params "from" and "to" must be present in the rates (must be checked in
 * advance).
 */
export const convertToDestinationCurrency = (
  rates: RatesResponse,
  amount: number,
  from: string,
  to: string
) => {
  const rateTo = rates.rates[to];
  return convertToUSD(rates, amount, from) * rateTo;
};
