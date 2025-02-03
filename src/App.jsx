import { INITIAL_CURRENCIES } from "./util/initialCurrencies";
import { useState, useEffect } from "react";
import UserSelection from "./components/UserSelection";
import CurrencyList from "./components/CurrencyList";
import Header from "./components/Header";
import Loader from "./components/Loader";

function App() {

  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [cachedRates, setCachedRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectionChange = ({ amount, selectedCurrency }) => {
    setAmount(amount);
    setSelectedCurrency(selectedCurrency);
  };

  const fetchCachedRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const ratePromises = INITIAL_CURRENCIES.map(currency => 
        fetch(`http://localhost:3001/api/rates/${currency}`).then(res => res.json())
      );
  
      await Promise.all(ratePromises).then(results => {
        const updatedRates = {};
        results.forEach((rateData, index) => {
          const currency = INITIAL_CURRENCIES[index];
      
          if (rateData.currency !== currency) {
            updatedRates[currency] = rateData;
          }
        });
      
        setCachedRates(prevRates => ({
          ...prevRates,
          ...updatedRates
        }));
      });
      
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { 
    fetchCachedRates();
  }, []);

  useEffect(() => {
    if (amount > 0) {
      setExchangeRates([]);
      const fetchExchangeRates = async () => {
  
        try {
          const response = await fetch(`http://localhost:3001/api/rates/${selectedCurrency}`);
          if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
          }
          const data = await response.json();
          setExchangeRates(data);
          
          setCachedRates(prevRates => ({
            ...prevRates,
            [selectedCurrency]: data
          }));

        } catch (error) {
          console.error("Error fetching exchange rates:", error);
        }
      };
  
      fetchExchangeRates();

    }
  }, [selectedCurrency, amount]);

  return (

    <>
      <Header />
      <main className="container">

        <h1>Currency Converter</h1>
        <p>
          Receive competitive and transparent pricing
          with no hidden spreads. See how we compare.
        </p>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">
            <p className="message">An error occurred.</p>
            <button onClick={fetchCachedRates} className="retry-button">
              Retry
            </button>
          </div>
        ) : (
          <>
            <UserSelection onSelectionChange={handleSelectionChange} />
        
            {amount > 0 && cachedRates[selectedCurrency] && cachedRates[selectedCurrency].length ? (
              <CurrencyList 
                selectedCurrency={selectedCurrency} 
                exchangeRates={exchangeRates} 
                cachedRates={cachedRates}
                amount={amount} 
                key={selectedCurrency}
              />
            ) : (
              <p className="message">
                Enter an amount to check the rates.
              </p>
            )}
          </>
        )}
        
        

      </main>
    </>
    
    
  )
}

export default App
