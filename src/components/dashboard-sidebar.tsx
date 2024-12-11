"use client";
import { dashboardMenus } from "@/lib/data/dashboard-menus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextUnderline } from "./icons";
import { buttonVariants } from "./ui/button";

export default function DashboardSidebar({
  className,
}: {
  className?: string;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    const slicedPath = path.slice(10);
    const slicedCurrentPath = pathname.slice(10);
    if (slicedPath === "") {
      return slicedPath === slicedCurrentPath;
    }
    return pathname.slice(10).startsWith(path.slice(10));
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className=" py-4">
        <div className="px-1 py-2 space-y-4">
          <Link
            aria-label="Home"
            href="/"
            className="text-2xl font-extrabold text-primary relative inline-block ml-4"
          >
            Agenify
            <TextUnderline />
          </Link>
          <div className="space-y-1">
            {dashboardMenus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                data-state={isActive(menu.href) ? "active" : "inactive"}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  isActive(menu.href)
                    ? "bg-indigo-600 !text-white hover:bg-indigo-600"
                    : "hover:bg-muted",
                  "flex !items-center group gap-x-0.5 text-foreground justify-start min-h-11 !rounded-lg"
                )}
              >
                {menu.icon}
                <span className="mt-[1px]">{menu.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
