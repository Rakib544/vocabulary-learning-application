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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import userImage from "../images/user.webp";
import { Label } from "./ui/label";

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

async function handleDeleteImageFromCloudinary(publicId: string) {
  await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      }),
    }
  );
}

export default function SignUpForm() {
  const [profile, setProfile] = useState<File | undefined | null>(null);
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  type FormValues = z.infer<typeof FormSchema>;

  const router = useRouter();

  async function handleImageUploadToCloudinary() {
    const file = profile;
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUD_PRESET as string
    );
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME as string);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await res.json();

    return { publicId: result.public_id, url: result.url };
  }

  const mutationFunction = async (payload: FormValues) => {
    const imageResult = await handleImageUploadToCloudinary();
    try {
      const { email, name, password } = payload;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            password,
            photoUrl: imageResult?.url,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = await response.json();
      toast(result.message);
      router.push("/auth/signin");
    } catch (error: any) {
      await handleDeleteImageFromCloudinary(imageResult?.publicId);
      toast(error.message);
    }
  };

  const { isLoading, mutate } = useMutation(mutationFunction);

  async function onSubmit(data: FormValues) {
    if (!profile) {
      setError(true);
      return;
    }
    mutate({ ...data });
    setError(false);
  }

  const image = profile ? URL.createObjectURL(profile) : userImage;

  return (
    <div>
      <div className="relative mx-auto flex h-[120px] w-[120px] justify-center mb-2">
        <Image
          src={image}
          alt=""
          width="120"
          height="120"
          className="rounded-full border-2"
        />
        <Label htmlFor="profile">
          <button
            type="button"
            className="absolute bottom-3 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white"
          >
            <Pencil size="16" />
          </button>
        </Label>
        <Input
          type="file"
          id="profile"
          accept=".jpg, .jpeg, .webp, .png"
          className="absolute inset-0 h-full opacity-0"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setProfile(event.target.files?.[0]);
            setError(false);
          }}
        />
      </div>

      <p
        className={cn(
          error ? "text-red-500" : "text-white",
          "text-center text-sm font-medium mb-2"
        )}
      >
        Please upload profile picture
      </p>

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

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 size={20} className="animate-spin" />}{" "}
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
