/**
 * RevealImage — Molecule
 *
 * Wraps ImageWithFallback with a smooth blur-to-sharp reveal on load.
 * Shows a neutral placeholder bg while loading, then fades image in.
 * Prevents the raw "pop" of images appearing.
 */
import { useState, type ImgHTMLAttributes } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface RevealImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Background color while loading */
  placeholderBg?: string;
}

export function RevealImage({
  placeholderBg = "rgba(0,0,0,0.04)",
  className = "",
  style,
  ...rest
}: RevealImageProps) {
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
