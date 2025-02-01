import Select from "react-select";
import { NumericFormat } from 'react-number-format';
import { FIAT_CURRENCIES } from "../util/fiatCurrencies";
import { useEffect, useState } from "react";
import { getCurrencyOptions } from "../util/currencyOptions";
import './userSelection.css';

function UserSelection({ onSelectionChange }) {

  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [debouncedAmount, setDebouncedAmount] = useState(amount);

  const currencyOptions = getCurrencyOptions(FIAT_CURRENCIES);
  const defaultCurrency = currencyOptions.find((currency) => currency.value === "USD"); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmount(amount);
    }, 500); 

    return () => clearTimeout(timer);
  }, [amount]); 

  useEffect(() => {
    onSelectionChange({ amount: debouncedAmount, selectedCurrency });
  }, [debouncedAmount, selectedCurrency, onSelectionChange]);

  return (

    <section className="user-selection">
      <form>
        <NumericFormat
          value={amount}
          onValueChange={(values) => setAmount(values.value ? parseFloat(values.value.replace(/[^0-9.-]+/g, "")) : 0)}
          thousandSeparator={true}
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale
          customInput="input"
        />

        <Select
          options={currencyOptions} 
          defaultValue={defaultCurrency} 
          onChange={(currency) => setSelectedCurrency(currency.value)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: 'none',
              borderRadius: '100px', 
              fontSize: '0.7rem',
              fontWeight: '500'
            }),
          }}
          components={{
            IndicatorSeparator: () => null
          }}
          placeholder="Choose a currency..."
        />
      </form>
    </section>
  );
}

export default UserSelection;
