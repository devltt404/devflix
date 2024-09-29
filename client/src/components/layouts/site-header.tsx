"use client";

import ExpandableSearch from "@/components/expandable-search";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/helper.util";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../logo";
import MainNav from "./main-nav";

export default function SiteHeader() {
  const { setTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 w-screen top-0 z-10 py-3 px-12 flex items-center gap-8 transition-all ease-in-out duration-500",
        isScrolled ? "dark:bg-background" : "bg-transparent"
      )}
    >
      <Link href="/">
        <Logo
          className={cn(
            "transition text-3xl",
            isScrolled ? "scale-90" : "scale-110"
          )}
        />
      </Link>
      <MainNav items={siteConfig.mainNav} />

      <div className="flex gap-4 ml-auto">
        <ExpandableSearch />

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button>Sign In</Button>
      </div>
    </header>
  );
}
