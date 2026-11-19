import { asset } from "@/lib/asset";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { profileModalAction, profiles, type ProfileModalAction } from "@/data/profiles-product-modal";

const PROFILE_PREVIEWS = Object.fromEntries(
  profiles.map((profile) => [profileModalAction(profile.id), profile.cardImage]),
) as Record<ProfileModalAction, string>;

/**
 * Neighbor-nav thumbs use the modal gallery / hero full frame, never the
 * catalog card crop (asset(`/images/catalog/cards/*`), typically 640×1596).
 */
export const MODAL_NEIGHBOR_PREVIEW_BY_ACTION = {
  rythmwall_modal: asset("/images/product-modal/rythmwall/hero-interior.webp"),
  wisound_modal: asset("/images/product-modal/wisound/wisound-space.webp"),
  minwin_modal: asset("/images/product-modal/minwin/hero-board-corner.webp"),
  wall_sml_acryl_modal: asset("/images/product-modal/wall-sml-acryl/gallery/panel-akril-sml-sten-10.webp"),
  wall_gkl_acryl_modal:
    asset("/images/product-modal/wall-gkl-acryl/gallery/dekorativnie-sten-paneli-gipsokarton-okrashenni-2.webp"),
  wall_sml_hpl_modal: asset("/images/product-modal/wall-sml-hpl/gallery/sten-panel-sml-hpl-sk.webp"),
  wall_gsp_hpl_modal: asset("/images/product-modal/wall-gsp-hpl/gallery/sten-panel-winal-hpl-gsp.webp"),
  wall_sml_pvc_modal: asset("/images/product-modal/wall-sml-pvc/gallery/sten-panel-winal-sml-pvh-2.webp"),
  wall_gkl_pvc_modal: asset("/images/product-modal/wall-gkl-pvc/gallery/panel-gkl-pvh.webp"),
  wall_gsp_pvc_modal: asset("/images/product-modal/wall-gsp-pvc/gallery/panel-akril-gkl-gvlv-5.webp"),
  wall_sml_polymer_modal:
    asset("/images/product-modal/wall-polymer-shared/gallery/sten-panel-sml-winal-high-glow-premium-1.webp"),
  wall_gkl_polymer_modal:
    asset("/images/product-modal/wall-polymer-shared/gallery/sten-panel-sml-winal-high-glow-premium-1.webp"),
  slat_sml_acryl_modal: asset("/images/product-modal/slat-sml-acryl/gallery/paneli-reechnie-negoruchie-derevo-winal-1.webp"),
  slat_sml_pvc_modal: asset("/images/product-modal/slat-sml-pvc/gallery/paneli-reechnie-negoruchie-derevo-winal-2.webp"),
  slat_sml_hpl_modal: asset("/images/product-modal/slat-sml-hpl/gallery/paneli-reechnie-hpl-sml-alumini-lm1003.webp"),
  cloud_w_modal: asset("/images/product-modal/cloud-w/gallery-01.webp"),
  cloud_c_modal: asset("/images/product-modal/cloud-c/gallery-01.webp"),
  cloud_b_modal: asset("/images/product-modal/cloud-b/gallery-01.webp"),
  cloud_i_modal: asset("/images/product-modal/cloud-i/gallery-01.webp"),
  soundcore_14_modal: asset("/images/product-modal/soundcore-14/gallery-01.webp"),
  soundcore_25_modal: asset("/images/product-modal/soundcore-25/gallery-01.webp"),
  urban_w_modal: asset("/images/product-modal/urban-w/gallery-01.webp"),
  urban_c_modal: asset("/images/product-modal/urban-c/gallery-01.webp"),
  wallpro_modal: asset("/images/product-modal/wallpro/gallery-01.webp"),
  winisol_modal: asset("/images/product-modal/winisol/gallery-01.webp"),
  invisible_basic_modal: asset("/images/product-modal/invisible-basic/gallery-01.webp"),
  invisible_basic_reverse_modal: asset("/images/product-modal/invisible-basic-reverse/gallery-01.webp"),
  invisible_clean_modal: asset("/images/product-modal/invisible-clean/gallery-01.webp"),
  lumen_line_modal: asset("/images/product-modal/lumen-line/gallery-01.webp"),
  mounting_profiles_modal: asset("/images/product-modal/mounting-profiles/gallery-01.webp"),
  profiles_hub_modal: asset("/images/product-modal/profiles/card/open.webp"),
  ...PROFILE_PREVIEWS,
  strong_base_wnl_modal: asset("/images/product-modal/strong-base-wnl/gallery-node.webp"),
  crystal_base_wnl_modal: asset("/images/product-modal/crystal-base-wnl/gallery-01.webp"),
  hidden_aluminum_baseboard_modal: asset("/images/product-modal/hidden-aluminum-baseboard/gallery-node.webp"),
  mini_base_modal: asset("/images/product-modal/mini-base/gallery-node.webp"),
  radiator_screen_sill_modal: asset("/images/product-modal/radiator-screen-sill/gallery-01.webp"),
  radiator_screen_box_modal: asset("/images/product-modal/radiator-screen-box/gallery-01.webp"),
  radiator_screen_overlay_modal: asset("/images/product-modal/radiator-screen-overlay/gallery-01.webp"),
  ceiling_sml_acryl_modal: asset("/images/product-modal/ceiling-sml-acryl/gallery-01.webp"),
  ceiling_sml_pvc_modal: asset("/images/product-modal/ceiling-sml-pvc/gallery-01.webp"),
  ceiling_gkl_acryl_modal: asset("/images/product-modal/ceiling-gkl-acryl/gallery-01.webp"),
  ceiling_gkl_pvc_modal: asset("/images/product-modal/ceiling-gkl-pvc/gallery-01.webp"),
  radius_solutions_modal: asset("/images/product-modal/radius-solutions/gallery-01.webp"),
  ufr_print_modal: asset("/images/product-modal/ufr-print/winal-ufr-20261104-p12.webp"),
} as const satisfies Record<Exclude<DealerCatalogAction, "family_expand" | "disabled">, string>;

export function getModalNeighborPreview(action: DealerCatalogAction): string | undefined {
  if (action === "family_expand" || action === "disabled") {
    return undefined;
  }

  return MODAL_NEIGHBOR_PREVIEW_BY_ACTION[action];
}
