import type { GalleryImage } from "@/lib/content/types";

/** Origem preferida para cards/listagens (thumb WebP se existir). */
export function cmsThumbSrc(image: Pick<GalleryImage, "url" | "thumbUrl">): string {
  return image.thumbUrl || image.url;
}

/** Origem full para lightbox / hero / zoom. */
export function cmsFullSrc(image: Pick<GalleryImage, "url">): string {
  return image.url;
}
