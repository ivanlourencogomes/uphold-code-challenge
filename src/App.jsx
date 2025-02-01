import { useState, useEffect } from "react";
import UserSelection from "./components/UserSelection"
import CurrencyList from "./components/CurrencyList"

function App() {

  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState(null);

  const handleSelectionChange = ({ amount, selectedCurrency }) => {
    setAmount(amount);
    setSelectedCurrency(selectedCurrency);
  };

  useEffect(() => {
    setExchangeRates([]);
    const fetchExchangeRates = async () => {

      try {
        const response = await fetch(`http://localhost:3001/api/rates/${selectedCurrency}`);
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        setExchangeRates(data);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency]);

  return (
    <main>
      
      <section className="container">
          <h1>Currency Converter</h1>
          <p>
            Receive competitive and transparent pricing
            with no hidden spreads. See how we compare.
          </p>
          <UserSelection onSelectionChange={handleSelectionChange} />
          <CurrencyList 
            selectedCurrency={selectedCurrency} 
            exchangeRates={exchangeRates} 
            amount={amount} 
            key={selectedCurrency}
          />
      </section>

    </main>
    
  )
}

export default App
