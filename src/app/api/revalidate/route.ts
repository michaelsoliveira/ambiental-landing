import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Invalida cache da home após publish no ambiental-system.
 * Uso: POST /api/revalidate?secret=PREVIEW_SECRET
 * Body opcional: { "path": "/" }
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
  }

  let path = "/";
  try {
    const body = (await request.json()) as { path?: string };
    if (body?.path?.startsWith("/")) path = body.path;
  } catch {
    // body vazio ok
  }

  revalidateTag("landing-cms", "max");
  revalidatePath(path);
  revalidatePath("/");
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, revalidated: true, path, now: Date.now() });
}

export async function GET(request: Request) {
  return POST(request);
}
