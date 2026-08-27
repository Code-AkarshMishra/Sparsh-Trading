"use client";

import { useState, CSSProperties } from "react";

export function BrandImage({
  src,
  alt,
  className = "",
  style,
  loading = "lazy",
  width,
  height
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  // Determine WebP source URL if original is png/jpg/jpeg
  const webpSrc = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const isConverted = webpSrc !== src;

  if (isConverted) {
    return (
      <picture className={className}>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={src} type={src.endsWith(".png") ? "image/png" : "image/jpeg"} />
        <img
          className={className}
          style={style}
          src={webpSrc}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          onError={() => setFailed(true)}
        />
      </picture>
    );
  }

  return (
    <img
      className={className}
      style={style}
      src={src}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}