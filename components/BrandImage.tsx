"use client";

import { useState, CSSProperties } from "react";

export function BrandImage({
  src,
  alt,
  className = "",
  style
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img className={className} style={style} src={src} alt={alt} onError={() => setFailed(true)} />;
}