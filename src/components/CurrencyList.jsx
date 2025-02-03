import { useState } from "react";
import useCurrencyList from "../hooks/useCurrencyList";
import SearchBox from "./SearchBox";
import "./currencyList.css";

function CurrencyList({ exchangeRates, cachedRates, amount, selectedCurrency }) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!cachedRates && !cachedRates.length) {
    return <p>Loading exchange rates...</p>;
  }
  
  const { displayedCurrencies, additionalCurrencies } = useCurrencyList({
    exchangeRates, 
    cachedRates, 
    selectedCurrency, 
    searchQuery, 
    showAll
  });

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
