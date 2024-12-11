"use client";

import { ArrowUpDown, Ellips } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateBlurImageURL } from "@/lib/data/blur-image-data";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type Team = {
  id: string;
  user: {
    name: string;
    image: string | StaticImageData;
  };
  phone: string;
  status: "active" | "suspended";
  email: string;
  country: string;
};

export const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const { user } = row.original;

      return (
        <div className="flex items-center gap-x-2">
          <div className="shrink-0 size-10">
            <Image
              src={user.image}
              alt={user.name}
              height={30}
              width={30}
              placeholder="blur"
              blurDataURL={generateBlurImageURL()}
              className="h-full w-full object-cover object-center rounded-full"
            />
          </div>
          <div>
            <h3>{user.name}</h3>
          </div>
        </div>
      );
    },
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
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  // },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <span
          className={cn(
            "capitalize rounded-full  px-3 py-1 text-center text-xs font-semibold leading-5",
            status === "active"
              ? " bg-red-400/10  text-red-500 hover:bg-red-400/20"
              : "bg-green-400/20 text-green-500 hover:bg-green-400/30"
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem asChild>
              <Link href="/dashboard/teams/1/edit">Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
