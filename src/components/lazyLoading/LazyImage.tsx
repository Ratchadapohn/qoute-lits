import React from "react";
import LazyLoad from "react-lazyload";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => (
  <LazyLoad height={200} offset={100}>
    <img src={src} alt={alt} />
  </LazyLoad>
);

export default LazyImage;
