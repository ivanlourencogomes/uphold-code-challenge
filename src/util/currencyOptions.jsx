export const getCurrencyOptions = (fiatCurrencies) => {
  return fiatCurrencies.map((currency) => ({
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
};