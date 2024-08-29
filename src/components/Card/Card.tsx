"use client";

import React, { useState } from "react";
import useFetchQuotes from "../../hooks/useFetchQuotes";
import useFetchImages from "../../hooks/useFetchImages";
import LazyImage from "../lazyLoading/LazyImage";
import ChartPopup from "../chartpopup/ChartPopup";
import "./Card.css";
import { BiSolidHeartCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";

const Card: React.FC = () => {
  const {
    quotes,
    error: quotesError,
    loading: quotesLoading,
  } = useFetchQuotes();
  const {
    images,
    error: imagesError,
    loading: imagesLoading,
  } = useFetchImages(quotes.length);

  const [likedQuotes, setLikedQuotes] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterAuthor, setFilterAuthor] = useState<string>("");
  const [showChartPopup, setShowChartPopup] = useState<boolean>(false);

  const handleLikeClick = (index: number) => {
    setLikedQuotes((prev) => {
      const updatedLikes = new Set(prev);
      if (updatedLikes.has(index)) {
        updatedLikes.delete(index);
      } else {
        updatedLikes.add(index);

        setShowChartPopup(true);
      }
      return updatedLikes;
    });
  };

  const handleCloseChartPopup = () => {
    setShowChartPopup(false);
  };

  if (quotesLoading || imagesLoading) {
    return <p className="loading-icon">Loading...</p>;
  }

  if (quotesError) {
    return <p>{quotesError}</p>;
  }

  if (imagesError) {
    return <p>{imagesError}</p>;
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = quote.quote
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAuthor = filterAuthor
      ? quote.author.toLowerCase() === filterAuthor.toLowerCase()
      : true;
    return matchesSearch && matchesAuthor;
  });

  const authors = Array.from(new Set(quotes.map((quote) => quote.author)));

  const likedQuotesData = filteredQuotes
    .filter((quote, index) => likedQuotes.has(index))
    .map((quote) => quote.likeCount);

  const likedQuotesLabels = filteredQuotes
    .filter((quote, index) => likedQuotes.has(index))
    .map((quote) => quote.quote);

  return (
    <>
      <div className="header-word">
        <h1>VOTE</h1>
        <h4>Your Favorite</h4>
        <h2>Quotes!</h2>
      </div>
      <div className="search-filter">
        <div className="input">
          <FcSearch />
          <input
            type="text"
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
        >
          <option value="">All Authors</option>
          {authors.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div className="card-container">
        {filteredQuotes.map((quote, index) => (
          <div key={index} className="card">
            <div className="score-icon">
              <div className="random-num">
                {Math.floor(Math.random() * 90) + 10}
              </div>
              <FaStar />
            </div>
            <div
              className="like-icon"
              onClick={() => handleLikeClick(index)}
              style={{ cursor: "pointer" }}
            >
              <BiSolidHeartCircle
                color={
                  likedQuotes.has(index) ? "rgb(206, 134, 206)" : "#886b2c"
                }
              />
            </div>
            {images[index] && (
              <LazyImage src={images[index].src} alt={`Image ${index}`} />
            )}
            <div className="card-content">
              <div className="quote">{quote.quote}</div>
              <div className="author">{quote.author}</div>
              {quote.book && <div className="book">Book: {quote.book}</div>}
            </div>
          </div>
        ))}
      </div>
      {showChartPopup && (
        <ChartPopup
          data={likedQuotesData}
          labels={likedQuotesLabels}
          onClose={handleCloseChartPopup}
        />
      )}
    </>
  );
};

export default Card;
