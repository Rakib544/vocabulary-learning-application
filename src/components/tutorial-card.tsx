"use client";

import Link from "next/link";
import { Ellips } from "./icons";
import TutorialDeleteModal from "./tutorial-delete-modal";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function TutorialCard({
  url,
  title,
  id,
}: {
  url: string;
  title: string;
  id: string;
}) {
  return (
    <div className="relative">
      <div className="absolute top-5 right-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <Ellips />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/tutorials/${id}/edit`}>
                Edit tutorial
              </Link>
            </DropdownMenuItem>
            <TutorialDeleteModal id={id}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete tutorial
              </DropdownMenuItem>
            </TutorialDeleteModal>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <iframe
        className="aspect-video w-full"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3 className="font-semibold mt-2">{title}</h3>
    </div>
  );
}
