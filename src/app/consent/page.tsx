import type { Metadata } from "next";
import { InnerPage } from "@/app/site-chrome";
import { ConsentText, LegalArticle } from "@/app/legal-content";

const TITLE = "Согласие на обработку персональных данных";

export const metadata: Metadata = { title: TITLE };

export default function ConsentPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Согласие на обработку данных" }]}>
      <LegalArticle title={TITLE}>
        <ConsentText />
      </LegalArticle>
    </InnerPage>
  );
}
