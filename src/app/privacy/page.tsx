import type { Metadata } from "next";
import { InnerPage } from "@/app/site-chrome";
import { LegalArticle, PrivacyPolicyText } from "@/app/legal-content";

const TITLE = "Политика обработки персональных данных";

export const metadata: Metadata = { title: TITLE };

export default function PrivacyPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Политика конфиденциальности" }]}>
      <LegalArticle title={TITLE}>
        <PrivacyPolicyText />
      </LegalArticle>
    </InnerPage>
  );
}
