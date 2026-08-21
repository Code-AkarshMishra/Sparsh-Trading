"use client";

import { useState } from "react";

export function BrandImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    const [failed, setFailed] = useState(false);
    if (failed) return null;
    return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />;
}