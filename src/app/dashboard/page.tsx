import { Testimonial } from "@/components/testimonial";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "Manage Lessons",
    link: "/dashboard/lessons",
    description:
      "View, edit, and organize all lessons available in the system.",
  },
  {
    title: "Manage Tutorials",
    link: "/dashboard/tutorials",
    description:
      "Add, update, or remove embedded YouTube tutorials for learning.",
  },
  {
    title: "Manage Vocabularies",
    link: "/dashboard/vocabularies",
    description:
      "Oversee, update, and add vocabulary entries linked to lessons.",
  },
  {
    title: "Manage Users",
    link: "/dashboard/users",
    description: "Promote or demote users and manage their roles efficiently.",
  },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        Welcome back, Rakib!
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {quickLinks.map((link) => (
          <li key={link.link}>
            <Link
              href={link.link}
              className="grid h-full grid-cols-12 gap-x-2 custom-shadow p-5 rounded-lg border border-primary/5 group hover:border-primary/30 transition duration-300"
            >
              <div className="col-span-10">
                <h3 className="text-lg font-bold">{link.title}</h3>
                <p className="text-muted-foreground mt-1">{link.description}</p>
              </div>
              <div className="col-span-2 flex justify-end">
                <span className="size-10 rounded-full border border-primary/10 flex justify-center items-center group-hover:border-primary transition duration-300">
                  <ArrowRight className="-rotate-45 size-5 group-hover:text-primary transition duration-300" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="bg-primary/5 rounded-[40px] mt-20">
        <Testimonial
          author={{
            name: "Dr. Emily Carter",
            role: "Educator and Learning Strategist",
          }}
        >
          True education is not just about the transfer of knowledge but about
          inspiring curiosity and igniting a lifelong passion for learning. A
          well-structured lesson acts as the cornerstone of this journey, laying
          the groundwork for understanding and mastery in any field.
        </Testimonial>
      </div>
    </div>
  );
}
