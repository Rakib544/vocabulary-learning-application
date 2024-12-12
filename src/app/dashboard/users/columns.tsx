"use client";

import { ArrowUpDown, Ellips } from "@/components/icons";
import RoleChangeModal from "@/components/role-change-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";

export type Team = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const { role } = row.original;
      return (
        <span
          className={cn(
            "capitalize rounded-full  px-3 py-1 text-center text-xs font-semibold leading-5",
            role === "USER"
              ? " bg-red-400/10  text-red-500 hover:bg-red-400/20"
              : "bg-green-400/20 text-green-500 hover:bg-green-400/30"
          )}
        >
          {role}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const { role } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellips className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {role === "USER" ? (
              <RoleChangeModal>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Promote to admin
                </DropdownMenuItem>
              </RoleChangeModal>
            ) : (
              <RoleChangeModal>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Demote to normal user
                </DropdownMenuItem>
              </RoleChangeModal>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
