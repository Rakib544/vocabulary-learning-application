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
import useMutation from "@/hooks/use-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email("This is not a valid email"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  type FormValues = z.infer<typeof FormSchema>;

  const mutationFunction = async (payload: FormValues) => {
    try {
      const response = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });

      if (response?.status === 200) {
        toast("Login successful");
        window.location.replace(window.location.origin + "/dashboard");
        return;
      }
      toast(response?.error ?? "Failed to login");
      return { data: response };
    } catch (error) {
      throw error;
    }
  };

  const { isLoading, mutate } = useMutation(mutationFunction);

  async function onSubmit(data: FormValues) {
    mutate({ email: data.email, password: data.password });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    autoFocus
                    {...field}
                    className="rounded-full pl-6"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Please enter your email address
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
                    {...field}
                    className="rounded-full pl-6"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Please enter your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 size={20} className="animate-spin" />} Log in
          </Button>
        </form>
      </Form>
      <div className="mt-8 text-center text-sm font-medium">
        <span className="mt-3 block">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="hover:underline">
            {" "}
            Create an Account
          </Link>
        </span>
      </div>
    </div>
  );
}
