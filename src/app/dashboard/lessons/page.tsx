import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { DataTable } from "./data-table";

import { columns } from "./columns";

const lessons = [
  {
    id: "1",
    title: "Introduction to Greetings",
    lessonNo: 1,
    totalVocabularies: 5,
  },
  {
    id: "2",
    title: "Basic Numbers",
    lessonNo: 2,
    totalVocabularies: 3,
  },
  {
    id: "3",
    title: "Everyday Phrases",
    lessonNo: 3,
    totalVocabularies: 15,
  },
  {
    id: "4",
    title: "Introducing Yourself",
    lessonNo: 4,
    totalVocabularies: 25,
  },
  {
    id: "5",
    title: "Common Questions",
    lessonNo: 5,
    totalVocabularies: 2,
  },
];

export default async function DashboardLessonPage() {
  return (
    <div>
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
          Manage Lessons
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
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mx-auto w-full overflow-x-auto py-10">
          <DataTable columns={columns} data={lessons} />
        </div>
      </div>
    </div>
  );
}
