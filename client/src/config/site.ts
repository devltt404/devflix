import { SiteConfig } from "@/lib/definitions.ts";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

export const siteConfig: SiteConfig = {
  name: "DevFlix",
  description: "An open source movie app built in Next.js 14",
  url: "https://devflix.vercel.app",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Movies",
      href: "/movies",
    },
    {
      title: "People",
      href: "/people",
    },
    {
      title: "Favorites",
      href: "/favorites",
    },
  ],
  footerItems: [
    {
      title: "Quick Links",
      children: [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Movies",
          href: "/movies",
        },
        {
          title: "People",
          href: "/people",
        },
        {
          title: "FAQs",
          href: "/people",
        },
      ],
    },
    {
      title: "Contact Us",
      children: [
        {
          title: "ductripham@usf.edu",
          href: "mailto:",
        },
      ],
    },
    {
      title: "Social Links",
      children: [
        {
          title: "Facebook",
          href: "https://facebook.com",
          icon: Facebook,
        },
        {
          title: "Instagram",
          href: "https://instagram.com",
          icon: Instagram,
        },
        {
          title: "LinkedIn",
          href: "https://linkedin.com",
          icon: Linkedin,
        },
        {
          title: "Github",
          href: "https://github.com",
          icon: Github,
        },
      ],
    },
  ],
};
