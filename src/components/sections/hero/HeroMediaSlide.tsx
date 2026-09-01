import { cn } from "@/lib/utils";
import type { HeroSlide, MediaField } from "@/lib/content/types";

const GRADIENTS = [
  "bg-gradient-to-br from-primary-950 via-primary-900 to-neutral-950",
  "bg-gradient-to-br from-tech-950 via-primary-950 to-neutral-900",
  "bg-gradient-to-br from-neutral-950 via-primary-900 to-tech-950",
] as const;

type Props = {
  media: MediaField;
  slideIndex: number;
  active: boolean;
  priority?: boolean;
};

function MediaFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-950">
      {children}
    </div>
  );
}

export function HeroMediaSlide({ media, slideIndex, active, priority }: Props) {
  if (media.kind === "video" && media.src) {
    const isMov =
      media.src.toLowerCase().endsWith(".mov") ||
      media.src.toLowerCase().includes(".mov?");
    const mimeType = isMov ? "video/quicktime" : undefined;

    return (
      <MediaFrame>
        <video
          className="h-full w-full object-cover object-center"
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay={active}
          preload={active ? "auto" : "metadata"}
        >
          <source src={media.src} type={mimeType} />
        </video>
      </MediaFrame>
    );
  }

  if (media.kind === "image" && media.src) {
    return (
      <MediaFrame>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt={media.alt || ""}
          className="h-full w-full object-cover object-center"
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      </MediaFrame>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        GRADIENTS[slideIndex % GRADIENTS.length],
      )}
      aria-hidden
    />
  );
}

export function HeroSlideScrim() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/92 via-neutral-950/45 to-neutral-950/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/20" />
      <div className="absolute inset-y-0 left-0 w-[min(100%,52rem)] bg-gradient-to-r from-neutral-950/50 to-transparent" />
      {/* Ponte escura → onda clara (evita corte abrupto no vídeo) */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary-900/55 via-primary-900/20 to-transparent sm:h-48" />
    </>
  );
}

export type { HeroSlide };
