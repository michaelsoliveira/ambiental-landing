import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Desativa draft mode e volta à home. */
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}
