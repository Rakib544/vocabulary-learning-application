"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";

export function Footer() {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth/");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  const isFooterAllowed = isAuthRoute || isDashboardRoute;
  return (
    <footer className={cn(isFooterAllowed ? "hidden" : "block")}>
      <Container>
        <div className="mt-24 w-full sm:mt-32 lg:mt-40 pb-10 flex flex-col md:flex-row justify-between space-y-4 text-center md:text-left">
          <ul className="flex items-center gap-x-6 justify-center md:justify-start">
            <li>
              <Link
                href="mailto:md.rakib10122003@gmail.com"
                className="hover:text-primary transition duration-300"
              >
                Email
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/dev-rakib/"
                target="_blank"
                className="hover:text-primary transition duration-300"
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/Rakib544"
                target="_blank"
                className="hover:text-primary transition duration-300"
              >
                Github
              </Link>
            </li>
          </ul>
          <p>©{new Date().getFullYear()} Designed and Developed by Rakib</p>
        </div>
      </Container>
    </footer>
  );
}
