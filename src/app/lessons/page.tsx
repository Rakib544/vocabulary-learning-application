import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const lessons = [
  {
    title: "Introduction to Greetings",
    lessonNo: 1,
  },
  {
    title: "Basic Numbers",
    lessonNo: 2,
  },
  {
    title: "Everyday Phrases",
    lessonNo: 3,
  },
  {
    title: "Introducing Yourself",
    lessonNo: 4,
  },
  {
    title: "Common Questions",
    lessonNo: 5,
  },
  {
    title: "Time and Dates",
    lessonNo: 6,
  },
  {
    title: "Shopping Vocabulary",
    lessonNo: 7,
  },
  {
    title: "Travel and Directions",
    lessonNo: 8,
  },
  {
    title: "Food and Dining",
    lessonNo: 9,
  },
  {
    title: "Basic Conversations",
    lessonNo: 10,
  },
];

export default async function LessonsPage() {
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
      <div className="mt-24">
        <Container>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    {lesson.title}
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
