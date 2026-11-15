"use client";

import type { RefObject } from "react";
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
import { MiniBaseProductModal } from "@/app/mini-base-product-modal";
import { InvisibleBasicProductModal } from "@/app/invisible-basic-product-modal";
import { InvisibleBasicReverseProductModal } from "@/app/invisible-basic-reverse-product-modal";
import { InvisibleCleanProductModal } from "@/app/invisible-clean-product-modal";
import { LumenLineProductModal } from "@/app/lumen-line-product-modal";
import { MinWinProductModal } from "@/app/minwin-product-modal";
import { MountingProfilesProductModal } from "@/app/mounting-profiles-product-modal";
import { ProductModal } from "@/app/product-modal";
import { ProfileProductModal, ProfilesHubModal } from "@/app/profile-product-modals";
import { RadiatorScreenBoxProductModal } from "@/app/radiator-screen-box-product-modal";
import { RadiatorScreenOverlayProductModal } from "@/app/radiator-screen-overlay-product-modal";
import { RadiatorScreenSillProductModal } from "@/app/radiator-screen-sill-product-modal";
import { RadiusSolutionsProductModal } from "@/app/radius-solutions-product-modal";
import { SlatSmlAcrylProductModal } from "@/app/slat-sml-acryl-product-modal";
import { SlatSmlHplProductModal } from "@/app/slat-sml-hpl-product-modal";
import { SlatSmlPvcProductModal } from "@/app/slat-sml-pvc-product-modal";
import { Soundcore14ProductModal } from "@/app/soundcore-14-product-modal";
import { Soundcore25ProductModal } from "@/app/soundcore-25-product-modal";
import { StrongBaseWnlProductModal } from "@/app/strong-base-wnl-product-modal";
import { UfrPrintProductModal } from "@/app/ufr-print-product-modal";
import { UrbanCProductModal } from "@/app/urban-c-product-modal";
import { UrbanWProductModal } from "@/app/urban-w-product-modal";
import { WallGklAcrylProductModal } from "@/app/wall-gkl-acryl-product-modal";
import { WallGklPolymerProductModal } from "@/app/wall-gkl-polymer-product-modal";
import { WallGklPvcProductModal } from "@/app/wall-gkl-pvc-product-modal";
import { WallGspHplProductModal } from "@/app/wall-gsp-hpl-product-modal";
import { WallGspPvcProductModal } from "@/app/wall-gsp-pvc-product-modal";
import { WallProProductModal } from "@/app/wallpro-product-modal";
import { WallSmlAcrylProductModal } from "@/app/wall-sml-acryl-product-modal";
import { WallSmlHplProductModal } from "@/app/wall-sml-hpl-product-modal";
import { WallSmlPolymerProductModal } from "@/app/wall-sml-polymer-product-modal";
import { WallSmlPvcProductModal } from "@/app/wall-sml-pvc-product-modal";
import { WinisolProductModal } from "@/app/winisol-product-modal";
import { WisoundProductModal } from "@/app/wisound-product-modal";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { PROFILE_IDS, profileModalAction } from "@/data/profiles-product-modal";

type CatalogProductModalsProps = {
  modalSession: number;
  compact: boolean;
  returnFocusRef: RefObject<HTMLElement | null>;
  isProductModalOpen: (action: DealerCatalogAction) => boolean;
  onClose: () => void;
};

export function CatalogProductModals({
  modalSession,
  compact,
  returnFocusRef,
  isProductModalOpen,
  onClose,
}: CatalogProductModalsProps) {
  return (
    <>
      <ProductModal
        key={`rythmwall-${modalSession}`}
        open={isProductModalOpen("rythmwall_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WisoundProductModal
        key={`wisound-${modalSession}`}
        open={isProductModalOpen("wisound_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <MinWinProductModal
        key={`minwin-${modalSession}`}
        open={isProductModalOpen("minwin_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallSmlAcrylProductModal
        key={`wall-sml-acryl-${modalSession}`}
        open={isProductModalOpen("wall_sml_acryl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallGklAcrylProductModal
        key={`wall-gkl-acryl-${modalSession}`}
        open={isProductModalOpen("wall_gkl_acryl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallSmlHplProductModal
        key={`wall-sml-hpl-${modalSession}`}
        open={isProductModalOpen("wall_sml_hpl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallGspHplProductModal
        key={`wall-gsp-hpl-${modalSession}`}
        open={isProductModalOpen("wall_gsp_hpl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallSmlPvcProductModal
        key={`wall-sml-pvc-${modalSession}`}
        open={isProductModalOpen("wall_sml_pvc_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallGklPvcProductModal
        key={`wall-gkl-pvc-${modalSession}`}
        open={isProductModalOpen("wall_gkl_pvc_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallGspPvcProductModal
        key={`wall-gsp-pvc-${modalSession}`}
        open={isProductModalOpen("wall_gsp_pvc_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallSmlPolymerProductModal
        key={`wall-sml-polymer-${modalSession}`}
        open={isProductModalOpen("wall_sml_polymer_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallGklPolymerProductModal
        key={`wall-gkl-polymer-${modalSession}`}
        open={isProductModalOpen("wall_gkl_polymer_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <SlatSmlAcrylProductModal
        key={`slat-sml-acryl-${modalSession}`}
        open={isProductModalOpen("slat_sml_acryl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <SlatSmlPvcProductModal
        key={`slat-sml-pvc-${modalSession}`}
        open={isProductModalOpen("slat_sml_pvc_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <SlatSmlHplProductModal
        key={`slat-sml-hpl-${modalSession}`}
        open={isProductModalOpen("slat_sml_hpl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CloudWProductModal
        key={`cloud-w-${modalSession}`}
        open={isProductModalOpen("cloud_w_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CloudCProductModal
        key={`cloud-c-${modalSession}`}
        open={isProductModalOpen("cloud_c_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CloudBProductModal
        key={`cloud-b-${modalSession}`}
        open={isProductModalOpen("cloud_b_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CloudIProductModal
        key={`cloud-i-${modalSession}`}
        open={isProductModalOpen("cloud_i_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <Soundcore14ProductModal
        key={`soundcore-14-${modalSession}`}
        open={isProductModalOpen("soundcore_14_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <Soundcore25ProductModal
        key={`soundcore-25-${modalSession}`}
        open={isProductModalOpen("soundcore_25_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <UrbanWProductModal
        key={`urban-w-${modalSession}`}
        open={isProductModalOpen("urban_w_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <UrbanCProductModal
        key={`urban-c-${modalSession}`}
        open={isProductModalOpen("urban_c_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WallProProductModal
        key={`wallpro-${modalSession}`}
        open={isProductModalOpen("wallpro_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <WinisolProductModal
        key={`winisol-${modalSession}`}
        open={isProductModalOpen("winisol_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <InvisibleBasicProductModal
        key={`invisible-basic-${modalSession}`}
        open={isProductModalOpen("invisible_basic_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <InvisibleBasicReverseProductModal
        key={`invisible-basic-reverse-${modalSession}`}
        open={isProductModalOpen("invisible_basic_reverse_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <InvisibleCleanProductModal
        key={`invisible-clean-${modalSession}`}
        open={isProductModalOpen("invisible_clean_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <LumenLineProductModal
        key={`lumen-line-${modalSession}`}
        open={isProductModalOpen("lumen_line_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <MountingProfilesProductModal
        key={`mounting-profiles-${modalSession}`}
        open={isProductModalOpen("mounting_profiles_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <ProfilesHubModal
        key={`profiles-hub-${modalSession}`}
        open={isProductModalOpen("profiles_hub_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      {PROFILE_IDS.map((id) => (
        <ProfileProductModal
          key={`profile-${id}-${modalSession}`}
          profileId={id}
          open={isProductModalOpen(profileModalAction(id))}
          onClose={onClose}
          returnFocusRef={returnFocusRef}
          compact={compact}
        />
      ))}
      <StrongBaseWnlProductModal
        key={`strong-base-wnl-${modalSession}`}
        open={isProductModalOpen("strong_base_wnl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CrystalBaseWnlProductModal
        key={`crystal-base-wnl-${modalSession}`}
        open={isProductModalOpen("crystal_base_wnl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <HiddenAluminumBaseboardProductModal
        key={`hidden-aluminum-baseboard-${modalSession}`}
        open={isProductModalOpen("hidden_aluminum_baseboard_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <MiniBaseProductModal
        key={`mini-base-${modalSession}`}
        open={isProductModalOpen("mini_base_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <RadiatorScreenSillProductModal
        key={`radiator-screen-sill-${modalSession}`}
        open={isProductModalOpen("radiator_screen_sill_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <RadiatorScreenBoxProductModal
        key={`radiator-screen-box-${modalSession}`}
        open={isProductModalOpen("radiator_screen_box_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <RadiatorScreenOverlayProductModal
        key={`radiator-screen-overlay-${modalSession}`}
        open={isProductModalOpen("radiator_screen_overlay_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CeilingSmlAcrylProductModal
        key={`ceiling-sml-acryl-${modalSession}`}
        open={isProductModalOpen("ceiling_sml_acryl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CeilingSmlPvcProductModal
        key={`ceiling-sml-pvc-${modalSession}`}
        open={isProductModalOpen("ceiling_sml_pvc_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CeilingGklAcrylProductModal
        key={`ceiling-gkl-acryl-${modalSession}`}
        open={isProductModalOpen("ceiling_gkl_acryl_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <CeilingGklPvcProductModal
        key={`ceiling-gkl-pvc-${modalSession}`}
        open={isProductModalOpen("ceiling_gkl_pvc_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <RadiusSolutionsProductModal
        key={`radius-solutions-${modalSession}`}
        open={isProductModalOpen("radius_solutions_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
      <UfrPrintProductModal
        key={`ufr-print-${modalSession}`}
        open={isProductModalOpen("ufr_print_modal")}
        onClose={onClose}
        returnFocusRef={returnFocusRef}
        compact={compact}
      />
    </>
  );
}
