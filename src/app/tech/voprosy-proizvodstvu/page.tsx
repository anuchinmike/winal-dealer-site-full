import type { Metadata } from "next";
import { techQuestions } from "@/data/tech-voprosy-proizvodstvu";
import { TechAnswersForm } from "./tech-answers-form";

export const metadata: Metadata = {
  title: "Вопросы производству — монтажные профили WINAL",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <TechAnswersForm questions={techQuestions} />;
}
