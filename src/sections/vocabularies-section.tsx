"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VocabulariesInterface {
  word: string;
  pronunciation: string;
  whenToSay: string;
  meaning: string;
}

export default function VocabulariesSection({
  vocabularies,
}: {
  vocabularies: VocabulariesInterface[];
}) {
  const [currentItem, setCurrentItem] = useState(0);
  return (
    <>
      <div className="mt-20 p-20 rounded-2xl bg-primary/5 relative">
        <div className="absolute top-8 right-10">
          {currentItem + 1} of {vocabularies.length} vocabularies
        </div>
        <ul className="space-y-6">
          <li>
            <h3 className="text-primary font-bold border-b-2 border-primary inline-block mb-2">
              Vocabulary word :
            </h3>
            <p className="text-black">{vocabularies[currentItem].word}</p>
          </li>
          <li>
            <h3 className="text-primary font-bold border-b-2 border-primary inline-block mb-2">
              Pronunciation :
            </h3>
            <p>{vocabularies[currentItem].pronunciation}</p>
          </li>
          <li>
            <h3 className="text-primary font-bold border-b-2 border-primary inline-block mb-2">
              Meaning :
            </h3>
            <p>{vocabularies[currentItem].meaning}</p>
          </li>
          <li>
            <h3 className="text-primary font-bold border-b-2 border-primary inline-block mb-2">
              When to say :
            </h3>
            <p>{vocabularies[currentItem].whenToSay}</p>
          </li>
        </ul>
      </div>
      <div className="mt-10 flex justify-end gap-x-2">
        <Button
          disabled={currentItem == 0}
          onClick={() => setCurrentItem((prev) => prev - 1)}
          variant="secondary"
          size="lg"
        >
          Previous
        </Button>
        {currentItem === vocabularies.length - 1 ? (
          <Button size="lg">Complete</Button>
        ) : (
          <Button
            disabled={currentItem === vocabularies.length - 1}
            onClick={() => setCurrentItem((prev) => prev + 1)}
            size="lg"
          >
            Next
          </Button>
        )}
      </div>
    </>
  );
}
