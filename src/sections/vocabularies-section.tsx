"use client";

import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";

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
  const { width = 0, height = 0 } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  function pronounceWord(word: string) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP"; // Japanese
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (showConfetti) {
      timeoutId = setTimeout(() => {
        router.push("/lessons");
      }, 5000);
    }
    return () => (timeoutId ? clearTimeout(timeoutId) : undefined);
  }, [showConfetti, router]);

  if (vocabularies.length === 0) {
    return (
      <div className="h-72 bg-primary/5 rounded-2xl flex items-center justify-center mt-20">
        No vocabularies available
      </div>
    );
  }

  return (
    <>
      <div className="mt-20 p-20 rounded-2xl bg-primary/5 relative">
        {showConfetti ? (
          <div className="h-[300px] flex justify-center items-center">
            <p className="text-xl font-bold">
              Congratulations! 🎉 You&apos;ve successfully completed the lesson!
            </p>
          </div>
        ) : (
          <>
            <div className="absolute top-8 right-10">
              {currentItem + 1} of {vocabularies.length} vocabularies
            </div>
            <ul className="space-y-6">
              <li>
                <h3 className="text-primary font-bold border-b-2 border-primary inline-block mb-2">
                  Vocabulary word :
                </h3>
                <p className="text-black flex items-center gap-x-2">
                  {vocabularies[currentItem].word}{" "}
                  <button
                    onClick={() =>
                      pronounceWord(vocabularies[currentItem].pronunciation)
                    }
                    className="group"
                  >
                    <Volume2 className="text-gray-500 group-hover:text-black transition duration-300" />
                  </button>{" "}
                </p>
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
          </>
        )}
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
          <Button size="lg" onClick={() => setShowConfetti(true)}>
            Complete
          </Button>
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
      {showConfetti ? (
        <Confetti width={width - 100} height={height - 100} />
      ) : null}
    </>
  );
}
