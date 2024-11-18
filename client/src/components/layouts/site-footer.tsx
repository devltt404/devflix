import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import Logo from "../logo";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-t-primary bg-white dark:bg-black">
      <div className="container grid grid-cols-12 gap-8 py-12">
        <div className="col-span-12 lg:col-span-5">
          <Logo className="text-4xl" />
          <p className="mt-2 leading-7 text-muted-foreground">
            DevFlix is a movie website built with Next.js 14 and shadcn/ui
            inspired by Netflix. The website uses movie data from the TMDB API.
          </p>
        </div>

        {siteConfig.footerItems.slice(0, 2).map(
          (item) =>
            item.children && (
              <div
                key={item.title}
                className="col-span-6 md:col-span-4 lg:col-span-2"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {item.children.map((child, index) => (
                    <li key={index}>
                      <Link
                        href={child.href as string}
                        className="text-muted-foreground hover:text-black dark:hover:text-white"
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
        )}

        <div className="col-span-12 md:col-span-4 lg:col-span-2">
          <h3 className="text-lg font-semibold">
            {siteConfig.footerItems[2].title}
          </h3>
          <ul className="mt-4 flex flex-wrap">
            {siteConfig.footerItems[2].children!.map(
              (child, index) =>
                child.icon && (
                  <li key={index} className="mr-4">
                    <a
                      href={child.href as string}
                      className="text-muted-foreground hover:text-black dark:hover:text-white"
                    >
                      <child.icon />
                      <span className="sr-only">{child.title} profile</span>
                    </a>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-500 border-opacity-30 py-6 text-center text-muted-foreground">
        <p>Developed by devltt404</p>
      </div>
    </footer>
  );
}
