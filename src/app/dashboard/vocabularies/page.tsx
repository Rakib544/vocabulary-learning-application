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
import { columns, Vocabulary } from "./columns";
import { DataTable } from "./data-table";

const vocabularies = [
  {
    id: 1,
    word: "こんにちは",
    pronunciation: "Konnichiwa",
    meaning: "Hello / Good afternoon",
    whenToSay: "Used as a general greeting during the day.",
    lessonNo: 1,
  },
  {
    id: 2,
    word: "ありがとう",
    pronunciation: "Arigatou",
    meaning: "Thank you",
    whenToSay: "Used to express gratitude.",
    lessonNo: 2,
  },
  {
    id: 3,
    word: "さようなら",
    pronunciation: "Sayounara",
    meaning: "Goodbye",
    whenToSay: "Used when parting with someone for a longer period.",
    lessonNo: 1,
  },

  {
    id: 4,
    word: "わかりました",
    pronunciation: "Wakarimashita",
    meaning: "I understand",
    whenToSay: "Used to indicate that you understand something.",
    lessonNo: 5,
  },
];

async function getVocabularies(accessToken?: string): Promise<Vocabulary[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/vocabularies`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = await response.json();
  return result.data;
}

export default async function DashboardVocabulariesPage() {
  const session = await getServerSession(authOptions);
  const vocabularies = await getVocabularies(session?.user.accessToken);
  return (
    <div>
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
          Manage Vocabularies
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
              <BreadcrumbPage>Vocabularies</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mx-auto w-full overflow-x-auto py-10">
          <DataTable columns={columns} data={vocabularies} />
        </div>
      </div>
    </div>
  );
}
