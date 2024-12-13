import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

type ResponseType = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    lessonNo: number;
    totalVocabularies: number;
  }[];
};

export default async function LessonsPage() {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/lessons`,
    {
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = (await response.json()) as ResponseType;

  const lessons = result.data;

  return (
    <main>
      <Container>
        <PageIntro pageTitle="Explore Your Japanese Lessons">
          <p>
            Master Japanese vocabulary with our step-by-step lessons designed
            for your success.
          </p>
        </PageIntro>
      </Container>
      <div className="mt-12 md:mt-24">
        <Container>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {lessons.map((lesson) => (
              <li
                key={lesson.lessonNo}
                className="p-6 rounded-xl custom-shadow border border-slate-50 bg-white text-center"
              >
                <Link href={`/lessons/${lesson.lessonNo}`}>
                  <span className="inline-flex rounded-full justify-center size-10 bg-primary text-white items-center ">
                    {lesson.lessonNo}
                  </span>
                  <h3 className="text-lg pt-2 pb-4 font-semibold">
                    {lesson.name}
                  </h3>
                  <Button variant="outline">
                    Start Lesson{" "}
                    <ChevronRight className="text-slate-600 size-5" />
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </main>
  );
}
