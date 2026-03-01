import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Tiger Films — Продюсерская компания | Кино Казахстан",
  description: "Tiger Films — продюсерская компания на базе Kinopark. Полнометражные фильмы, новости кино, база актёров и команда.",
  keywords: "Tiger Films, кино Казахстан, продюсерская компания, фильмы, Kinopark",
  icons: {
    icon: "/tiger-films-logo.png",
    apple: "/tiger-films-logo.png",
  },
  openGraph: {
    title: "Tiger Films",
    description: "Продюсерская компания. Наши фильмы, команда, новости.",
    images: ["/tiger-films-logo.png"],
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
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
