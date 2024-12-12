"use client";

import { Ellips } from "@/components/icons";
import LessonDeleteModal from "@/components/lesson-delete-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Lesson = {
  id: string;
  name: string;
  lessonNo: number;
  totalVocabularies: number;
};

export const columns: ColumnDef<Lesson>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "lessonNo",
    header: "Lesson Number",
  },
  {
    accessorKey: "totalVocabularies",
    header: "Total Vocabularies",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const { lessonNo, id } = row.original;

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
              <Link href={`/dashboard/lessons/${lessonNo}/edit`}>
                Edit lesson
              </Link>
            </DropdownMenuItem>
            <LessonDeleteModal id={id}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete lesson
              </DropdownMenuItem>
            </LessonDeleteModal>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
