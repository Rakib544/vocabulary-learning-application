import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Lesson } from "../../columns";
import LessonEditForm from "./lesson-edit-form";

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
    }
  );
  const result = await response.json();
  return result.data;
}

export default async function LessonEditPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const lesson = await getLesson(id, session?.user.accessToken);
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        Edit Lesson
      </h2>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="text-sm text-foreground font-medium">
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-sm text-foreground font-medium">
            <BreadcrumbLink asChild>
              <Link href="/dashboard/lessons">Lessons</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-sm">
            <BreadcrumbPage className="text-muted-foreground">
              {lesson?.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <LessonEditForm
        name={lesson.name}
        lessonNo={lesson.lessonNo}
        id={lesson.id}
      />
    </div>
  );
}
