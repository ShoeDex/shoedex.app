import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "300 400 500 600 700 800 900",
  display: "swap",
});

export const metadata = {
  title: "ShoeDex - Scan your sneakers, Own your cards",
  description: "ShoeDex is a sneaker app that turns 3D scans into AI-rated collectible cards.",
  keywords: "sneakers, digital cards, collectibles, 3D scanning, AI, trading cards, shoes, ShoeDex",
  authors: [{ name: "ShoeDex Team" }],
  creator: "ShoeDex",
  publisher: "ShoeDex",
  
  // Open Graph
  openGraph: {
    title: "ShoeDex - Scan your sneakers, Own your cards",
    description: "ShoeDex is a sneaker app that turns 3D scans into AI-rated collectible cards.",
    url: "https://shoedex.app",
    siteName: "ShoeDex",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ShoeDex - Scan your sneakers, Own your cards",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "ShoeDex - Scan your sneakers, Own your cards",
    description: "ShoeDex is a sneaker app that turns 3D scans into AI-rated collectible cards.",
    images: ["/og-image.jpg"],
    creator: "@zanwei_guo",
    site: "@ShoeDexApp",
  },
  
  // Mobile optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  
  // Theme colors
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  
  // App metadata
  applicationName: "ShoeDex",
  appleWebApp: {
    capable: true,
    title: "ShoeDex",
    statusBarStyle: "black-translucent",
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  // Manifest
  manifest: "/manifest.json",
  
  // Additional metadata
  category: "Entertainment",
  classification: "Collectibles & Gaming",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "ShoeDex",
              "description": "ShoeDex is a sneaker app that turns 3D scans into AI-rated collectible cards.",
              "url": "https://shoedex.app",
              "applicationCategory": "Entertainment",
              "operatingSystem": "iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "ShoeDex"
              },
              "screenshot": "https://shoedex.app/og-image.jpg"
            })
          }}
        />
      </head>
      <body className={inter.variable}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
