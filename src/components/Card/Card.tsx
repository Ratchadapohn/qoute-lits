"use client";
import React, { useState, useCallback, useMemo } from "react";
import useFetchQuotes from "../../hooks/useFetchQuotes";
import useFetchImages from "../../hooks/useFetchImages";
import LazyImage from "../lazyLoading/LazyImage";
import "./Card.css";
import { BiSolidHeartCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";

interface Quote {
  quote: string;
  author: string;
  book?: string;
  likeCount: number;
}

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
  const [expandedQuoteIndex, setExpandedQuoteIndex] = useState<number | null>(
    null
  );

  const handleLikeClick = useCallback((index: number) => {
    setLikedQuotes((prev) => {
      const updatedLikes = new Set(prev);
      if (updatedLikes.has(index)) {
        updatedLikes.delete(index);
      } else {
        updatedLikes.add(index);
      }
      return updatedLikes;
    });
  }, []);

  const handleQuoteClick = useCallback((index: number) => {
    setExpandedQuoteIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesSearch = quote.quote
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesAuthor = filterAuthor
        ? quote.author.toLowerCase() === filterAuthor.toLowerCase()
        : true;
      return matchesSearch && matchesAuthor;
    });
  }, [quotes, searchQuery, filterAuthor]);

  const authors = Array.from(new Set(quotes.map((quote) => quote.author)));

  if (quotesLoading || imagesLoading) {
    return (
      <p className="loading-icon">
        Loading...
        {/* <LoadingIcons.Bars /> */}
      </p>
    );
  }

  if (quotesError) {
    return <p>{quotesError}</p>;
  }

  if (imagesError) {
    return <p>{imagesError}</p>;
  }

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
          <div
            key={index}
            className="card"
            onClick={() => handleQuoteClick(index)}
          >
            <div className="score-icon">
              <div className="random-num">
                {Math.floor(Math.random() * 90) + 10}
              </div>
              <FaStar />
            </div>
            <div
              className="like-icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up to the card
                handleLikeClick(index);
              }}
              style={{ cursor: "pointer" }}
            >
              <BiSolidHeartCircle
                color={
                  likedQuotes.has(index) ? "rgb(206, 134, 206)" : "#886b2c"
                }
              />
              <span>{quote.likeCount}</span> {/* Display like count */}
            </div>
            {images[index] && (
              <LazyImage src={images[index].src} alt={`Image ${index}`} />
            )}
            <div className="card-content">
              <div className="quote">{quote.quote}</div>
              <div className="author">{quote.author}</div>
              {quote.book && <div className="book">Book: {quote.book}</div>}
            </div>
            {expandedQuoteIndex === index && (
              <div className="quote-details">
                <p>
                  <strong>Likes:</strong> {quote.likeCount}
                </p>
                <p>
                  <strong>Quote:</strong> {quote.quote}
                </p>
                <p>
                  <strong>Author:</strong> {quote.author}
                </p>
                {quote.book && (
                  <p>
                    <strong>Book:</strong> {quote.book}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
