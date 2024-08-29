"use client";
import React from "react";
import useFetchQuotes from "../../hooks/useFetchQuotes";
import useFetchImages from "../../hooks/useFetchImages";
import "./recomment.css";
import { FaStar } from "react-icons/fa6";
// import LoadingIcons from "react-loading-icons";

const Recomment = () => {
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

  if (quotesLoading || imagesLoading) {
    return (
      <p>
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
  const getRandomTwoDigitNumber = () => {
    return Math.floor(Math.random() * 90) + 10;
  };

  const randomNumber = getRandomTwoDigitNumber();

  return (
    <div className="recomment-wrapper">
      <div className="recomment-slide">
        {quotes.map((quote, index) => (
          <div key={index} className="recomment-card">
            <div className="recomment-icon-star">
              <div className="random-num">{randomNumber}</div>
              <FaStar />
            </div>
            {images[index] && (
              <img
                src={images[index].src}
                alt={`Image ${index}`}
                className="recomment-image"
              />
            )}
            <div className="recomment-text-content">
              <div className="recomment-quote">{quote.quote}</div>
              <div className="recomment-author">{quote.author} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomment;
