import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center text-center min-h-screen">
      <Container>
        <FadeIn className="my-32">
          <span className="text-6xl font-black text-primary">404</span>
          <h1 className="text-2xl mt-3 mb-2 font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <Link
            href="/lessons"
            className={buttonVariants({ className: "mt-4" })}
          >
            Go to home page
          </Link>
        </FadeIn>
      </Container>
    </main>
  );
}
