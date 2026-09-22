"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/data/nav";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { SearchDialog } from "./SearchDialog";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-line bg-canvas/80 shadow-[0_1px_0_rgba(14,22,19,0.03)] backdrop-blur-md"
          : "border-transparent bg-canvas"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 xl:gap-9">
          <Logo variant="lockup" />
          <ul className="hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-body/90 transition-colors hover:bg-mist hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <SearchDialog variant="icon" />
          <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          <Button href={routes.converter} size="sm">
            Convert
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <SearchDialog variant="icon" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "grid overflow-hidden border-t border-line bg-canvas transition-[grid-template-rows,opacity] duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0">
            <div className="space-y-1 px-5 py-4 sm:px-6">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-body transition-colors hover:bg-mist hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Button href={routes.converter} size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Convert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
