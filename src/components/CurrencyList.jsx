import CurrencyItem from "./CurrencyItem"

function CurrencyList() {
  return (
    <div>
      <ul>
        <li>
            <span className="amount">0.888592</span>
            <CurrencyItem />
        </li>
      </ul>
    </div>
  )
}

export default CurrencyList
