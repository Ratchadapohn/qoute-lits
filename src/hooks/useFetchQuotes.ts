"use client";
import { useState, useEffect, ReactNode } from "react";

interface Quote {
  [x: string]: ReactNode;
  quote: string;
  author: string;
  book?: string;
}

const useFetchQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://recite.onrender.com/api/v1/quotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.quotes) {
          setQuotes(data.quotes); // Set all quotes
          setLoading(false); // Set loading to false
        } else {
          throw new Error("Unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error.message);
        setError("Failed to fetch quotes: " + error.message);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return { quotes, error, loading };
};

export default useFetchQuotes;
