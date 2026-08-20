import type { Metadata } from "next";
import { Lora, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/ui/AppShell";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bene - Tvoj sprievodca rehabilitáciou",
  description:
    "Rehabilitačná appka, ktorá ťa prevedie cvičeniami krok za krokom.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sk"
      className={`${lora.variable} ${hanken.variable} h-full light`}
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <body className="h-full text-ink font-sans antialiased" style={{ backgroundColor: '#fefefe' }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
