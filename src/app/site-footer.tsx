import { asset } from "@/lib/asset";
import { dealerConfig } from "@/lib/dealer-config";

const IMAGES = asset("/images/home");

const assets = {
  footerLogo: `${IMAGES}/footer-logo.svg`,
  contactUser: `${IMAGES}/contact-user.svg`,
  contactPhone: `${IMAGES}/contact-phone.svg`,
  contactEmail: `${IMAGES}/contact-email.svg`,
  socialTelegram: `${IMAGES}/social-telegram.svg`,
  socialWhatsapp: `${IMAGES}/social-whatsapp.svg`,
  socialChat: `${IMAGES}/social-chat.svg`,
} as const;

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-344 max-w-full ${className}`}>{children}</div>;
}

export function FooterSection() {
  const navChips = ["Решения", "Возможности", "Выполненные проекты", "О производителе", "Контакты"];

  return (
    <footer className="dealer-footer flex w-368 max-w-full flex-col items-center gap-8 rounded-lg">
      <div className="dealer-footer-top flex w-full items-center rounded-lg border border-dealer-text-description px-12 py-7 bg-dealer-brand-white">
        <Container className="dealer-footer-top-inner flex items-center justify-between">
          <div className="dealer-footer-brand flex w-[446px] items-center gap-4">
            <img src={assets.footerLogo} alt="WINAL" width={150} height={27} className="h-[27px] w-[150px] shrink-0" />
            <div className="h-6 w-px shrink-0 bg-dealer-brand-decoration" />
            <p className="dealer-text-trim text-xl font-semibold leading-none text-dealer-text-description whitespace-nowrap">
              {dealerConfig.descriptor}
            </p>
          </div>
          <div className="dealer-footer-chips hidden w-[835px] items-center gap-3" hidden>
            {navChips.map((chip, index) => (
              <div
                key={chip}
                className="flex items-center justify-center rounded-lg border border-dealer-text-description bg-dealer-brand-white px-6 py-5"
              >
                <span className="dealer-text-trim text-base font-semibold leading-none text-dealer-text-secondary whitespace-nowrap">
                  {chip}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="dealer-footer-grid grid grid-cols-2 w-full items-stretch gap-4">
        <div className="dealer-footer-about flex flex-col gap-8 rounded-2xl border border-dealer-text-description bg-dealer-brand-white p-12">
          <h3 className="dealer-text-trim  text-4xl font-bold leading-none text-dealer-brand-primary">О WINAL в Сочи</h3>
          <div className="flex flex-col text-base gap-2 font-medium leading-[1.35] text-dealer-text-description">
            <p>Стеновые, потолочные и акустические панели WINAL для коммерческих и общественных объектов.</p>
            <p>Подбор, расчёт и сопровождение проекта в Сочи.</p>
          </div>
        </div>

        <div className="dealer-footer-contacts flex  flex-col gap-6 rounded-2xl border border-dealer-text-description bg-dealer-brand-white px-8 py-6">
          <h3 className="dealer-text-trim text-2xl font-bold leading-none text-dealer-brand-primary">Контакты</h3>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center gap-4">
              <img src={assets.contactUser} alt="" width={24} height={24} className="size-6 shrink-0" />
              <p className="dealer-footer-contact-value text-xl font-medium leading-normal text-dealer-text-description whitespace-nowrap">
                {dealerConfig.partnerName}
              </p>
            </div>
            <div className="flex w-full items-center gap-4">
              <img src={assets.contactPhone} alt="" width={24} height={24} className="size-6 shrink-0" />
              <p className="dealer-footer-contact-value flex-1 text-xl font-medium leading-normal text-dealer-text-description">
                {dealerConfig.phone}
              </p>
            </div>
            <div className="flex w-full items-center gap-4">
              <img src={assets.contactEmail} alt="" width={24} height={24} className="size-6 shrink-0" />
              <p className="dealer-footer-contact-value flex-1 text-xl font-medium leading-normal text-dealer-text-description">
                {dealerConfig.email}
              </p>
            </div>
          </div>
          <div className="flex w-31 items-start gap-2 pt-2">
            <img src={assets.socialTelegram} alt="Telegram" width={36} height={36} className="size-9 shrink-0" />
            <img src={assets.socialWhatsapp} alt="WhatsApp" width={36} height={36} className="size-9 shrink-0" />
            <img src={assets.socialChat} alt="Чат" width={36} height={36} className="size-9 shrink-0" />
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center rounded pt-2">
        <p className="dealer-footer-policy dealer-text-trim text-xl font-semibold leading-none text-dealer-text-description whitespace-pre">
          Политика конфиденциальности&nbsp;&nbsp;|&nbsp;&nbsp;Согласие на обработку персональных данных
        </p>
      </div>
    </footer>
  );
}

