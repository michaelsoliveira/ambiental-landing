"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Usar com container `relative` + dimensões definidas. */
  fill?: boolean;
  width?: number;
  height?: number;
  /** Hint de largura responsiva para o otimizador (obrigatório com `fill`). */
  sizes?: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  /** Classes aplicadas no elemento <img> interno. */
  imageClassName?: string;
  objectFit?: "cover" | "contain";
};

/**
 * Imagem de mídia CMS (MinIO / local) via `next/image`.
 * Lazy por padrão, WebP/AVIF + resize, skeleton até carregar.
 */
export function CmsImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes = "100vw",
  quality = 70,
  priority = false,
  className,
  imageClassName,
  objectFit = "cover",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const fitClass =
    objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <span
      className={cn(
        fill ? "absolute inset-0 block" : "relative inline-block",
        !loaded && "animate-pulse bg-neutral-100",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill || undefined}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          fitClass,
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          fill && "object-center",
          imageClassName,
        )}
      />
    </span>
  );
}
