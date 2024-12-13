import { CirclePlus } from "@/components/icons";
import TutorialCard from "@/components/tutorial-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Tutorials = {
  id: string;
  title: string;
  url: string;
};

async function getTutorials(accessToken?: string): Promise<Tutorials[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/tutorials`,
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

export default async function DashboardTutorialsPage() {
  const session = await getServerSession(authOptions);
  const tutorials = await getTutorials(session?.user.accessToken);
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        Manage Tutorials
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
            <BreadcrumbPage>Tutorials</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/dashboard/tutorials/add">
            Add New <CirclePlus className="h-[18px] w-[18px] ml-1" />
          </Link>
        </Button>
      </div>

      {tutorials.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
          {tutorials.map((tutorial) => (
            <li key={tutorial.id}>
              <TutorialCard
                id={tutorial.id}
                title={tutorial.title}
                url={tutorial.url}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-96 flex justify-center items-center">
          <p>No tutorial available</p>
        </div>
      )}
    </div>
  );
}
