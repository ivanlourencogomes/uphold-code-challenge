import { useMemo } from "react";
import { INITIAL_CURRENCIES } from "../util/initialCurrencies";

function useCurrencyList({ exchangeRates, cachedRates, selectedCurrency, searchQuery, showAll }) {
  return useMemo(() => {
    const rates = exchangeRates && exchangeRates.length ? exchangeRates : cachedRates[selectedCurrency];
    
    if (!rates) return { displayedCurrencies: [], initialCurrencies: [], additionalCurrencies: [] };

    const filteredRates = rates.filter(rate => rate.currency !== selectedCurrency);
    const initialCurrencies = filteredRates.filter(rate => INITIAL_CURRENCIES.includes(rate.currency));
    const additionalCurrencies = filteredRates.filter(rate => !INITIAL_CURRENCIES.includes(rate.currency));

    const allCurrencies = [...initialCurrencies, ...additionalCurrencies];

    const displayedCurrencies = searchQuery
      ? allCurrencies.filter(rate => rate.currency.toLowerCase().includes(searchQuery.toLowerCase()))
      : showAll
      ? allCurrencies
      : initialCurrencies;

    return { displayedCurrencies, initialCurrencies, additionalCurrencies };
  }, [exchangeRates, cachedRates, selectedCurrency, searchQuery, showAll]);
}

export default useCurrencyList;