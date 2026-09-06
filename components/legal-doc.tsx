"use client";

import type { ReactNode } from "react";
import { Footer, Navbar } from "@/components/landing";

export function LegalDoc({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Navbar />
    <main id="contenido" className="legal-page">
      <article className="wrap legal-doc">
        <p className="eyebrow legal-kicker">MS EXPRESS</p>
        <h1>{title}</h1>
        <p className="legal-updated">{updated}</p>
        {children}
      </article>
    </main>
    <Footer />
  </>;
}
