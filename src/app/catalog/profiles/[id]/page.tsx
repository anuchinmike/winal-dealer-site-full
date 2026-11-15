import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/app/site-chrome";
import { PROFILES_HUB_HREF, ProfilePageContent } from "@/app/profile-product-modals";
import { PROFILE_IDS, profilesById, profilesHub, type ProfileId } from "@/data/profiles-product-modal";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROFILE_IDS.map((id) => ({ id }));
}

function isProfileId(id: string): id is ProfileId {
  return (PROFILE_IDS as readonly string[]).includes(id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  if (!isProfileId(id)) return {};
  const profile = profilesById[id];
  return { title: `${profile.title} — ${profilesHub.title}`, description: profile.card };
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isProfileId(id)) notFound();
  const profile = profilesById[id];
  return (
    <InnerPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Каталог", href: "/#catalog-system" },
        { label: profilesHub.title, href: PROFILES_HUB_HREF },
        { label: profile.name },
      ]}
    >
      <ProfilePageContent profileId={id} />
    </InnerPage>
  );
}
