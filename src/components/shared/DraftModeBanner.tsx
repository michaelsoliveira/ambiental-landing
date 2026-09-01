import Link from "next/link";

type Props = {
  preview?: boolean;
};

export function DraftModeBanner({ preview }: Props) {
  if (!preview) return null;

  return (
    <div className="relative z-[60] bg-amber-500 px-4 py-2 text-center text-small font-semibold text-neutral-900">
      Modo preview (rascunhos) —{" "}
      <Link href="/api/preview/disable" className="underline underline-offset-2">
        sair do preview
      </Link>
    </div>
  );
}
