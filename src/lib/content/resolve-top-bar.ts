import { contactInfo } from "@/lib/constants";
import type {
  FooterContent,
  HeaderContent,
  TopBarContent,
} from "@/lib/content/schema";

/** Extrai o telefone principal quando o footer traz "tel1 / tel2". */
function primaryPhone(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;
  const first = raw.split("/")[0]?.trim();
  return first || undefined;
}

/**
 * Garante phone, e-mail e localização da tarja superior em qualquer provider CMS.
 * Ordem: header.topBar → fallbackHeader.topBar → footer.contact → constants locais.
 */
export function resolveTopBar(
  header: HeaderContent,
  opts?: {
    footer?: FooterContent;
    fallbackHeader?: HeaderContent;
  },
): TopBarContent {
  const remote = header.topBar;
  const fallback = opts?.fallbackHeader?.topBar;
  const footerContact = opts?.footer?.contact;

  return {
    phone:
      remote?.phone?.trim() ||
      fallback?.phone?.trim() ||
      primaryPhone(footerContact?.phone) ||
      contactInfo.phone,
    email:
      remote?.email?.trim() ||
      fallback?.email?.trim() ||
      footerContact?.email?.trim() ||
      contactInfo.email,
    location:
      remote?.location?.trim() ||
      fallback?.location?.trim() ||
      contactInfo.location,
  };
}

export function withResolvedHeaderTopBar(
  header: HeaderContent,
  opts?: {
    footer?: FooterContent;
    fallbackHeader?: HeaderContent;
  },
): HeaderContent {
  return {
    ...header,
    topBar: resolveTopBar(header, opts),
  };
}
