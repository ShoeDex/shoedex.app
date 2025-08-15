import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "300 400 500 600 700 800 900",
  display: "swap",
});

export const metadata = {
  title: "ShoeDex - Scan your sneakers, Own your cards",
  description: "Transform your sneakers into unique digital collectible cards with ShoeDex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
