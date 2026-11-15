"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import {
  UFR_PRINT_PRODUCT_MODAL_ID,
  ufrPrintModalAssets,
  ufrPrintProductModal,
  ufrPrintProjects,
  ufrPrintTypes,
} from "@/data/ufr-print-product-modal";
import styles from "./profile-modals.module.css";
import ufrStyles from "./ufr-print-product-modal.module.css";

type UfrPrintProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

function UfrPrintModalContent({ onContact }: { onContact: () => void }) {
  const [typeIndex, setTypeIndex] = useState(0);
  const printType = ufrPrintTypes[typeIndex];
  const cover = printType.photos[0];
  const go = (direction: number) => {
    setTypeIndex((index) => (index + direction + ufrPrintTypes.length) % ufrPrintTypes.length);
  };

  return (
    <div data-ufr-content className={styles.root}>
      <div className={styles.row1}>
        <div className={ufrStyles.gallery}>
          <div className={styles.media} data-ufr-print-type={printType.id}>
            {cover ? (
              <>
                <button
                  type="button"
                  className={ufrStyles.photo}
                  aria-label={`Смотреть фото — ${printType.label}`}
                  onClick={(event) => openCasePhotoGallery([...printType.photos], 0, event.currentTarget)}
                >
                  <Image src={cover.src} alt={cover.caption} fill unoptimized sizes="(max-width: 1100px) 100vw, 680px" className="object-cover" />
                </button>
                <span className={`${styles.mediaLabel} ${ufrStyles.zoomLabel}`}>Смотреть фото</span>
              </>
            ) : (
              <div className={ufrStyles.lettering} aria-label="Схематический пример надписей и навигации">
                <p className={styles.kicker}>Пример навигации</p>
                <p className={ufrStyles.roomNumber}>02</p>
                <p className={ufrStyles.roomName}>Переговорная</p>
                <div className={ufrStyles.wayfinding}>
                  <ChevronIcon direction="left" />
                  <span>Выход</span>
                </div>
                <p className={ufrStyles.letteringCaption}>Названия зон, номера помещений и указатели на панелях</p>
              </div>
            )}
            <button type="button" className={`${styles.glassArrow} ${styles.arrowLeft}`} aria-label="Предыдущий тип печати" onClick={() => go(-1)}>
              <ChevronIcon direction="left" />
            </button>
            <button type="button" className={`${styles.glassArrow} ${styles.arrowRight}`} aria-label="Следующий тип печати" onClick={() => go(1)}>
              <ChevronIcon direction="right" />
            </button>
            <div className={styles.pager} role="group" aria-label="Типы печати">
              {ufrPrintTypes.map((item, index) => (
                <button key={item.id} type="button" aria-pressed={index === typeIndex} onClick={() => setTypeIndex(index)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <p className={ufrStyles.caption} aria-live="polite">{printType.caption}</p>
        </div>

        <div className={`${styles.panel} ${styles.info}`}>
          <p className={styles.kicker}>{ufrPrintProductModal.categoryLabel}</p>
          <h2 className={styles.h1}>{ufrPrintProductModal.title}</h2>
          <p className={styles.lead}>{ufrPrintProductModal.description}</p>
          <div className={styles.feats}>
            {ufrPrintProductModal.features.map((feature) => (
              <div key={feature.title} className={styles.feat}>
                <div className={styles.chip70}>
                  <Image src={feature.icon} alt="" width={34} height={34} unoptimized />
                </div>
                <div>
                  <b>{feature.title}</b>
                  <span>{feature.description}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.ctas}>
            <Link href="/#project-form" onClick={onContact} className={`${styles.btn} ${styles.btnPrimary} ${ufrStyles.contact}`}>
              {ufrPrintProductModal.primaryCta}
              <Image src={ufrPrintModalAssets.arrow} alt="" width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className={`${styles.row2} ${ufrStyles.bottomRow}`}>
        <div data-ufr-profiles className={styles.panel}>
          <h3 className={styles.h2}>{ufrPrintProductModal.profiles.title}</h3>
          <p className={styles.sub}>{ufrPrintProductModal.profiles.text}</p>
          <p className={styles.sub}>{ufrPrintProductModal.profiles.note}</p>
          <div className={ufrStyles.surfaces}>
            <h4 className={styles.h4}>{ufrPrintProductModal.surfaces.title}</h4>
            <dl className={styles.specs}>
              {ufrPrintProductModal.surfaces.rows.map((row) => (
                <div key={row.name} className={styles.spec}>
                  <dt>{row.name}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div data-ufr-examples className={styles.panel}>
          <h3 className={styles.h2}>{ufrPrintProductModal.examples.title}</h3>
          <p className={styles.sub}>{ufrPrintProductModal.examples.caption}</p>
          <div className={styles.opts}>
            {ufrPrintProjects.map((item) => (
              <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" data-ufr-project={item.id} className={`${styles.opt} ${ufrStyles.caseCard}`}>
                <Image src={item.photos[0].src} alt="" width={76} height={76} unoptimized />
                <div>
                  <b>{item.title}</b>
                  <span>{item.description}</span>
                  <span className={ufrStyles.photoLink}>Читать кейс</span>
                </div>
                <span className={`${styles.optGo} ${ufrStyles.caseArrow}`}><ChevronIcon direction="right" /></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function UfrPrintProductModal({ open, onClose, returnFocusRef, compact = false }: UfrPrintProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={UFR_PRINT_PRODUCT_MODAL_ID}
      title={ufrPrintProductModal.title}
      closeIcon={ufrPrintModalAssets.closeIcon}
      compact={compact}
    >
      <UfrPrintModalContent onContact={onClose} />
    </DealerProductModalShell>
  );
}
