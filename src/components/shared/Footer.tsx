import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { SVGProps } from "react";

import { Container } from "@/components/shared/Container";
import type { FooterContent } from "@/lib/content/types";
import Image from "next/image";

type Props = {
  content: FooterContent;
};

/** lucide-react não inclui logos de marca — ícones inline mínimos para redes sociais. */
function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
};

export function Footer({ content }: Props) {
  function resolveHref(href: string) {
    if (href === "#top") return "/";
    if (href.startsWith("#")) return `/${href}`;
    return href;
  }

  return (
    <footer className="border-t border-neutral-100 bg-white py-12">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="#top" className="flex items-center gap-2">
              {/* <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600">
                <Leaf className="h-5 w-5 text-white" strokeWidth={1.75} />
              </span> */}
              <span className="text-body font-bold text-neutral-900">
                {/* {content.brandName} */}
                <Image
                  src="/images/logo.png"
                  alt={content.brandName}
                  width={320}
                  height={256}
                  priority
                  className="h-16 w-auto max-w-full object-contain"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-neutral-500">
              {content.tagline}
            </p>
          </div>

          <div>
            <p className="text-small font-semibold text-neutral-900">Navegação</p>
            <ul className="mt-4 space-y-2.5">
              {content.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolveHref(item.href)}
                    className="text-small text-neutral-500 transition-colors hover:text-primary-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {content.contact && (
            <div>
              <p className="text-small font-semibold text-neutral-900">Contato</p>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-2.5 text-small text-neutral-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={1.75} />
                  {content.contact.address}
                </li>
                <li className="flex gap-2.5 text-small text-neutral-500">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={1.75} />
                  {content.contact.phone}
                </li>
                <li className="flex gap-2.5 text-small text-neutral-500">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={1.75} />
                  {content.contact.email}
                </li>
              </ul>
            </div>
          )}

          <div>
            <p className="text-small font-semibold text-neutral-900">Redes sociais</p>
            <div className="mt-4 flex gap-2.5">
              {content.socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.label];
                return (
                  <a
                    key={link.label}
                    href={resolveHref(link.href)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.ariaLabel}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-100 text-neutral-500 transition-colors hover:text-primary-700"
                  >
                    {Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} /> : link.label}
                  </a>
                );
              })}
            </div>
            <Link
              href={resolveHref(content.privacyHref)}
              className="mt-6 block text-small text-neutral-500 transition-colors hover:text-primary-700"
            >
              {content.privacyLabel}
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-100 pt-6">
          <p className="text-small text-neutral-500/70">
            © {new Date().getFullYear()} {content.brandName}. Todos os direitos reservados. ·{" "}
            {content.legalLine}
          </p>
        </div>
      </Container>
    </footer>
  );
}
