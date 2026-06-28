import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fuithic — Sanatçıların Üretim Platformu",
  description:
    "Burada kusursuz eserler değil, özgün fikirler öne çıkar. Türkiye'nin yaratıcı sanat topluluğu.",
  keywords: ["sanat", "sanatçı", "karakalem", "suluboya", "dijital sanat", "topluluk", "platform"],
  openGraph: {
    title: "Fuithic",
    description: "Burada kusursuz eserler değil, özgün fikirler öne çıkar.",
    siteName: "Fuithic",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
