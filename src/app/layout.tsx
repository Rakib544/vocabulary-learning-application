import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { NextAuthProvider } from "@/components/nextauth-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth";
import type { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

const workSans = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/menifest.json`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <body className={workSans.className} suppressHydrationWarning={true}>
        <NextAuthProvider>
          <header className=" sticky top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container>
              <Navbar
                photoUrl={session?.user.photoUrl}
                name={session?.user.name}
                email={session?.user.email}
              />
            </Container>
          </header>
          <div className="min-h-[70vh]">{children}</div>
          <Footer />
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
