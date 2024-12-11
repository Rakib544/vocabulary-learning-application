"use client";
import { useState } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import { MobileNavIcon } from "./icons";
import { Button } from "./ui/button";
import { Sheet, SheetContent } from "./ui/sheet";

export default function DashboardMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button
        aria-label="Open Navigation"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      >
        <MobileNavIcon />
      </Button>

      <SheetContent side="left">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
}
