"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMutation from "@/hooks/use-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: "name is required" }),
  lessonNo: z.coerce.number().int().gt(0),
});
export default function LessonEditForm({
  name,
  lessonNo,
  id,
}: {
  name: string;
  lessonNo: number;
  id: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      lessonNo,
    },
  });
  type FormValues = z.infer<typeof FormSchema>;
  const { data: session } = useSession();
  const router = useRouter();

  const mutateFunction = async (data: FormValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/lessons/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const result = await response.json();
      toast(result.message);
      router.push("/dashboard/lessons");
    } catch (error: any) {
      toast(error.message);
    }
  };

  const { isLoading, mutate } = useMutation(mutateFunction);

  async function onSubmit(data: FormValues) {
    mutate(data);
  }

  return (
    <div className="max-w-xl mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      {...field}
                      placeholder="e.g. Introduction"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lessonNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson No</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="e.g. 1"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : ""}{" "}
              Update lesson
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
