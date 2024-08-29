import React from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={500}
    height={300}
    loading="lazy"
    layout="responsive"
  />
);

export default LazyImage;
