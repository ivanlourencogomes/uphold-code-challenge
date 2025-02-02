import { useState } from "react";
import { INITIAL_CURRENCIES } from "../util/initialCurrencies";
import SearchBox from "./SearchBox";
import "./currencyList.css";

function CurrencyList({ exchangeRates, cachedRates, amount, selectedCurrency }) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!cachedRates && !cachedRates.length) {
    return <p>Loading exchange rates...</p>;
  }
  
  const rates = exchangeRates && exchangeRates.length ? exchangeRates : cachedRates[selectedCurrency];
  
  const filteredRates = rates.filter(rate => rate.currency !== selectedCurrency);
  const initialCurrencies = filteredRates.filter(rate => INITIAL_CURRENCIES.includes(rate.currency));
  const additionalCurrencies = filteredRates.filter(rate => !INITIAL_CURRENCIES.includes(rate.currency));

  const allCurrencies = [...initialCurrencies, ...additionalCurrencies];
  
  const displayedCurrencies = searchQuery
    ? allCurrencies.filter(rate => rate.currency.toLowerCase().includes(searchQuery.toLowerCase()))
    : showAll
    ? allCurrencies
    : initialCurrencies;



  return (
    <>
      
      <SearchBox 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} />

      <ul className="currency-list">
        {displayedCurrencies.map((rate) => (
          <li key={rate.pair} className="currency-item">
            <div className="amount">
              {(amount * parseFloat(rate.ask)).toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })}
            </div>
            <div className="currency">
              <img src={`https://cdn.uphold.com/assets/${rate.currency}.svg`} alt={rate.currency} />
              <span>{rate.currency}</span>
            </div>
          </li>
        ))}
      </ul>

      {!searchQuery && additionalCurrencies.length > 0 && (
        <button className="primary" onClick={() => setShowAll(prev => !prev)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
}

export default CurrencyList;
