import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Tiger Films — Продюсерская компания | Кино Казахстан",
  description: "Tiger Films — продюсерская компания на базе Kinopark. Полнометражные фильмы, новости кино, база актёров и команда.",
  keywords: "Tiger Films, кино Казахстан, продюсерская компания, фильмы, Kinopark",
  openGraph: {
    title: "Tiger Films 🐯",
    description: "Продюсерская компания. Наши фильмы, команда, новости.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
