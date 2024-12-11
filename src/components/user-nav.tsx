"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { UsersIcon } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={"" as string} alt="Rakib" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href="/setting/edit-profile"
              className="flex items-center gap-4"
            >
              <Avatar className="h-14 w-14">
                <AvatarImage src={"" as string} alt="Rakib" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-bold leading-none">Rakib</p>
                <p className=" line-clamp-1 w-full truncate text-xs leading-none text-muted-foreground">
                  md.rakib10122003@gmail.com
                </p>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer py-2 font-medium">
          <Link href="/dashboard">
            <UsersIcon className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer py-2 font-medium">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
