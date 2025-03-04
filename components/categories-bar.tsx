"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoriesProps {
  data: Category[];
}

export const CategoriesBar = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id?: string) => {
    const query = { categoryId: categoryId !== id ? id : null };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <ScrollArea>
      <div className="space-x-2 flex py-2">
        <button
          onClick={() => onClick(undefined)}
          className={cn(
            "text-center text-xs md:text-[0.8rem] px-3 md:px-4 py-2 rounded-md bg-accent hover:opacity-75 transition flex-shrink-0",
            !categoryId && "bg-primary text-background font-medium"
          )}
        >
          All
        </button>

        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => onClick(item.id)}
            className={cn(
              "text-center text-xs md:text-sm px-3 md:px-4 py-2 rounded-md bg-accent hover:opacity-75 transition flex-shrink-0",
              item.id === categoryId && "bg-primary text-background font-medium"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <ScrollBar orientation="horizontal" className="cursor-grab" />
    </ScrollArea>
  );
};
