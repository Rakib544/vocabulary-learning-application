"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface TutorialInterface {
  id: number | string;
  title: string;
  url: string;
}

export default function TutorialSection({
  tutorials,
}: {
  tutorials: TutorialInterface[];
}) {
  const [currentTutorial, setCurrentTutorial] = useState(0);

  function handleCurrentTutorial(index: number) {
    setCurrentTutorial(index);
  }
  return (
    <div className="grid grid-cols-12 gap-8 mt-20">
      <div className="col-span-12 lg:col-span-8">
        <iframe
          className="aspect-video w-full"
          src={tutorials[currentTutorial].url}
          title={tutorials[currentTutorial].title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h2 className="mt-4 font-bold text-xl">
          {tutorials[currentTutorial].title}
        </h2>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <ScrollArea className="h-[600px]">
          <ul className="space-y-2">
            {tutorials.map((tutorial, index) => (
              <li
                key={tutorial.id}
                className={cn(
                  "rounded-lg p-4 border border-slate-100 group hover:bg-slate-100 transition duration-300",
                  currentTutorial === index
                    ? "bg-slate-100 border-primary/20"
                    : "bg-slate-50"
                )}
              >
                <button
                  className="block text-left w-full"
                  onClick={() => handleCurrentTutorial(index)}
                >
                  <p className="flex items-center justify-between gap-x-2">
                    <span className="flex-1 block">{tutorial.title}</span>
                    <span className="shrink-0">
                      <ArrowRight
                        className={cn(
                          " size-5 group-hover:text-primary transition duration-300",
                          currentTutorial === index
                            ? "text-primary"
                            : "text-slate-300"
                        )}
                      />
                    </span>
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
}
