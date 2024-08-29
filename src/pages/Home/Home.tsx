import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Recomment from "../../components/recomment/Recomment";

export default function HomePage() {
  return (
    <div id="Home">
      <main>
        <Header />
        <Recomment />
        <Card />
      </main>
      <Footer />
    </div>
  );
}
