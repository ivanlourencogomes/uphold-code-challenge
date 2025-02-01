import Select from "react-select";
import { NumericFormat } from 'react-number-format';
import { FIAT_CURRENCIES } from "../util/fiatCurrencies";
import { useState } from "react";

function UserSelection() {

  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const currencyOptions = FIAT_CURRENCIES.map((currency) => ({
    value: currency,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={`https://cdn.uphold.com/assets/${currency}.svg`}
          alt={currency}
          width="20"
          height="20"
        />
        {currency}
      </div>
    ),
  }));

  const defaultCurrency = currencyOptions.find((currency) => currency.value === "USD"); 


  return (
    <form>
     <NumericFormat
        value={amount}
        onValueChange={(values) => setAmount(parseFloat(values.value.replace(/[^0-9.-]+/g, "")))}
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
        placeholder="Choose a currency..."
      />
    </form>
  )
}

export default UserSelection
