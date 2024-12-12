"use client";
import { navLinks } from "@/lib/data/navigation-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { TextUnderline } from "./icons";
import MobileNavigation from "./mobile-navigation";
import { buttonVariants } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export default function Navbar() {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth/");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isDocsRoute = pathname.startsWith("/docs");

  const isNavHidden = isAuthRoute || isDashboardRoute || isDocsRoute;

  return (
    <NavigationMenu
      className={`py-4 max-w-none z-50  !w-full ${
        isNavHidden ? "hidden" : "block"
      }`}
    >
      <Container className="flex w-full !px-0 justify-between items-center">
        <Link
          aria-label="Home"
          href="/lessons"
          className="text-2xl font-extrabold text-primary relative"
        >
          KanaBridge
          <TextUnderline />
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="hidden lg:flex !relative">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.id} className="relative">
                <Link href={link?.href || ""} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <Link
            href="/auth/signin"
            className={buttonVariants({
              className: "hidden lg:inline-flex ml-10",
            })}
          >
            Signin
          </Link>
        </NavigationMenu>

        <div className="lg:hidden">
          <MobileNavigation navLinks={navLinks} />
        </div>
      </Container>
    </NavigationMenu>
  );
}
