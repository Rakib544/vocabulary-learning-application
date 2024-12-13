import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { authOptions } from "@/lib/auth";
import VocabulariesSection from "@/sections/vocabularies-section";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Lesson = {
  id: string;
  lessonNo: number;
  name: string;
  vocabularies: {
    id: string;
    word: string;
    pronunciation: string;
    whenToSay: string;
    meaning: string;
    lessonNo: number;
  }[];
};

async function getLesson(
  lessonNo: number,
  accessToken?: string
): Promise<Lesson> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/lessons/${lessonNo}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();
  return result.data;
}

export default async function LessonDetailsPage({
  params,
}: {
  params: { lessonNo: number };
}) {
  const { lessonNo } = params;
  const session = await getServerSession(authOptions);

  const lesson = await getLesson(lessonNo, session?.user.accessToken);

  return (
    <main>
      <Container>
        <PageIntro pageTitle={lesson.name} />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-sm text-foreground font-medium">
              <BreadcrumbLink asChild>
                <Link href="/lessons">Lessons</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-sm text-foreground font-medium">
              <BreadcrumbPage>Lesson - {lesson.lessonNo}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <VocabulariesSection vocabularies={lesson.vocabularies} />
      </Container>
    </main>
  );
}
