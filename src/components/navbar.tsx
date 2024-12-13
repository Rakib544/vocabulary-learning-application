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
import UserNav from "./user-nav";

export default function Navbar({
  name,
  photoUrl,
  email,
}: {
  name?: string;
  photoUrl?: string;
  email?: string;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth/");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  const isNavHidden = isAuthRoute || isDashboardRoute;

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
          SakuraLexis
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
            {name && photoUrl && email ? (
              <UserNav name={name} email={email} photoUrl={photoUrl} />
            ) : (
              <Link
                href="/auth/signin"
                className={buttonVariants({
                  className: "hidden lg:inline-flex ml-10",
                })}
              >
                Signin
              </Link>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="lg:hidden">
          <MobileNavigation navLinks={navLinks} />
        </div>
      </Container>
    </NavigationMenu>
  );
}
