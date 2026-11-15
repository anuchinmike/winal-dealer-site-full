import type { Metadata } from "next";
import { InnerPage } from "@/app/site-chrome";
import { ProfilesHubPageContent } from "@/app/profile-product-modals";
import { profilesHub } from "@/data/profiles-product-modal";

export const metadata: Metadata = {
  title: `${profilesHub.title} — каталог профилей`,
  description: profilesHub.description,
};

export default function ProfilesHubPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Каталог", href: "/catalog" }, { label: profilesHub.title }]}>
      <ProfilesHubPageContent />
    </InnerPage>
  );
}
