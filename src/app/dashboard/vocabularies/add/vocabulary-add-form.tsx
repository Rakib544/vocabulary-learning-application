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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMutation from "@/hooks/use-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Lesson } from "../../lessons/columns";

const FormSchema = z.object({
  word: z.string().trim().min(1, { message: "Word is required" }),
  pronunciation: z
    .string()
    .trim()
    .min(1, { message: "Pronunciation is required" }),
  whenToSay: z.string().trim().min(1, { message: "When To Say is required" }),
  meaning: z.string().trim().min(1, { message: "Meaning is required" }),
  adminEmail: z.string().trim().email("Admin email required"),
  lessonId: z.string().min(24, { message: "Lesson number required." }),
});
export default function VocabularyAddForm({ lessons }: { lessons: Lesson[] }) {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  type FormValues = z.infer<typeof FormSchema>;

  const router = useRouter();

  const mutationFunction = async (data: FormValues) => {
    try {
      const { adminEmail, ...rest } = data;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/vocabularies`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({ ...rest, userId: session?.user.id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = await response.json();
      toast(result.message);
      router.push("/dashboard/vocabularies");
      router.refresh();
    } catch (error: any) {
      toast(error.message);
    }
  };

  const { isLoading, mutate } = useMutation(mutationFunction);

  async function onSubmit(data: FormValues) {
    mutate(data);
  }

  useEffect(() => {
    if (session?.user.email) {
      form.setValue("adminEmail", session?.user.email || "");
    }
  }, [session?.user?.email]);

  return (
    <div className="max-w-xl mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Word</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      {...field}
                      placeholder="e.g. こんにちは"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pronunciation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronunciation</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Konnichiwa"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meaning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meaning</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Hello" className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whenToSay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When to say</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Used for greeting"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lessonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Lesson</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={
                      field.value ? field.value.toString() : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lesson" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lessons.map((lesson) => (
                        <SelectItem key={lesson.id} value={lesson.id}>
                          Lesson - {lesson.lessonNo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adminEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 size={20} className="animate-spin" />} Add
              vocabulary
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
