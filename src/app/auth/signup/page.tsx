import { TextUnderline } from "@/components/icons";
import SignUpForm from "@/components/signup-form";
import { MotionDiv } from "@/lib/framer-motion";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign up and get started",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignUp() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen h-full"
    >
      <div className="flex items-center min-h-screen">
        <div className="max-w-lg mx-auto w-full h-full flex items-center ">
          <div className="max-w-lg w-full mx-auto px-6">
            <Link
              aria-label="Home"
              href="/lessons"
              className="text-2xl font-extrabold text-primary relative inline-block mb-6"
            >
              SakuraLexis
              <TextUnderline />
            </Link>
            <h1 className="font-extrabold text-2xl text-foreground">
              Create your Account
            </h1>
            <p className="text-muted-foreground leading-7 text-base mt-1 mb-8">
              Welcome back! Please enter your details
            </p>
            <SignUpForm />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
