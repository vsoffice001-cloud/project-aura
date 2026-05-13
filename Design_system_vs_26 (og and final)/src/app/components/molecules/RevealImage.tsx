/**
 * RevealImage — Molecule
 * Wraps img with smooth opacity transition on load.
 */
import { useState, type ImgHTMLAttributes } from "react";
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface RevealImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderBg?: string;
}

export function RevealImage({ placeholderBg = "rgba(0,0,0,0.04)", className = "", style, ...rest }: RevealImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <ImageWithFallback
      {...rest}
      className={className}
      style={{
        ...style,
        backgroundColor: placeholderBg,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onLoad={() => setLoaded(true)}
    />
  );
}
