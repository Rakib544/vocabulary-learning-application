import { TextUnderline } from "@/components/icons";
import LoginForm from "@/components/login-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sing in and get started",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignIn() {
  return (
    <div className="min-h-screen h-full">
      <div className="flex items-center min-h-screen">
        <div className="max-w-lg w-full mx-auto h-full flex items-center ">
          <div className="max-w-lg w-full mx-auto px-6">
            <Link
              aria-label="Home"
              href="/"
              className="text-2xl font-extrabold text-primary relative mb-6 inline-block"
            >
              Agenify
              <TextUnderline />
            </Link>

            <h1 className="font-extrabold text-2xl text-foreground">
              Login to your Account
            </h1>
            <p className="text-muted-foreground leading-7 text-base mt-1 mb-8">
              Welcome back! Select Method to login.
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
