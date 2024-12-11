import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import teamImage1 from "@/images/team/team-1.jpeg";
import teamImage2 from "@/images/team/team-2.jpeg";
import Link from "next/link";
import { Team, columns } from "./columns";
import { DataTable } from "./data-table";

const users: Team[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      image: teamImage1,
    },
    phone: "+1234567890",
    status: "active",
    email: "john@example.com",
    country: "United States",
  },
  {
    id: "2",
    user: {
      name: "Alice Smith",
      image: teamImage2,
    },
    phone: "+9876543210",
    status: "suspended",
    email: "alice@example.com",
    country: "Canada",
  },
];

export default async function Students() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        Manage team members
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
              <Link href="/dashboard/teams">Teams</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto w-full overflow-x-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
