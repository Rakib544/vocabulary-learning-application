import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "USER",
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    role: "ADMIN",
  },
];

export default async function Students() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        Manage users
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
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto w-full overflow-x-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
