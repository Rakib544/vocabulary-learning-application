import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import TutorialSection from "@/sections/tutorial-section";
import { getServerSession } from "next-auth";

type Tutorials = {
  id: string;
  title: string;
  url: string;
};

async function getTutorials(accessToken?: string): Promise<Tutorials[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/tutorials`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = await response.json();
  return result.data;
}

export default async function TutorialsPage() {
  const session = await getServerSession(authOptions);
  const tutorials = await getTutorials(session?.user.accessToken);
  return (
    <main>
      <Container>
        {tutorials.length > 0 ? (
          <TutorialSection tutorials={tutorials} />
        ) : (
          <div className="h-96 flex justify-center items-center">
            No tutorials available
          </div>
        )}
      </Container>
    </main>
  );
}
