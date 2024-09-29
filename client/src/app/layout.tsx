import SiteFooter from "@/components/layouts/site-footer";
import SiteHeader from "@/components/layouts/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const font = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="bg-background">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
