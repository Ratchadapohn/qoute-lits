import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import useFetchQuotes from "../../hooks/useFetchQuotes";
import useFetchImages from "../../hooks/useFetchImages";
import { BiSolidHeartCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

interface SearchFormProps {
  setShowSearch: (show: boolean) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setShowSearch }) => {
  const [searchQuote, setSearchQuote] = useState<string>("");
  const { quotes } = useFetchQuotes();
  const { images, error: imageError } = useFetchImages(quotes.length); // Fetch images based on the number of quotes
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  useEffect(() => {
    const combinedResults = quotes.map((quote, index) => ({
      ...quote,
      image: images[index]?.src || "",
    }));
    setFilteredResults(combinedResults);
  }, [quotes, images]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuote(value);

    const results = filteredResults.filter((quote) =>
      quote.quote.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(results);
  };

  return (
    <div className="search-quote-popup-container">
      <div className="search-quote-popup-content">
        <div className="search-quote-popup-title">
          <h2>Search for Quotes</h2>
          <button onClick={() => setShowSearch(false)}>x</button>
        </div>
        <input
          type="text"
          value={searchQuote}
          onChange={handleSearchChange}
          placeholder="Search quotes..."
          className="search-quote-popup-input"
        />
        <div className="search-quote-results">
          {filteredResults.length > 0 ? (
            filteredResults.map((quote, index) => (
              <div key={index} className="search-quote-result-item">
                {quote.image ? (
                  <img
                    src={quote.image}
                    alt={`Quote ${index}`}
                    className="search-quote-image"
                  />
                ) : (
                  <div className="no-image-placeholder">No Image</div>
                )}
                <div className="search-quote-text-content">
                  <p>"{quote.quote}"</p>
                  <p>- {quote.author}</p>
                </div>
                <div className="like-icon-serach">
                  <BiSolidHeartCircle />
                </div>
                <div className="recomment-icon-star-search">
                  <FaStar />
                </div>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
          {imageError && (
            <p className="error-message">Failed to load images.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
