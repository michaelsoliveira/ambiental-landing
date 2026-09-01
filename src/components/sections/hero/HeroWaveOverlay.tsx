type Props = {
  className?: string;
};

/**
 * Hierarquia SDD-01 §2 — transição hero → Prova Social (bg-white).
 * primary-600 NÃO entra em áreas grandes; usa-se primary-900 (profundidade),
 * primary-50 / neutral-50 (fundos) e neutral-0 no encaixe.
 */
const BRAND = {
  primary900: "#064e3b",
  primary700: "#047857",
  primary50: "#ecfdf5",
  neutral50: "#f7faf9",
  white: "#ffffff",
} as const;

/**
 * Faixas onduladas sutis no meio do vídeo — tom escuro institucional, baixa opacidade.
 */
export function HeroWavyScrim({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="hero-wavy-band-primary"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="200"
          x2="1440"
          y2="360"
        >
          <stop offset="0%" stopColor={BRAND.primary900} stopOpacity="0" />
          <stop offset="22%" stopColor={BRAND.primary900} stopOpacity="0.1" />
          <stop offset="50%" stopColor={BRAND.primary700} stopOpacity="0.12" />
          <stop offset="78%" stopColor={BRAND.primary900} stopOpacity="0.1" />
          <stop offset="100%" stopColor={BRAND.primary900} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-wavy-v-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="22%" stopColor="white" stopOpacity="0.8" />
          <stop offset="78%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="hero-wavy-soft-mask">
          <rect width="1440" height="800" fill="url(#hero-wavy-v-fade)" />
        </mask>
        <filter id="hero-wavy-blur" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      <g mask="url(#hero-wavy-soft-mask)" filter="url(#hero-wavy-blur)">
        <path
          d="M-120,80
             C180,20 420,160 720,60
             S1140,140 1560,100
             L1560,280
             C1180,340 820,200 520,300
             S140,360 -120,320
             Z"
          fill="url(#hero-wavy-band-primary)"
        />
      </g>
    </svg>
  );
}

/** Onda suave — amplitude baixa para não parecer faixa/banner. */
const WAVE_PATH =
  "M-80,108 C320,72 560,132 880,98 C1080,78 1280,118 1520,92 L1520,200 L-80,200 Z";

/**
 * Transição inferior — escuro → primary-50 → neutral-50 → branco (sem primary-600 sólido).
 */
export function HeroBottomWave({ className }: Props) {
  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="hero-bottom-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND.primary900} stopOpacity="0" />
            <stop offset="14%" stopColor={BRAND.primary900} stopOpacity="0.42" />
            <stop offset="32%" stopColor={BRAND.primary700} stopOpacity="0.12" />
            <stop offset="52%" stopColor={BRAND.primary50} stopOpacity="1" />
            <stop offset="74%" stopColor={BRAND.neutral50} stopOpacity="1" />
            <stop offset="100%" stopColor={BRAND.white} stopOpacity="1" />
          </linearGradient>
        </defs>

        <path d={WAVE_PATH} fill="url(#hero-bottom-fill)" />
      </svg>
    </div>
  );
}
