import { useState, useEffect } from "react";

interface Image {
  id: string;
  src: string;
  photographer: string;
}

const useFetchImages = (count: number) => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?page=1&limit=50"
        );
        const data = await response.json();

        if (data) {
          const shuffledImages = data
            .map((img: any) => ({
              id: img.id,
              src: img.download_url,
              photographer: img.author,
            }))
            .sort(() => 0.5 - Math.random())
            .slice(0, count);

          setImages(shuffledImages);
          setLoading(false);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch images:", error);
          setError("Failed to fetch images: " + error.message);
        } else {
          console.error("Failed to fetch images:", error);
          setError("Failed to fetch images: Unknown error");
        }
        setLoading(false);
      }
    };

    fetchImages();
  }, [count]);

  return { images, error, loading };
};

export default useFetchImages;
