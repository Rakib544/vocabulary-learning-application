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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  lessonNo: z.coerce.number().int().gt(0),
});
export default function LessonEditForm({
  title,
  lessonNo,
}: {
  title: string;
  lessonNo: number;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
      lessonNo,
    },
  });
  type FormValues = z.infer<typeof FormSchema>;

  async function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div className="max-w-xl mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
            <Button type="submit">Update lesson</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
