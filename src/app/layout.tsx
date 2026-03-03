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
  title: "SMK PGRI Wonosari - Sekolah Menengah Kejuruan Unggulan",
  description:
    "Website resmi SMK PGRI Wonosari. Menyediakan informasi profil sekolah, jurusan, berita terbaru, galeri kegiatan, dan informasi akademik secara lengkap dan terpercaya.",
  keywords: [
    "SMK PGRI Wonosari",
    "Sekolah Kejuruan Wonosari",
    "SMK Wonosari",
    "Berita SMK PGRI",
    "Jurusan SMK",
    "Sekolah Unggulan",
    "Pendidikan Kejuruan"
  ],
  authors: [{ name: "SMK PGRI Wonosari" }],
  icons: {
    icon: "https://drive.google.com/file/d/1OR8i8agMyGA4R9yzxVyVuiTS3kovjLvm/view?usp=sharing",
  },
  openGraph: {
    title: "SMK PGRI Wonosari",
    description:
      "Sekolah Menengah Kejuruan yang unggul, berkarakter, dan siap mencetak generasi profesional dan berdaya saing.",
    url: "https://smkpgriwonosari.sch.id",
    siteName: "SMK PGRI Wonosari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMK PGRI Wonosari",
    description:
      "Website resmi SMK PGRI Wonosari – Informasi profil, jurusan, berita, dan kegiatan sekolah.",
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
