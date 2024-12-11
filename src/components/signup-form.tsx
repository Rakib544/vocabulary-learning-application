"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email("This is not a valid email"),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  type FormValues = z.infer<typeof FormSchema>;

  async function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoFocus
                    {...field}
                    placeholder="Name"
                    className="rounded-full pl-6"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Please enter your name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="rounded-full pl-6"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Please enter your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="rounded-full pl-6"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Please enter your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-full pl-6"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Please enter your confirm password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full">
            Register
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center text-sm font-medium">
        <span className="mt-3 block">
          Already have an account?{" "}
          <Link href="/auth/signin" className="hover:underline">
            {" "}
            Signin
          </Link>
        </span>
      </div>
    </div>
  );
}
