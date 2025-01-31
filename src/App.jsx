import { useState, useEffect } from "react";
import UserSelection from "./components/UserSelection"
import CurrencyList from "./components/CurrencyList"

function App() {

  const [currencies, setCurrencies] = useState('');
  const [status, setStatus] = useState('idle');

  async function getCurrencies() {
    try {
      const response = await fetch('http://localhost:3001/api/assets');
      const data = await response.json();
      setCurrencies(data);
      setStatus('done');

    } catch (error) {
      setStatus('error');
      console.log(error);
    }
    
  }

  useEffect(() => {
    if (status == 'idle') {
      setStatus('loading');
      getCurrencies();
    }
  }, [status]);

  return (
    <main>
      
      <section className="container">
          <h1>Currency Converter</h1>
          <p>
            Receive competitive and transparent pricing
            with no hidden spreads. See how we compare.
          </p>
          <UserSelection />
          <CurrencyList />
      </section>

    </main>
    
  )
}

export default App
