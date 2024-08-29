"use client";
import React, { useState } from "react";
import Card from "../../src/components/Card/Card";
import "./Rank.css";

const Rank: React.FC = () => {
  const [ranking, setRanking] = useState<
    { index: number; score: number; quote: string; author: string }[]
  >([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => setShowPopup(!showPopup);

  return (
    <div className="rank-container">
      <h1>Rank</h1>
      <button onClick={handleShowPopup} className="show-rank-button">
        Show Ranking
      </button>
      {showPopup && (
        <div className="ranking-popup">
          <button className="close-popup" onClick={handleShowPopup}>
            Close
          </button>
          <div className="ranking-list">
            {ranking.map((item, index) => (
              <div key={index} className="ranking-item">
                <h3>Rank {index + 1}</h3>
                <p>Score: {item.score}</p>
                <p>Quote: {item.quote}</p>
                <p>Author: {item.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Card onUpdateRanking={setRanking} />
    </div>
  );
};

export default Rank;
