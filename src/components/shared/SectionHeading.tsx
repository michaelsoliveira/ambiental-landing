import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "primary",
  align = "left",
  inverted = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "primary" | "accent" | "tech";
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  const eyebrowTone = inverted
    ? "text-tech-400"
    : {
        primary: "text-primary-700",
        accent: "text-accent-600",
        tech: "text-tech-600",
      }[tone];

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("text-micro font-semibold uppercase", eyebrowTone)}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("mt-3 text-h1", inverted ? "text-white" : "text-neutral-900")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-body-lg", inverted ? "text-sky-100/80" : "text-neutral-500")}>
          {description}
        </p>
      )}
    </div>
  );
}
