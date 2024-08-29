import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import Home from "../src/pages/Home/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar
        onRankClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        showChart={false}
        onCloseChart={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/quote-liked" element={<QuoteLiked />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
