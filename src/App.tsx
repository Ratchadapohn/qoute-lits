import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "../src/pages/Home/Home";
import Rank from "./components/Rank/Rank";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/quote-liked" element={<QuoteLiked />} /> */}
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </Router>
  );
};

export default App;
