import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { PROFILE_IDS, PROFILES_HUB_DIALOG_ID, profileDialogId, profileModalAction } from "@/data/profiles-product-modal";
import { CEILING_GKL_ACRYL_PRODUCT_MODAL_ID } from "@/data/ceiling-gkl-acryl-product-modal";
import { CEILING_GKL_PVC_PRODUCT_MODAL_ID } from "@/data/ceiling-gkl-pvc-product-modal";
import { CEILING_SML_ACRYL_PRODUCT_MODAL_ID } from "@/data/ceiling-sml-acryl-product-modal";
import { CEILING_SML_PVC_PRODUCT_MODAL_ID } from "@/data/ceiling-sml-pvc-product-modal";
import { CLOUD_B_PRODUCT_MODAL_ID } from "@/data/cloud-b-product-modal";
import { CLOUD_C_PRODUCT_MODAL_ID } from "@/data/cloud-c-product-modal";
import { CLOUD_I_PRODUCT_MODAL_ID } from "@/data/cloud-i-product-modal";
import { CLOUD_W_PRODUCT_MODAL_ID } from "@/data/cloud-w-product-modal";
import { CRYSTAL_BASE_WNL_PRODUCT_MODAL_ID } from "@/data/crystal-base-wnl-product-modal";
import { HIDDEN_ALUMINUM_BASEBOARD_PRODUCT_MODAL_ID } from "@/data/hidden-aluminum-baseboard-product-modal";
import { MINI_BASE_PRODUCT_MODAL_ID } from "@/data/mini-base-product-modal";
import { INVISIBLE_BASIC_PRODUCT_MODAL_ID } from "@/data/invisible-basic-product-modal";
import { INVISIBLE_BASIC_REVERSE_PRODUCT_MODAL_ID } from "@/data/invisible-basic-reverse-product-modal";
import { INVISIBLE_CLEAN_PRODUCT_MODAL_ID } from "@/data/invisible-clean-product-modal";
import { LUMEN_LINE_PRODUCT_MODAL_ID } from "@/data/lumen-line-product-modal";
import { MINWIN_PRODUCT_MODAL_ID } from "@/data/minwin-product-modal";
import { MOUNTING_PROFILES_PRODUCT_MODAL_ID } from "@/data/mounting-profiles-product-modal";
import { RADIATOR_SCREEN_BOX_PRODUCT_MODAL_ID } from "@/data/radiator-screen-box-product-modal";
import { RADIATOR_SCREEN_OVERLAY_PRODUCT_MODAL_ID } from "@/data/radiator-screen-overlay-product-modal";
import { RADIATOR_SCREEN_SILL_PRODUCT_MODAL_ID } from "@/data/radiator-screen-sill-product-modal";
import { RADIUS_SOLUTIONS_PRODUCT_MODAL_ID } from "@/data/radius-solutions-product-modal";
import { RYTHMWALL_PRODUCT_MODAL_ID } from "@/data/rythmwall-product-modal";
import { SLAT_SML_ACRYL_PRODUCT_MODAL_ID } from "@/data/slat-sml-acryl-product-modal";
import { SLAT_SML_HPL_PRODUCT_MODAL_ID } from "@/data/slat-sml-hpl-product-modal";
import { SLAT_SML_PVC_PRODUCT_MODAL_ID } from "@/data/slat-sml-pvc-product-modal";
import { SOUNDCORE_14_PRODUCT_MODAL_ID } from "@/data/soundcore-14-product-modal";
import { SOUNDCORE_25_PRODUCT_MODAL_ID } from "@/data/soundcore-25-product-modal";
import { STRONG_BASE_WNL_PRODUCT_MODAL_ID } from "@/data/strong-base-wnl-product-modal";
import { UFR_PRINT_PRODUCT_MODAL_ID } from "@/data/ufr-print-product-modal";
import { URBAN_C_PRODUCT_MODAL_ID } from "@/data/urban-c-product-modal";
import { URBAN_W_PRODUCT_MODAL_ID } from "@/data/urban-w-product-modal";
import { WALL_GKL_ACRYL_PRODUCT_MODAL_ID } from "@/data/wall-gkl-acryl-product-modal";
import { WALL_GKL_POLYMER_PRODUCT_MODAL_ID } from "@/data/wall-gkl-polymer-product-modal";
import { WALL_GKL_PVC_PRODUCT_MODAL_ID } from "@/data/wall-gkl-pvc-product-modal";
import { WALL_GSP_HPL_PRODUCT_MODAL_ID } from "@/data/wall-gsp-hpl-product-modal";
import { WALL_GSP_PVC_PRODUCT_MODAL_ID } from "@/data/wall-gsp-pvc-product-modal";
import { WALL_SML_ACRYL_PRODUCT_MODAL_ID } from "@/data/wall-sml-acryl-product-modal";
import { WALL_SML_HPL_PRODUCT_MODAL_ID } from "@/data/wall-sml-hpl-product-modal";
import { WALL_SML_POLYMER_PRODUCT_MODAL_ID } from "@/data/wall-sml-polymer-product-modal";
import { WALL_SML_PVC_PRODUCT_MODAL_ID } from "@/data/wall-sml-pvc-product-modal";
import { WALLPRO_PRODUCT_MODAL_ID } from "@/data/wallpro-product-modal";
import { WINISOL_PRODUCT_MODAL_ID } from "@/data/winisol-product-modal";
import { WISOUND_PRODUCT_MODAL_ID } from "@/data/wisound-product-modal";

export const CATALOG_MODAL_DIALOG_ID: Partial<Record<DealerCatalogAction, string>> = {
  rythmwall_modal: RYTHMWALL_PRODUCT_MODAL_ID,
  wisound_modal: WISOUND_PRODUCT_MODAL_ID,
  minwin_modal: MINWIN_PRODUCT_MODAL_ID,
  wall_sml_acryl_modal: WALL_SML_ACRYL_PRODUCT_MODAL_ID,
  wall_gkl_acryl_modal: WALL_GKL_ACRYL_PRODUCT_MODAL_ID,
  wall_sml_hpl_modal: WALL_SML_HPL_PRODUCT_MODAL_ID,
  wall_gsp_hpl_modal: WALL_GSP_HPL_PRODUCT_MODAL_ID,
  wall_sml_pvc_modal: WALL_SML_PVC_PRODUCT_MODAL_ID,
  wall_gkl_pvc_modal: WALL_GKL_PVC_PRODUCT_MODAL_ID,
  wall_gsp_pvc_modal: WALL_GSP_PVC_PRODUCT_MODAL_ID,
  wall_sml_polymer_modal: WALL_SML_POLYMER_PRODUCT_MODAL_ID,
  wall_gkl_polymer_modal: WALL_GKL_POLYMER_PRODUCT_MODAL_ID,
  slat_sml_acryl_modal: SLAT_SML_ACRYL_PRODUCT_MODAL_ID,
  slat_sml_pvc_modal: SLAT_SML_PVC_PRODUCT_MODAL_ID,
  slat_sml_hpl_modal: SLAT_SML_HPL_PRODUCT_MODAL_ID,
  cloud_w_modal: CLOUD_W_PRODUCT_MODAL_ID,
  cloud_c_modal: CLOUD_C_PRODUCT_MODAL_ID,
  cloud_b_modal: CLOUD_B_PRODUCT_MODAL_ID,
  cloud_i_modal: CLOUD_I_PRODUCT_MODAL_ID,
  soundcore_14_modal: SOUNDCORE_14_PRODUCT_MODAL_ID,
  soundcore_25_modal: SOUNDCORE_25_PRODUCT_MODAL_ID,
  urban_w_modal: URBAN_W_PRODUCT_MODAL_ID,
  urban_c_modal: URBAN_C_PRODUCT_MODAL_ID,
  wallpro_modal: WALLPRO_PRODUCT_MODAL_ID,
  winisol_modal: WINISOL_PRODUCT_MODAL_ID,
  invisible_basic_modal: INVISIBLE_BASIC_PRODUCT_MODAL_ID,
  invisible_basic_reverse_modal: INVISIBLE_BASIC_REVERSE_PRODUCT_MODAL_ID,
  invisible_clean_modal: INVISIBLE_CLEAN_PRODUCT_MODAL_ID,
  lumen_line_modal: LUMEN_LINE_PRODUCT_MODAL_ID,
  mounting_profiles_modal: MOUNTING_PROFILES_PRODUCT_MODAL_ID,
  profiles_hub_modal: PROFILES_HUB_DIALOG_ID,
  ...Object.fromEntries(PROFILE_IDS.map((id) => [profileModalAction(id), profileDialogId(id)])),
  strong_base_wnl_modal: STRONG_BASE_WNL_PRODUCT_MODAL_ID,
  crystal_base_wnl_modal: CRYSTAL_BASE_WNL_PRODUCT_MODAL_ID,
  hidden_aluminum_baseboard_modal: HIDDEN_ALUMINUM_BASEBOARD_PRODUCT_MODAL_ID,
  mini_base_modal: MINI_BASE_PRODUCT_MODAL_ID,
  radiator_screen_sill_modal: RADIATOR_SCREEN_SILL_PRODUCT_MODAL_ID,
  radiator_screen_box_modal: RADIATOR_SCREEN_BOX_PRODUCT_MODAL_ID,
  radiator_screen_overlay_modal: RADIATOR_SCREEN_OVERLAY_PRODUCT_MODAL_ID,
  ceiling_sml_acryl_modal: CEILING_SML_ACRYL_PRODUCT_MODAL_ID,
  ceiling_sml_pvc_modal: CEILING_SML_PVC_PRODUCT_MODAL_ID,
  ceiling_gkl_acryl_modal: CEILING_GKL_ACRYL_PRODUCT_MODAL_ID,
  ceiling_gkl_pvc_modal: CEILING_GKL_PVC_PRODUCT_MODAL_ID,
  radius_solutions_modal: RADIUS_SOLUTIONS_PRODUCT_MODAL_ID,
  ufr_print_modal: UFR_PRINT_PRODUCT_MODAL_ID,
};
