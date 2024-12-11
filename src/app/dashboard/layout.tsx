import DashboardMobileNavigation from "@/components/dashboard-mobile-navigation";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { SearchModal } from "@/components/search-modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserNav from "@/components/user-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="fixed w-full lg:w-[calc(100%-281px)] ml-auto top-0 right-0 left-auto z-30 mb-6 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-9 h-20">
        <div className="flex items-center gap-x-4 mt-2 relative">
          <div className="block lg:hidden">
            <DashboardMobileNavigation />
          </div>
          <SearchModal />
        </div>
        <div className="flex gap-x-4">
          <UserNav />
        </div>
      </header>
      <div className="min-h-full flex flex-column lg:flex-row">
        <aside className="shrink-0 hidden lg:block lg:w-[280px]">
          <div className="flex flex-col h-full w-[280px] fixed border-r border-dotted">
            <ScrollArea className="h-full px-4">
              <DashboardSidebar />
            </ScrollArea>
          </div>
        </aside>
        <div className="flex-grow min-h-full flex flex-col w-full lg:width-[calc(100%-280px)] py-24 px-4">
          <div className="w-full max-w-[1536px] block mr-auto ml-auto lg:px-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
