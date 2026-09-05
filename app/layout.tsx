import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "MS Express RD | Software que mueve tu empresa",
 description: "Software a la medida, consultoría informática y sistemas de gestión. MS Express crea herramientas útiles para tu operación en República Dominicana.",
 robots: { index: false, follow: false },
 icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
 themeColor: "#1d529e",
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="es" className="dark"><body>{children}</body></html>; }
