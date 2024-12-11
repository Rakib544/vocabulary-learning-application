import { Container } from "@/components/container";
import TutorialSection from "@/sections/tutorial-section";

const tutorials = [
  {
    id: 1,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 2,
    title: "Word Meaning - Part 1 | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 3,
    title: "Word Meaning - Part 2 | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 4,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 5,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 6,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 7,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
  {
    id: 8,
    title: "Number System (0-9) | Japanese Language in Bangla",
    url: "https://www.youtube.com/embed/12VQYnuIgrM?si=K98SkVMXMdebFNwG",
  },
];

export default async function TutorialsPage() {
  return (
    <main>
      <Container>
        <TutorialSection tutorials={tutorials} />
      </Container>
    </main>
  );
}
