import { NextResponse } from "next/server";

import { contatoSchema } from "@/lib/schemas";

/**
 * Proxy server-side → ambiental-system omnichannel
 * POST /public/landing/:slug/contato
 *
 * Env:
 * - CMS_API_URL (ex: http://localhost:3333)
 * - CMS_ORG_SLUG (slug da organização)
 * - OMNICHANNEL_INGEST_SECRET (secret gerado ao criar o canal landing_form)
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contatoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos. Revise o formulário e tente novamente." },
      { status: 400 },
    );
  }

  const apiBase = process.env.CMS_API_URL?.replace(/\/$/, "");
  const orgSlug = process.env.CMS_ORG_SLUG?.trim();
  const ingestSecret = process.env.OMNICHANNEL_INGEST_SECRET?.trim();

  if (!apiBase || !orgSlug) {
    console.error(
      "[contato] CMS_API_URL ou CMS_ORG_SLUG ausentes — lead não encaminhado ao omnichannel.",
      parsed.data,
    );
    return NextResponse.json(
      { ok: false, error: "Integração de contato não configurada." },
      { status: 503 },
    );
  }

  if (!ingestSecret) {
    console.error(
      "[contato] OMNICHANNEL_INGEST_SECRET ausente — crie o canal Formulário Landing no omnichannel.",
      parsed.data,
    );
    return NextResponse.json(
      { ok: false, error: "Integração de contato não configurada." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${apiBase}/public/landing/${orgSlug}/contato`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Landing-Ingest-Secret": ingestSecret,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[contato] omnichannel rejeitou lead:", response.status, detail);
      return NextResponse.json(
        { ok: false, error: "Não foi possível enviar sua mensagem. Tente novamente." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contato] falha ao chamar omnichannel:", err);
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar sua mensagem. Tente novamente." },
      { status: 502 },
    );
  }
}
