import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { DataTable } from "./data-table";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { columns, type Lesson } from "./columns";

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

export default async function DashboardLessonPage() {
  const session = await getServerSession(authOptions);
  const lessons = await getLessons(session?.user.accessToken);
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
              <BreadcrumbPage>Lessons</BreadcrumbPage>
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
