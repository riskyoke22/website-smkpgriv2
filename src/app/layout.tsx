import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMK PGRI Wonosari",
  description:
    "Website resmi SMK PGRI Wonosari. Menyediakan informasi profil sekolah, jurusan, berita terbaru, galeri kegiatan, dan informasi akademik secara lengkap dan terpercaya.",
  keywords: [
    "SMK PGRI Wonosari",
    "Sekolah Kejuruan Wonosari",
    "SMK Wonosari",
    "Berita SMK PGRI",
    "Jurusan SMK",
    "Sekolah Unggulan",
    "Pendidikan Kejuruan",
    "SMK BIMARI",
  ],
  authors: [{ name: "SMK PGRI Wonosari" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "SMK PGRI Wonosari",
    description:
      "Sekolah Menengah Kejuruan yang unggul, berkarakter, dan siap mencetak generasi profesional dan berdaya saing.",
    url: "https://smkbimari.sch.id",
    siteName: "SMK PGRI Wonosari",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Logo SMK PGRI Wonosari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMK PGRI Wonosari",
    description:
      "Website resmi SMK PGRI Wonosari. Informasi profil, jurusan, berita, dan kegiatan sekolah.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
