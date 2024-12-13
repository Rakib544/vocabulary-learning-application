import { Lesson } from "@/app/dashboard/lessons/columns";
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
import { Vocabulary } from "../../columns";
import VocabularyEditForm from "./vocabulary-edit-form";

async function getVocabulary(
  id: string,
  accessToken?: string
): Promise<Vocabulary & { lessonId: string }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/vocabularies/${id}`,
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

async function getLessons(accessToken?: string): Promise<Lesson[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/lessons`,
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

export default async function VocabularyEditPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const [vocabulary, lessons] = await Promise.all([
    getVocabulary(params.id, session?.user.accessToken),
    getLessons(session?.user.accessToken),
  ]);

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        Edit Vocabulary
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
              <Link href="/dashboard/vocabularies">Vocabularies</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-sm">
            <BreadcrumbPage className="text-muted-foreground">
              {vocabulary.word}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <VocabularyEditForm vocabulary={vocabulary} lessons={lessons} />
    </div>
  );
}
