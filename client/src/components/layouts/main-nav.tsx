import { siteConfig } from "@/config/site.config";
import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="hidden gap-4 lg:flex">
      {siteConfig.mainNav.map(
        (item) =>
          item.href && (
            <Link
              key={item.title}
              href={item.href}
              className="inline-flex h-10 rounded-md px-4 py-2 font-medium text-gray-500 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-gray-300"
            >
              {item.title}
            </Link>
          ),
      )}
    </nav>
  );
}
