import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Ativa draft mode para preview de rascunhos Sanity.
 * Uso: /api/preview?secret=PREVIEW_SECRET&redirect=/
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const redirectTo = searchParams.get("redirect") || "/";

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(redirectTo.startsWith("/") ? redirectTo : "/");
}
