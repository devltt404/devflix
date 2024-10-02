import { siteConfig } from "@/config/site";
import Link from "next/link";
import Logo from "../logo";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-t-primary dark:bg-black bg-white">
      <div className="container grid grid-cols-12 gap-12 py-12">
        <div className="col-span-5">
          <Logo className="text-4xl" />
          <p className="text-muted-foreground leading-7 mt-2">
            DevFlix is a movie website build with Next.js 14 and shadcn/ui
            inspired by Netflix. Website uses movie data from TMDB API.
          </p>
        </div>

        {siteConfig.footerItems.slice(0, 2).map(
          (item) =>
            item.children && (
              <div key={item.title} className="col-span-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <ul className="mt-4 gap-3 flex flex-col">
                  {item.children.map((child, index) =>
                    child.icon ? (
                      <li key={index}>
                        <a
                          href={child.href as string}
                          className="text-muted-foreground dark:hover:text-white hover:text-black"
                        >
                          <child.icon />
                        </a>
                      </li>
                    ) : (
                      <li key={index}>
                        <Link
                          href={child.href as string}
                          className="text-muted-foreground dark:hover:text-white hover:text-black"
                        >
                          {child.title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )
        )}

        <div className="col-span-2">
          <h3 className="text-lg font-semibold">
            {siteConfig.footerItems[2].title}
          </h3>
          <ul className="flex flex-wrap mt-4">
            {siteConfig.footerItems[2].children!.map(
              (child, index) =>
                child.icon && (
                  <li key={index} className="mr-4">
                    <a
                      href={child.href as string}
                      className="text-muted-foreground hover:text-black dark:hover:text-white"
                    >
                      <child.icon />
                    </a>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-muted-foreground border-gray-500 border-opacity-30 ">
        <p>Developed by devltt404</p>
      </div>
    </footer>
  );
}
