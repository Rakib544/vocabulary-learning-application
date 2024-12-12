import { CirclePlus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardTutorialsPage() {
  return (
    <div>
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/dashboard/tutorials/add">
            Add New <CirclePlus className="h-[18px] w-[18px] ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
