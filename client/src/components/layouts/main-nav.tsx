import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MainNavItem } from "@/lib/definitions.ts";
import Link from "next/link";

type MainNavProps = {
  items: MainNavItem[];
};

export default function MainNav({ items }: MainNavProps) {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {items.map(
          (item) =>
            item.href && (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() +
                      " text-gray-500 dark:text-gray-300"
                    }
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
