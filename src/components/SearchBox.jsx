// src/components/SearchBox.jsx
import "./searchBox.css";

function SearchBox({ searchQuery, onSearchChange }) {
  return (

    <section className="search-box">
        <input
          type="text"
          className="search-box"
          placeholder="Search currency..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
    </section>
  );
}

export default SearchBox;