import { Container } from "@/components/container";
import { ReactNode } from "react";

export function Testimonial({
  author,
  children,
}: {
  author: { name: string; role: string };
  children?: ReactNode;
}) {
  return (
    <aside
      aria-label={`Testimonial from ${author.name}`}
      className="relative py-16 sm:py-32 w-full"
    >
      <Container size="xs" className="relative">
        <figure>
          <blockquote className="mt-10 font-display text-xl font-medium tracking-tight text-slate-900 sm:text-center">
            {children}
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center text-center">
            <div>
              <div className="text-base font-medium leading-6 tracking-tight text-slate-900">
                {author.name}
              </div>
              <div className="mt-1 text-sm text-slate-600">{author.role}</div>
            </div>
          </figcaption>
        </figure>
      </Container>
    </aside>
  );
}
