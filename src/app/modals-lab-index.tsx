"use client";

import { useRef, useState, type ComponentType, type RefObject } from "react";
import { CeilingGklAcrylProductModal } from "@/app/ceiling-gkl-acryl-product-modal";
import { CeilingGklPvcProductModal } from "@/app/ceiling-gkl-pvc-product-modal";
import { CeilingSmlAcrylProductModal } from "@/app/ceiling-sml-acryl-product-modal";
import { CeilingSmlPvcProductModal } from "@/app/ceiling-sml-pvc-product-modal";
import { CloudBProductModal } from "@/app/cloud-b-product-modal";
import { CloudCProductModal } from "@/app/cloud-c-product-modal";
import { CloudIProductModal } from "@/app/cloud-i-product-modal";
import { CloudWProductModal } from "@/app/cloud-w-product-modal";
import { CrystalBaseWnlProductModal } from "@/app/crystal-base-wnl-product-modal";
import { HiddenAluminumBaseboardProductModal } from "@/app/hidden-aluminum-baseboard-product-modal";
import { InvisibleBasicProductModal } from "@/app/invisible-basic-product-modal";
import { InvisibleBasicReverseProductModal } from "@/app/invisible-basic-reverse-product-modal";
import { InvisibleCleanProductModal } from "@/app/invisible-clean-product-modal";
import { LumenLineProductModal } from "@/app/lumen-line-product-modal";
import { MountingProfilesProductModal } from "@/app/mounting-profiles-product-modal";
import { RadiatorScreenBoxProductModal } from "@/app/radiator-screen-box-product-modal";
import { RadiatorScreenOverlayProductModal } from "@/app/radiator-screen-overlay-product-modal";
import { RadiatorScreenSillProductModal } from "@/app/radiator-screen-sill-product-modal";
import { RadiusSolutionsProductModal } from "@/app/radius-solutions-product-modal";
import { Soundcore14ProductModal } from "@/app/soundcore-14-product-modal";
import { Soundcore25ProductModal } from "@/app/soundcore-25-product-modal";
import { StrongBaseWnlProductModal } from "@/app/strong-base-wnl-product-modal";
import { UrbanCProductModal } from "@/app/urban-c-product-modal";
import { UrbanWProductModal } from "@/app/urban-w-product-modal";
import { UfrPrintProductModal } from "@/app/ufr-print-product-modal";
import { useCatalogCompactLayout } from "@/app/use-catalog-compact-layout";
import { WallProProductModal } from "@/app/wallpro-product-modal";
import { WinisolProductModal } from "@/app/winisol-product-modal";
import { ceilingGklAcrylProductModal } from "@/data/ceiling-gkl-acryl-product-modal";
import { ceilingGklPvcProductModal } from "@/data/ceiling-gkl-pvc-product-modal";
import { ceilingSmlAcrylProductModal } from "@/data/ceiling-sml-acryl-product-modal";
import { ceilingSmlPvcProductModal } from "@/data/ceiling-sml-pvc-product-modal";
import { cloudBProductModal } from "@/data/cloud-b-product-modal";
import { cloudCProductModal } from "@/data/cloud-c-product-modal";
import { cloudIProductModal } from "@/data/cloud-i-product-modal";
import { cloudWProductModal } from "@/data/cloud-w-product-modal";
import { crystalBaseWnlProductModal } from "@/data/crystal-base-wnl-product-modal";
import { hiddenAluminumBaseboardProductModal } from "@/data/hidden-aluminum-baseboard-product-modal";
import { invisibleBasicProductModal } from "@/data/invisible-basic-product-modal";
import { invisibleBasicReverseProductModal } from "@/data/invisible-basic-reverse-product-modal";
import { invisibleCleanProductModal } from "@/data/invisible-clean-product-modal";
import { lumenLineProductModal } from "@/data/lumen-line-product-modal";
import { mountingProfilesProductModal } from "@/data/mounting-profiles-product-modal";
import { radiatorScreenBoxProductModal } from "@/data/radiator-screen-box-product-modal";
import { radiatorScreenOverlayProductModal } from "@/data/radiator-screen-overlay-product-modal";
import { radiatorScreenSillProductModal } from "@/data/radiator-screen-sill-product-modal";
import { radiusSolutionsProductModal } from "@/data/radius-solutions-product-modal";
import { soundcore14ProductModal } from "@/data/soundcore-14-product-modal";
import { soundcore25ProductModal } from "@/data/soundcore-25-product-modal";
import { strongBaseWnlProductModal } from "@/data/strong-base-wnl-product-modal";
import { ufrPrintProductModal } from "@/data/ufr-print-product-modal";
import { urbanCProductModal } from "@/data/urban-c-product-modal";
import { urbanWProductModal } from "@/data/urban-w-product-modal";
import { wallProProductModal } from "@/data/wallpro-product-modal";
import { winisolProductModal } from "@/data/winisol-product-modal";

type LabModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

type LabEntry = {
  mId: string;
  title: string;
  Modal: ComponentType<LabModalProps>;
};

const LAB_ENTRIES: LabEntry[] = [
  { mId: "M-01", title: cloudWProductModal.title, Modal: CloudWProductModal },
  { mId: "M-02", title: cloudCProductModal.title, Modal: CloudCProductModal },
  { mId: "M-03", title: cloudBProductModal.title, Modal: CloudBProductModal },
  { mId: "M-04", title: cloudIProductModal.title, Modal: CloudIProductModal },
  { mId: "M-05", title: soundcore14ProductModal.title, Modal: Soundcore14ProductModal },
  { mId: "M-06", title: soundcore25ProductModal.title, Modal: Soundcore25ProductModal },
  { mId: "M-07", title: urbanWProductModal.title, Modal: UrbanWProductModal },
  { mId: "M-08", title: urbanCProductModal.title, Modal: UrbanCProductModal },
  { mId: "M-09", title: wallProProductModal.title, Modal: WallProProductModal },
  { mId: "M-10", title: winisolProductModal.title, Modal: WinisolProductModal },
  { mId: "M-11", title: invisibleBasicProductModal.title, Modal: InvisibleBasicProductModal },
  { mId: "M-12", title: invisibleBasicReverseProductModal.title, Modal: InvisibleBasicReverseProductModal },
  { mId: "M-13", title: invisibleCleanProductModal.title, Modal: InvisibleCleanProductModal },
  { mId: "M-14", title: lumenLineProductModal.title, Modal: LumenLineProductModal },
  { mId: "M-15", title: mountingProfilesProductModal.title, Modal: MountingProfilesProductModal },
  { mId: "M-16", title: strongBaseWnlProductModal.title, Modal: StrongBaseWnlProductModal },
  { mId: "M-17", title: crystalBaseWnlProductModal.title, Modal: CrystalBaseWnlProductModal },
  { mId: "M-18", title: hiddenAluminumBaseboardProductModal.title, Modal: HiddenAluminumBaseboardProductModal },
  { mId: "M-19", title: radiatorScreenSillProductModal.title, Modal: RadiatorScreenSillProductModal },
  { mId: "M-20", title: radiatorScreenBoxProductModal.title, Modal: RadiatorScreenBoxProductModal },
  { mId: "M-21", title: radiatorScreenOverlayProductModal.title, Modal: RadiatorScreenOverlayProductModal },
  { mId: "M-22", title: ceilingSmlAcrylProductModal.title, Modal: CeilingSmlAcrylProductModal },
  { mId: "M-23", title: ceilingSmlPvcProductModal.title, Modal: CeilingSmlPvcProductModal },
  { mId: "M-24", title: ceilingGklAcrylProductModal.title, Modal: CeilingGklAcrylProductModal },
  { mId: "M-25", title: ceilingGklPvcProductModal.title, Modal: CeilingGklPvcProductModal },
  { mId: "M-26", title: radiusSolutionsProductModal.title, Modal: RadiusSolutionsProductModal },
  { mId: "M-27", title: ufrPrintProductModal.title, Modal: UfrPrintProductModal },
];

function ModalLabTrigger({ mId, title, Modal }: LabEntry) {
  const compact = useCatalogCompactLayout(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dealer-brand-decoration p-6">
      <p className="dealer-type-base-medium text-dealer-brand-primary">{mId}</p>
      <p className="dealer-type-h3 text-center text-dealer-text-primary">{title}</p>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center rounded-lg bg-dealer-brand-primary px-6 py-3 dealer-type-base-medium text-dealer-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary"
      >
        Открыть модалку
      </button>
      <Modal open={open} onClose={() => setOpen(false)} returnFocusRef={triggerRef} compact={compact} />
    </div>
  );
}

export function ModalsLabIndex() {
  return (
    <main className="flex min-h-dvh flex-col items-center gap-6 px-6 py-16">
      <p className="dealer-type-base-medium text-dealer-brand-primary">LAB</p>
      <h1 className="dealer-type-h1 text-center text-dealer-text-primary">WINAL™ — lab-модалки</h1>
      <p className="max-w-xl text-center dealer-type-base-medium text-dealer-text-secondary">
        Изолированная проверка модалок M-01…M-27. На лендинге и /catalog те же модалки открываются из карточек каталога.
      </p>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {LAB_ENTRIES.map((entry) => (
          <ModalLabTrigger key={entry.mId} {...entry} />
        ))}
      </div>
    </main>
  );
}
