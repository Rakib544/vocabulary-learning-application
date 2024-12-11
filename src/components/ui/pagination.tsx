"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Ellips } from "../icons";
import { Button } from "../ui/button";

export default function Pagination({
  totalItems,
  perPageItems,
}: {
  totalItems: number;
  perPageItems: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const totalPage = Math.ceil(totalItems / perPageItems);
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onSelect = (value: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete("page");
    } else {
      current.set("page", value.toString());
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const nextPage = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const nextPageNumber = currentPage + 1;
    current.set("page", nextPageNumber.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };
  const prevPage = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const prevPageNumber = currentPage - 1;
    current.set("page", prevPageNumber.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex max-w-xl items-center justify-center gap-x-2 py-4">
      {totalPage > 1 && (
        <>
          <Button
            className="h-10 w-10 rounded-full p-0 text-muted-foreground"
            variant="outline"
            onClick={prevPage}
            name="Previous page"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-10 w-10 rounded-full"
            variant={currentPage === 1 ? "default" : "ghost"}
            onClick={() => onSelect(1)}
          >
            1
          </Button>
          <Button
            className="h-10 w-10 rounded-full"
            variant={currentPage === 2 ? "default" : "ghost"}
            onClick={() => onSelect(2)}
          >
            2
          </Button>
          {totalPage > 3 && currentPage > 3 && (
            <Button
              name="middle pages"
              className="h-10 w-10 rounded-full p-0"
              variant="ghost"
            >
              <Ellips className="h-4 w-4" />
            </Button>
          )}
          {totalPage > 2 && currentPage > 2 && (
            <Button
              className="h-10 w-10 rounded-full p-0"
              variant="default"
              onClick={() => onSelect(currentPage)}
            >
              {currentPage}
            </Button>
          )}
          {totalPage > 3 &&
            currentPage + 1 !== totalPage &&
            currentPage < totalPage && (
              <Button className="h-10 w-10 rounded-full p-0" variant="ghost">
                <Ellips className="h-4 w-4" />
              </Button>
            )}
          {totalPage > 2 && currentPage < totalPage && (
            <Button
              className="h-10 w-10 rounded-full"
              variant={currentPage === totalPage ? "default" : "ghost"}
              onClick={() => onSelect(totalPage)}
            >
              {totalPage}
            </Button>
          )}
          <Button
            className="h-10 w-10 rounded-full p-0 text-muted-foreground"
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPage}
            name="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
