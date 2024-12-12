"use client";

import { Ellips } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VocabularyDeleteModal from "@/components/vocabolary-delete-modal";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Vocabulary = {
  id: string | number;
  word: string;
  pronunciation: string;
  whenToSay: string;
  meaning: string;
  lesson: {
    lessonNo: number;
  };
};

export const columns: ColumnDef<Vocabulary>[] = [
  {
    accessorKey: "word",
    header: "Word",
  },
  {
    accessorKey: "pronunciation",
    header: "Pronunciation",
  },
  {
    accessorKey: "whenToSay",
    header: "When to say",
  },
  {
    accessorKey: "meaning",
    header: "Meaning",
  },
  {
    accessorKey: "lesson.lessonNo",
    header: "Lesson Number",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const { id } = row.original;
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
              <Link href={`/dashboard/vocabularies/${id}/edit`}>
                Edit vocabulary
              </Link>
            </DropdownMenuItem>
            <VocabularyDeleteModal>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete vocabulary
              </DropdownMenuItem>
            </VocabularyDeleteModal>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
