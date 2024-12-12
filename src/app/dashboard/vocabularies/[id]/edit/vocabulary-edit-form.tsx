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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  word: z.string().trim().min(1, { message: "Word is required" }),
  pronunciation: z
    .string()
    .trim()
    .min(1, { message: "Pronunciation is required" }),
  whenToSay: z.string().trim().min(1, { message: "When To Say is required" }),
  meaning: z.string().trim().min(1, { message: "Meaning is required" }),
  adminEmail: z.string().trim().email("Admin email required"),
  lessonNo: z.coerce.number().int().gt(0),
});
export default function VocabularyEditForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      adminEmail: "md.rakib10122003@gmail.com",
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
              name="lessonNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Number</FormLabel>
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
                      <SelectItem value="1">Lesson - 1</SelectItem>
                      <SelectItem value="2">Lesson - 2</SelectItem>
                      <SelectItem value="3">Lesson - 3</SelectItem>
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
            <Button type="submit">Update vocabulary</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
