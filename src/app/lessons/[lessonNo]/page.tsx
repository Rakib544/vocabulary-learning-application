import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import VocabulariesSection from "@/sections/vocabularies-section";

const vocabulary = {
  success: true,
  data: {
    title: "Introduction to Japanese Language",
    vocabularies: [
      {
        word: "こんにちは",
        pronunciation: "Konnichiwa",
        meaning: "Hello / Good afternoon",
        whenToSay: "Used as a general greeting during the day.",
        lessonId: 1,
      },
      {
        word: "ありがとう",
        pronunciation: "Arigatou",
        meaning: "Thank you",
        whenToSay: "Used to express gratitude.",
        lessonId: 1,
      },
      {
        word: "さようなら",
        pronunciation: "Sayounara",
        meaning: "Goodbye",
        whenToSay: "Used when parting with someone for a longer period.",
        lessonId: 1,
      },
      {
        word: "おはよう",
        pronunciation: "Ohayou",
        meaning: "Good morning",
        whenToSay: "Used in the morning as a greeting.",
        lessonId: 2,
      },
      {
        word: "すみません",
        pronunciation: "Sumimasen",
        meaning: "Excuse me / I'm sorry",
        whenToSay: "Used when apologizing or getting someone's attention.",
        lessonId: 2,
      },
      {
        word: "いただきます",
        pronunciation: "Itadakimasu",
        meaning: "Let's eat (before a meal)",
        whenToSay:
          "Said before eating a meal, expressing gratitude for the food.",
        lessonId: 3,
      },
      {
        word: "ごちそうさまでした",
        pronunciation: "Gochisousama deshita",
        meaning: "Thank you for the meal",
        whenToSay:
          "Said after finishing a meal to thank the person who prepared it.",
        lessonId: 3,
      },
      {
        word: "はい",
        pronunciation: "Hai",
        meaning: "Yes",
        whenToSay: "Used to express agreement or affirmation.",
        lessonId: 4,
      },
      {
        word: "いいえ",
        pronunciation: "Iie",
        meaning: "No",
        whenToSay: "Used to express disagreement or negation.",
        lessonId: 4,
      },
      {
        word: "わかりました",
        pronunciation: "Wakarimashita",
        meaning: "I understand",
        whenToSay: "Used to indicate that you understand something.",
        lessonId: 5,
      },
    ],
  },
};

export default async function LessonDetailsPage() {
  return (
    <main>
      <Container>
        <PageIntro pageTitle={vocabulary.data.title} />
        <VocabulariesSection vocabularies={vocabulary.data.vocabularies} />
      </Container>
    </main>
  );
}
