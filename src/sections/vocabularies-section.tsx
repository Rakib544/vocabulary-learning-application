"use client";

import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/lib/framer-motion";
import { AnimatePresence } from "framer-motion";
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
  const [direction, setDirection] = useState<number>(1);
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
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-end -mb-12">
        {currentItem + 1} of {vocabularies.length} vocabularies
      </div>
      <div className="mt-20 p-6 md:12 lg:p-20 rounded-2xl bg-primary/5 relative overflow-x-hidden">
        <AnimatePresence>
          {showConfetti ? (
            <MotionDiv
              initial={{ opacity: 0, y: -32, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
              className="h-[300px] flex justify-center items-center"
            >
              <p className="text-xl font-bold">
                Congratulations! 🎉 You&apos;ve successfully completed the
                lesson!
              </p>
            </MotionDiv>
          ) : (
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <MotionDiv
                key={currentItem}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.5, type: "spring", bounce: 0 }}
              >
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
              </MotionDiv>
            </AnimatePresence>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-10 flex justify-end gap-x-2">
        <Button
          disabled={currentItem == 0}
          onClick={() => {
            setCurrentItem((prev) => prev - 1);
            setDirection(-1);
          }}
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
            onClick={() => {
              setCurrentItem((prev) => prev + 1);
              setDirection(1);
            }}
            size="lg"
          >
            Next
          </Button>
        )}
      </div>
      {showConfetti ? (
        <Confetti width={width - 100} height={height - 100} />
      ) : null}
    </MotionDiv>
  );
}

const variants = {
  initial: (direction: number) => {
    return { x: `${110 * direction}%`, opacity: 0 };
  },
  animate: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-110 * direction}%`, opacity: 0 };
  },
};
