"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { registerDealerProductModalOpener } from "@/app/dealer-product-modal-bridge";
import { DealerProductModalNavProvider, type DealerProductModalNavValue } from "@/app/dealer-product-modal-nav";
import { ProfileProductModal, ProfilesHubModal } from "@/app/profile-product-modals";
import { CrystalBaseWnlProductModal } from "@/app/crystal-base-wnl-product-modal";
import { MiniBaseProductModal } from "@/app/mini-base-product-modal";
import { StrongBaseWnlProductModal } from "@/app/strong-base-wnl-product-modal";
import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { PROFILE_IDS, PROFILES_HUB_ACTION, profileModalAction } from "@/data/profiles-product-modal";

/**
 * Модалки профилей (те же, что в каталоге главной) на техстранице монтажа.
 * На главной их открывает рельса каталога; здесь её нет, поэтому этот хост сам
 * регистрирует «открывалку» общего моста и держит, какая модалка открыта.
 * Листание стрелками — по той же последовательности, без анимации сдвига.
 */
export function TechProfileModals() {
  const [action, setAction] = useState<DealerCatalogAction | null>(null);
  const [sequence, setSequence] = useState<CatalogModalSequenceItem[]>([]);
  const [session, setSession] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerDealerProductModalOpener((next, trigger, seq) => {
      triggerRef.current = trigger;
      setSequence(seq ?? [{ id: next, action: next, title: "" }]);
      setSession((s) => s + 1);
      setAction(next);
    });
    return () => registerDealerProductModalOpener(null);
  }, []);

  const close = useCallback(() => setAction(null), []);
  const go = useCallback(
    (delta: number) => {
      setAction((cur) => {
        const i = sequence.findIndex((x) => x.action === cur);
        const n = i < 0 ? undefined : sequence[i + delta];
        return n ? n.action : cur;
      });
    },
    [sequence],
  );

  const nav = useMemo<DealerProductModalNavValue>(
    () => ({ currentAction: action, leavingDialogId: null, slideMotion: null, sequence, go }),
    [action, sequence, go],
  );

  return (
    <DealerProductModalNavProvider value={nav}>
      <ProfilesHubModal
        key={`hub-${session}`}
        open={action === PROFILES_HUB_ACTION}
        onClose={close}
        returnFocusRef={triggerRef}
      />
      {/* Плинтусы WINAL: «Подробнее» в точке «Виды плинтусов WINAL» */}
      <CrystalBaseWnlProductModal key={`crystal-${session}`} open={action === "crystal_base_wnl_modal"} onClose={close} returnFocusRef={triggerRef} />
      <StrongBaseWnlProductModal key={`strong-${session}`} open={action === "strong_base_wnl_modal"} onClose={close} returnFocusRef={triggerRef} />
      <MiniBaseProductModal key={`mini-${session}`} open={action === "mini_base_modal"} onClose={close} returnFocusRef={triggerRef} />
      {PROFILE_IDS.map((id) => (
        <ProfileProductModal
          key={`profile-${id}-${session}`}
          profileId={id}
          open={action === profileModalAction(id)}
          onClose={close}
          closeToHub={false}
          returnFocusRef={triggerRef}
        />
      ))}
    </DealerProductModalNavProvider>
  );
}
