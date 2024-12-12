"use client";

import useMutation from "@/hooks/use-mutation";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function RoleChangeModal({
  children,
  id,
  role,
}: {
  children: React.ReactNode;
  id: string;
  role: "USER" | "ADMIN";
}) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mutateFunction = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/users/${id}/role`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({ role }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const result = await response.json();
      toast(result.message);
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast(error.message);
    }
  };

  const { isLoading, mutate } = useMutation(mutateFunction);

  function handleDeleteTutorial() {
    mutate({});
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You can update the user&apos;s role anytime. This change will take
            effect immediately and can be reverted later if needed
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={handleDeleteTutorial}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : ""}{" "}
            Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
