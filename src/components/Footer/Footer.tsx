"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Footer.css";

interface Quote {
  content: string;
  author: string;
}

const Footer: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get<Quote>(
          "https://api.quotable.io/random"
        );
        setQuote(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch quote");
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="footer" id="footer">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {quote && (
        <div className="quote-container">
          <p className="quote-content">&quot;{quote.content}&quot;</p>
          <p className="quote-author"> {quote.author}</p>
        </div>
      )}
      <hr className="styled-divider" />
      <div className="contact">
        <h1>Ratchadapohn Meesin</h1>
        <p>Frontend Developer</p>
        <h4>+66836783565</h4>
        <h6>nanratchada@hotmail.com</h6>
      </div>
    </div>
  );
};

export default Footer;
