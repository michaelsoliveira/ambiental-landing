"use client";

import { ChevronDown, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { contactInfo } from "@/lib/constants";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import { resolveTopBar } from "@/lib/content/resolve-top-bar";
import { buildSolucaoTree } from "@/lib/content/solucoes-tree";
import type { HeaderContent, SolucoesContent } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Props = {
  content: HeaderContent;
  servicos?: SolucoesContent["items"];
  /** Header transparente sobre hero imersivo (home). */
  overHero?: boolean;
};

/** Aceita CMS (#solucoes) e fallback local (/servicos). */
function isSolucoesNav(href: string) {
  return href === "/servicos" || href === "#solucoes";
}

const SERVICOS_PAGE_HREF = "/servicos";

export function Header({ content, servicos = [], overHero = false }: Props) {
  const whatsapp = content.whatsapp ?? {
    label: "WhatsApp",
    href: contactInfo.whatsapp,
    variant: "outline" as const,
  };
  const pathname = usePathname();
  const isRoot = pathname === "/";

  /** Para âncoras (#top, #solucoes…): se não estiver na raiz, prefixamos com "/" */
  function resolveHref(href: string) {
    if (href === "#top") return isRoot ? "#top" : "/";
    if (href.startsWith("#")) return isRoot ? href : `/${href}`;
    return href;
  }

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicosTree = buildSolucaoTree(servicos);
  const topBar = resolveTopBar(content);
  const lightNav = overHero && isRoot && !scrolled;
  const transparentHeader = lightNav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-primary-900 py-1.5 text-white lg:block">
        <Container className="flex items-center justify-center gap-7 text-micro font-medium">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3" strokeWidth={1.75} />
            {topBar.phone}
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <Mail className="h-3 w-3" strokeWidth={1.75} />
            {topBar.email}
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <MapPin className="h-3 w-3" strokeWidth={1.75} />
            {topBar.location}
          </span>
        </Container>
      </div>
      <header
        className={cn(
          "transition-colors duration-200",
          transparentHeader
            ? "bg-transparent"
            : "bg-white/95 shadow-sm backdrop-blur-sm",
        )}
      >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt={content.brandName}
            width={188}
            height={86}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {content.navItems.map((item) =>
            isSolucoesNav(item.href) && servicos.length > 0 ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {/* Clique → /servicos; hover → dropdown com itens de #solucoes */}
                <a
                  href={SERVICOS_PAGE_HREF}
                  className={cn(
                    "flex items-center gap-1 text-small font-medium transition-colors",
                    lightNav
                      ? "text-white/90 hover:text-white"
                      : "text-neutral-700 hover:text-primary-700",
                  )}
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      servicesOpen && "rotate-180",
                    )}
                    strokeWidth={1.75}
                  />
                </a>
                {servicesOpen && (
                  <div
                    role="menu"
                    className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-neutral-100 bg-white p-3 shadow-xl shadow-primary-900/10">
                      {servicosTree.map((svc) => {
                        const Icon = CONTENT_ICONS[svc.iconKey];
                        return (
                          <div key={svc.id} className="flex flex-col">
                            <a
                              role="menuitem"
                              href={`${SERVICOS_PAGE_HREF}#${svc.id}`}
                              className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-small font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                            >
                              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={1.75} />
                              {svc.titulo}
                            </a>
                            {svc.children.map((child) => (
                              <a
                                key={child.id}
                                role="menuitem"
                                href={`${SERVICOS_PAGE_HREF}#${child.id}`}
                                className="ml-6 rounded-lg px-3 py-1.5 text-small text-neutral-500 transition-colors hover:bg-primary-50 hover:text-primary-700"
                              >
                                {child.titulo}
                              </a>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.href}
                href={resolveHref(item.href)}
                className={cn(
                  "text-small font-medium transition-colors",
                  lightNav
                    ? "text-white/90 hover:text-white"
                    : "text-neutral-700 hover:text-primary-700",
                )}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="outline"
            size="sm"
            className={lightNav ? "border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white" : undefined}
          >
            <a href={whatsapp.href} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              {whatsapp.label}
            </a>
          </Button>
          <Button asChild variant="primary" size="sm" className="text-white">
            <a href={content.primaryCta.href}>{content.primaryCta.label}</a>
          </Button>
          {/* <Button asChild variant="portal" size="sm" className="text-white">
            <a href={content.portalUrl} target="_self">
              {content.portalCta.label}
            </a>
          </Button> */}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl lg:hidden",
            lightNav ? "text-white" : "text-neutral-900",
          )}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" strokeWidth={1.75} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          )}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-neutral-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {content.navItems.map((item) =>
              isSolucoesNav(item.href) && servicos.length > 0 ? (
                <div key={item.href} className="py-1.5">
                  <a
                    href={SERVICOS_PAGE_HREF}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-micro font-semibold uppercase text-neutral-500 hover:bg-neutral-50 hover:text-primary-700"
                  >
                    {item.label}
                    <span className="text-[10px] font-medium normal-case tracking-normal text-primary-600">
                      Ver todos
                    </span>
                  </a>
                  <div className="flex flex-col gap-0.5">
                    {servicosTree.map((svc) => {
                      const Icon = CONTENT_ICONS[svc.iconKey];
                      return (
                        <div key={svc.id}>
                          <a
                            href={`${SERVICOS_PAGE_HREF}#${svc.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-small text-neutral-700 hover:bg-neutral-50"
                          >
                            <Icon className="h-4 w-4 text-primary-600" strokeWidth={1.75} />
                            {svc.titulo}
                          </a>
                          {svc.children.map((child) => (
                            <a
                              key={child.id}
                              href={`${SERVICOS_PAGE_HREF}#${child.id}`}
                              onClick={() => setMobileOpen(false)}
                              className="ml-7 rounded-lg px-3 py-2 text-small text-neutral-500 hover:bg-neutral-50"
                            >
                              {child.titulo}
                            </a>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={resolveHref(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-body font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  {item.label}
                </a>
              ),
            )}
            <div className="mt-3 flex flex-col gap-3">
              <Button asChild variant="outline">
                <a href={whatsapp.href} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  {whatsapp.label}
                </a>
              </Button>
              <Button asChild variant="primary" className="text-white">
                <a
                  href={content.primaryCta.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {content.primaryCta.label}
                </a>
              </Button>
              <Button asChild variant="portal" className="text-white">
                <a href={content.portalUrl} target="_self">
                  {content.portalCta.label}
                </a>
              </Button>
            </div>
          </Container>
        </div>
      )}
      </header>
    </div>
  );
}
