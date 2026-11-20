import { asset } from "@/lib/asset";
import { dealerConfig } from "@/lib/dealer-config";
import { CatalogSection } from "@/app/catalog-section";
import { HomeScrollExperience } from "@/app/home-scroll-experience";
import { CasesSection } from "@/app/cases-section";
import { ProjectFormSection } from "@/app/project-form-section";
import { MontazhSection } from "@/app/montazh-section";
import { ComplexApproachInterior } from "@/app/complex-approach-a/interior-section";
import { FooterSection } from "@/app/site-footer";

const IMAGES = asset("/images/home");

const assets = {
  headerLogo: `${IMAGES}/header-logo.svg`,
  headerLogoGlass: `${IMAGES}/decor-glass-logo.webp`,
  heroVideoSrc: asset(`/video/winal-short-nosub.mp4`),
  heroVideoPoster: `${IMAGES}/hero-video-poster.webp`,
  heroLiquidIcon: `${IMAGES}/video-play-icon.svg`,
  heroCornerMark: `${IMAGES}/hero-corner-winal-mark.svg`,
  pageBackgroundGlass: `${IMAGES}/decor-w-left.webp`,
  arrowWhite: `${IMAGES}/arrow-white.svg`,
  arrowBlue: `${IMAGES}/arrow-blue.svg`,
  surfaceMainImage: `${IMAGES}/surface-main-image.webp`,
  surfaceMainMask: `${IMAGES}/surface-main-mask.svg`,
  featureIconMaterials: `${IMAGES}/feature-icon-materials.svg`,
  featureIconAcoustic: `${IMAGES}/feature-icon-acoustic.svg`,
  featureIconSupport: `${IMAGES}/feature-icon-support.svg`,
  featureCardJoints: `${IMAGES}/feature-card-joints.webp`,
  featureCardAcoustic: `${IMAGES}/feature-card-acoustic.webp`,
  featureCardGeometry: `${IMAGES}/feature-card-geometry.webp`,
  featureCardSurface: `${IMAGES}/feature-card-surface.webp`,
  cardIconJoints: `${IMAGES}/card-icon-joints.svg`,
  cardIconAcoustic: `${IMAGES}/card-icon-acoustic.svg`,
  cardIconGeometry: `${IMAGES}/card-icon-geometry.svg`,
  cardIconSurface: `${IMAGES}/card-icon-surface.svg`,
  paintBrush: `${IMAGES}/paint-brush.svg`,
  designCardUfr: `${IMAGES}/design-card-ufr.webp`,
  designCardRal: `${IMAGES}/design-card-ral.webp`,
  designCardVeneer: `${IMAGES}/design-card-veneer.webp`,
  designCardPatterns: `${IMAGES}/design-card-patterns.webp`,
  smallCardIcon: `${IMAGES}/small-card-icon.svg`,
  footerLogo: `${IMAGES}/footer-logo.svg`,
  contactUser: `${IMAGES}/contact-user.svg`,
  contactPhone: `${IMAGES}/contact-phone.svg`,
  contactEmail: `${IMAGES}/contact-email.svg`,
  socialTelegram: `${IMAGES}/social-telegram.svg`,
  socialWhatsapp: `${IMAGES}/social-whatsapp.svg`,
  socialChat: `${IMAGES}/social-chat.svg`,
} as const;

const heroAssets = {
  headerLogo: `${IMAGES}/header-logo.svg`,
  headerLogoGlass: `${IMAGES}/decor-glass-logo.webp`,
  heroVideoSrc: asset(`/video/winal-short-nosub.mp4`),
  heroVideoPoster: `${IMAGES}/hero-video-poster.webp`,
  heroVideoStill: `${IMAGES}/hero-video-still.webp`,
  heroLiquidIcon: `${IMAGES}/video-play-icon.svg`,
  heroCornerMark: `${IMAGES}/hero-corner-winal-mark.svg`,
  pageBackgroundGlass: `${IMAGES}/decor-w-left.webp`,
};

function PrimaryButton({
  label,
  width,
  showArrow = true,
  href,
}: {
  label: string;
  width?: number;
  showArrow?: boolean;
  href?: string;
}) {
  const className = "dealer-btn-primary inline-flex min-w-40 items-center justify-center rounded px-12 py-3";
  const style = {
    width: width ? `${width}px` : undefined,
    background: "var(--dealer-color-brand-primary)",
    boxShadow: "none",
  } as const;
  const inner = (
    <span className="inline-flex items-center gap-2">
      <span className="text-xs font-semibold leading-normal text-dealer-brand-white whitespace-nowrap">
        {label}
      </span>
      {showArrow ? (
        <img src={assets.arrowWhite} alt="" width={12} height={10} className="h-[10px] w-3" />
      ) : null}
    </span>
  );

  if (href) {
    return (
      <a href={href} className={className} style={style}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={className} style={style}>
      {inner}
    </button>
  );
}

function OutlineButton({
  label,
  width,
  showArrow = true,
  href,
}: {
  label: string;
  width?: number;
  showArrow?: boolean;
  href?: string;
}) {
  const className = "dealer-btn-outline inline-flex min-w-40 items-center justify-center rounded border border-dealer-brand-primary px-12 py-3";
  const style = { width: width ? `${width}px` : undefined };
  const inner = (
    <span className="inline-flex items-center gap-2">
      <span className="text-xs font-semibold leading-normal text-dealer-brand-primary whitespace-nowrap">
        {label}
      </span>
      {showArrow ? (
        <img src={assets.arrowBlue} alt="" width={12} height={10} className="h-[10px] w-3" />
      ) : null}
    </span>
  );

  if (href) {
    return (
      <a href={href} className={className} style={style}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={className} style={style}>
      {inner}
    </button>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-344 max-w-full ${className}`}>{children}</div>;
}

type FeatureOverlayCardProps = {
  left: number;
  top: number;
  image: string;
  icon: string;
  title: string;
  description: string;
  imageStyle?: React.CSSProperties;
  scrim?: boolean;
};

function FeatureOverlayCard({
  left,
  top,
  image,
  icon,
  title,
  description,
  imageStyle,
  scrim = false,
}: FeatureOverlayCardProps) {
  return (
    <div
      className="dealer-surface-feature-card absolute flex h-50 w-75 items-center overflow-hidden rounded-lg p-2 backdrop-blur-[10px]"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        background: "var(--dealer-surface-glass-linear)",
        boxShadow: "var(--dealer-shadow-glass)",
      }}
    >
      <div className="dealer-surface-feature-inner relative flex h-full w-full flex-col items-end justify-between overflow-hidden rounded-lg p-3">
        <img src={image} alt="" loading="lazy" decoding="async" className="dealer-surface-feature-img absolute inset-0 size-full rounded-lg object-cover" style={imageStyle} />
        {scrim ? (
          <div
            className="dealer-surface-feature-scrim absolute inset-0 rounded-lg"
            style={{ background: "var(--dealer-surface-image-scrim-soft)" }}
          />
        ) : null}
        <div
          className="dealer-surface-feature-icon relative flex items-center rounded p-[6px] backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-icon-float)" }}
        >
          <img src={icon} alt="" width={20} height={20} className="size-5" />
        </div>
        <div className="dealer-surface-feature-text relative flex w-full flex-col items-end gap-[10px] py-3">
          <h4 className="dealer-text-trim text-right text-base font-semibold leading-[0.85] text-dealer-brand-white whitespace-pre-line">
            {title}
          </h4>
          <p className="w-[154px] text-right text-xs font-normal leading-normal text-dealer-brand-white">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function SurfaceSection() {
  return (
    <section
      data-header-density-trigger
      className="dealer-surface-section dealer-section-glass relative flex h-234 w-368 max-w-full flex-col items-center justify-center rounded-lg p-12"
    >
      <Container className="dealer-surface-container relative h-210">
        <div className="dealer-surface-row flex h-210 w-344 items-start overflow-hidden">
          <div className="dealer-surface-text-col flex h-full w-129 flex-col items-start justify-center gap-12 pt-16">
            <p className="dealer-text-trim w-full text-base font-semibold uppercase leading-none text-dealer-brand-primary">
              внутренняя отделка объектов
            </p>
            <h2 className="dealer-surface-h2 dealer-text-trim w-full text-[64px] font-semibold leading-none text-dealer-text-primary">
              Стены, потолки и акустика для современных пространств
            </h2>
            <div className="dealer-surface-copy flex w-[439px] flex-col items-start gap-5">
              <p className="w-full text-base font-medium leading-normal text-dealer-text-secondary">
                Внутренняя отделка работает на первое впечатление не меньше, чем планировка или свет. Чистая геометрия,
                фактура, цвет, акустика и аккуратные узлы делают объект собранным, современным и профессиональным.
              </p>
              <p className="w-full text-base font-medium leading-normal text-dealer-text-secondary">
                Панели WINAL применяют там, где поверхность должна быть не случайным фоном, а частью архитектурного
                решения: в холлах, переговорных, офисах, образовательных, медицинских, спортивных и коммерческих
                пространствах.
              </p>
            </div>
            <div className="dealer-surface-cta-row flex items-start gap-6">
              <PrimaryButton label="Обсудить проект" width={217} href="#project-form" />
              <OutlineButton label="Выполненные проекты" width={251} href={asset("/projects")} />
            </div>
            <div className="dealer-surface-stats-row flex h-[91px] w-full items-center gap-2 overflow-hidden">
              {[
                { icon: assets.featureIconMaterials, lines: ["Долговечные", "материалы"] },
                { icon: assets.featureIconAcoustic, lines: ["Акустический", "комфорт"] },
                { icon: assets.featureIconSupport, lines: ["Техническая", "поддержка"] },
              ].map((item) => (
                <div key={item.lines.join("-")} className="dealer-surface-stat flex flex-1 items-center gap-[10px] py-2">
                  <div className="flex size-8 shrink-0 items-center justify-center px-[6px] py-2">
                    <img src={item.icon} alt="" width={24} height={24} className="max-h-6 max-w-6" />
                  </div>
                  <div className="dealer-surface-stat-copy dealer-text-trim text-base font-medium leading-none text-dealer-text-description">
                    <span>{item.lines[0]}</span>
                    <span>{item.lines[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dealer-surface-image-col relative h-210 w-215">
            <div
              className="dealer-surface-image-mask absolute -left-48 top-px h-[839px] w-[1262px]"
              style={{
                WebkitMaskImage: `url(${assets.surfaceMainMask})`,
                maskImage: `url(${assets.surfaceMainMask})`,
                WebkitMaskSize: "808.5px 839px",
                maskSize: "808.5px 839px",
                WebkitMaskPosition: "243.5px 0px",
                maskPosition: "243.5px 0px",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <img src={assets.surfaceMainImage} alt="" loading="lazy" decoding="async" className="dealer-surface-image size-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "var(--dealer-surface-image-scrim-strong)" }}
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="dealer-surface-features">
        <FeatureOverlayCard
          left={576}
          top={123}
          image={assets.featureCardJoints}
          icon={assets.cardIconJoints}
          title={"Точные\nстыки"}
          description="Идеальный внешний вид с минимальными затратами"
        />
        <FeatureOverlayCard
          left={1011}
          top={247}
          image={assets.featureCardAcoustic}
          icon={assets.cardIconAcoustic}
          title={"Акустический\nкомфорт"}
          description="Снижение шума и комфортная среда"
        />
        <FeatureOverlayCard
          left={1064}
          top={558}
          image={assets.featureCardGeometry}
          icon={assets.cardIconGeometry}
          title={"Чистая\nгеометрия"}
          description="Ровные плоскости и радиусные решения"
          scrim
        />
        <FeatureOverlayCard
          left={615}
          top={659}
          image={assets.featureCardSurface}
          icon={assets.cardIconSurface}
          title={"Выразительная\nповерхность"}
          description="Фактура и цвет под замысел проекта"
          scrim
        />
      </div>
    </section>
  );
}

type DesignCardProps = {
  label: string;
  caption: string;
  image: string;
  imageStyle?: React.CSSProperties;
};

function DesignCard({ label, caption, image, imageStyle }: DesignCardProps) {
  return (
    <article
      className="dealer-design-card relative flex h-[575px] w-83 flex-col items-start justify-between overflow-hidden rounded-2xl p-4"
      style={{ boxShadow: "var(--dealer-shadow-glass)" }}
    >
      <img src={image} alt="" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 size-full rounded-2xl object-cover" style={imageStyle} />
      <div className="relative rounded-lg bg-dealer-brand-white px-4 py-3">
        <p className="dealer-text-trim text-xs font-medium leading-none text-dealer-text-primary whitespace-nowrap">{label}</p>
      </div>
      <div className="relative flex w-full items-start gap-2 rounded-lg bg-dealer-brand-white px-4 py-3">
        <img src={assets.smallCardIcon} alt="" width={16} height={16} className="size-4" />
        <p className="flex-1 text-base font-normal leading-normal text-dealer-text-primary">{caption}</p>
      </div>
    </article>
  );
}

function DesignSection() {
  return (
    <section
      id="design"
      data-header-density-trigger
      className="dealer-design-section dealer-section-glass flex h-[1034px] w-368 max-w-full flex-col items-center rounded-lg p-12"
    >
      <Container className="dealer-design-container flex h-[938px] flex-col gap-16">
        <div className="dealer-design-top flex w-full items-start justify-center rounded-lg">
          <div className="dealer-design-top-row flex flex-1 items-start gap-4">
            <div className="dealer-design-icon flex size-25 items-start">
              <div
                className="flex items-center justify-center rounded-lg p-4 backdrop-blur-[10px]"
                style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
              >
                <img src={assets.paintBrush} alt="" width={32} height={32} className="size-8" />
              </div>
            </div>
            <div className="dealer-design-content flex flex-1 flex-col gap-12">
              <p className="dealer-design-eyebrow dealer-text-trim text-base font-semibold uppercase leading-none text-dealer-brand-primary whitespace-nowrap">
                индивидуальные решения
              </p>
              <div className="dealer-design-headline-row flex w-full items-start justify-between">
                <div className="dealer-design-headline flex h-60 w-141 flex-col justify-between">
                  <h2 className="dealer-design-h2 dealer-section-title dealer-text-trim w-[629px]">
                    Свобода в дизайне. Технологии для ваших идей
                  </h2>
                  <p className="dealer-design-lead dealer-section-lead w-[525px]">
                    Панели с UFR печатью, окраска в любые оттенки, разные фактуры
                  </p>
                </div>
                <div className="dealer-design-body flex h-60 w-141 flex-col justify-center gap-8">
                  <div className="flex flex-col gap-8 text-base font-medium leading-normal text-dealer-text-description">
                    <p>
                      Не каждый проект можно решить готовой поверхностью из каталога. WINAL позволяет работать с
                      индивидуальными задачами: окрашивать панели в любые оттенки, наносить УФ-печать, паттерны,
                      графику и подбирать декоративные исполнения под концепцию объекта.
                    </p>
                    <p>
                      Для архитектора и дизайнера это означает больше свободы. Идею можно довести не только до
                      визуализации, но и до производимого решения: панели, узла, спецификации и реального результата на
                      объекте.
                    </p>
                  </div>
                  <div className="dealer-design-cta-row flex w-full items-start justify-between">
                    <PrimaryButton label="Обсудить нестандартное решение" width={296} showArrow={false} />
                    <OutlineButton label="Запросить каталог декоров" width={255} showArrow={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dealer-design-cards-row flex w-full items-start gap-4">
          <DesignCard
            label="UFR печать"
            caption="Стойкая печать с высокой детализацией"
            image={assets.designCardUfr}
          />
          <DesignCard
            label="Окраска RAL"
            caption="Окраска панелей акрилом в любой оттенок"
            image={assets.designCardRal}
          />
          <DesignCard
            label="Натуральный шпон"
            caption="Натуральные материалы для премиальных интерьеров"
            image={assets.designCardVeneer}
          />
          <DesignCard
            label="Графика и паттерны"
            caption="Уникальные изображения, любые паттерны и графика"
            image={assets.designCardPatterns}
          />
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center bg-dealer-surface-page">
      <HomeScrollExperience
        assets={heroAssets}
        surface={<SurfaceSection />}
      >
        {/* Reuses the accepted /catalog compact/split/stack pattern verbatim:
            `variant="lab"` only enables it on non-desktop-pointer viewports
            (see use-catalog-compact-layout.ts); desktop stays byte-identical.
            The wrapper supplies the `[data-catalog-lab]` CSS scope that route
            provides via its own <main>. */}
        <div data-catalog-lab className="contents">
          <CatalogSection variant="lab" />
        </div>
        <ComplexApproachInterior />
        <DesignSection />
        <MontazhSection />
        <CasesSection />
        <ProjectFormSection />
        <FooterSection />
      </HomeScrollExperience>
    </main>
  );
}
