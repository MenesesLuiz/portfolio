import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/manrope";
import "@fontsource/fjalla-one/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "MenesesLuiz — Engenharia & Segurança", template: "%s | MenesesLuiz" },
  description: "Portfólio de Luiz Meneses: Engenharia de Software, Cybersecurity, Cloud Security, IA aplicada e desenvolvimento web.",
  applicationName: "MenesesLuiz",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
