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
import Link from "next/link";

const tutorials = [
  {
    id: 1,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 2,
    title: "Word Meaning - Part 1 | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 3,
    title: "Word Meaning - Part 2 | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 4,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 5,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 6,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 7,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 8,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
];

export default async function DashboardTutorialsPage() {
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
      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tutorials.map((tutorial) => (
          <li key={tutorial.id}>
            <TutorialCard
              id={tutorial.id.toString()}
              title={tutorial.title}
              url={tutorial.url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
