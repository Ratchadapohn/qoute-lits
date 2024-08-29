"use client"; // Add this line to mark the file as a client component

import React, { useState, useCallback } from "react";
import Navbar from "../src/components/Navbar/Navbar";
import Card from "../src/components/Card/Card";
import Time from "../src/components/Time/Time";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Recomment from "../src/components/recomment/Recomment";

const HomePage: React.FC = () => {
  const [showChart, setShowChart] = useState(false);

  const handleRankClick = useCallback(() => {
    setShowChart(true);
  }, []);

  return (
    <div id="Home">
      <Time format="24-hour" />
      <Navbar
        onRankClick={handleRankClick}
        showChart={false}
        onCloseChart={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <main>
        <Header />
        <Recomment />
        <Card onRankClick={handleRankClick} showChart={showChart} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
