import { useState } from "react";
import { FIAT_CURRENCIES } from "../util/fiatCurrencies";
import './currencyList.css';

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
    <ul className="currency-list">
      {displayedCurrencies.map((rate) => (
        <li key={rate.pair} className="currency-item">
          <div className="amount">

            {(amount * parseFloat(rate.ask)).toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })}

          </div>
          <div className="currency">
            <img 
              src={`https://cdn.uphold.com/assets/${rate.currency}.svg`} 
              alt={rate.currency}
            />
            <span>{rate.currency}</span>
          </div>
        </li>
      ))}

      {nonFiatCurrencies.length > 0 && (
        <button className="primary" onClick={() => setShowAll(prev => !prev)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </ul>
  );
}

export default CurrencyList;
