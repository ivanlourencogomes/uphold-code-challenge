import { useState } from "react";
import { FIAT_CURRENCIES } from "../util/fiatCurrencies";

function CurrencyList({ exchangeRates, amount, selectedCurrency }) {
  const [showAll, setShowAll] = useState(false);

  if (!exchangeRates) {
    return <p>Loading exchange rates...</p>;
  }

  const filteredRates = exchangeRates.filter(rate => rate.currency !== selectedCurrency);
  const fiatCurrencies = filteredRates.filter(rate => FIAT_CURRENCIES.includes(rate.currency));
  const nonFiatCurrencies = filteredRates.filter(rate => !FIAT_CURRENCIES.includes(rate.currency));
  const displayedCurrencies = showAll ? [...fiatCurrencies, ...nonFiatCurrencies] : fiatCurrencies;

  return (
    <div className="currency-list">
      {displayedCurrencies.map((rate) => (
        <div key={rate.pair} className="currency-item">
          <strong>

            {(amount * parseFloat(rate.ask)).toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })}

          </strong>
          <img 
            src={`https://cdn.uphold.com/assets/${rate.currency}.svg`} 
            alt={rate.currency} 
            width="30" 
            height="30" 
          />
          <span>{rate.currency}</span>
        </div>
      ))}

      {nonFiatCurrencies.length > 0 && (
        <button onClick={() => setShowAll(prev => !prev)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default CurrencyList;
