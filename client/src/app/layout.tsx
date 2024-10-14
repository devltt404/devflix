import SiteFooter from "@/components/layouts/site-footer";
import SiteHeader from "@/components/layouts/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Lato } from "next/font/google";
import "./globals.css";

const font = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900", "300"],
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
