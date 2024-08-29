import { useState, useEffect } from "react";

const useFetchAuthors = () => {
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("/api/authors");
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        setError("Failed to fetch authors.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return { authors, loading, error };
};

export default useFetchAuthors;
