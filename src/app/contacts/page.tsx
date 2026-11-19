import type { Metadata } from "next";
import Link from "next/link";
import { BTN_PRIMARY, BTN_SECONDARY, PANEL, PANEL_SHADOW } from "@/app/catalog/catalog-cards";
import { CONSENT_HREF, PRIVACY_HREF } from "@/app/legal-content";
import { InnerPage } from "@/app/site-chrome";
import { asset } from "@/lib/asset";
import { dealerConfig, dealerPhoneHref } from "@/lib/dealer-config";

const TITLE = "Контакты";
const LEAD = `${dealerConfig.partnerName} — дилер WINAL в регионе ${dealerConfig.region}. Подберём панели и профили под объект, посчитаем стоимость и организуем поставку.`;

export const metadata: Metadata = { title: `${TITLE} — ${dealerConfig.descriptor}`, description: LEAD };

const ICONS = asset("/images/home");
const MESSENGER_ICON: Record<string, string> = {
  Telegram: `${ICONS}/social-telegram.svg`,
  WhatsApp: `${ICONS}/social-whatsapp.svg`,
};

function Row({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <img src={icon} alt="" width={24} height={24} className="mt-0.5 size-6 shrink-0" />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-xs font-semibold text-dealer-text-description">{label}</span>
        <span className="break-words text-lg font-semibold leading-6 text-dealer-text-primary md:text-xl">{children}</span>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  const { contacts, legal } = dealerConfig;
  const messengers = contacts.messengers.filter((item) => item.href);
  const hasPlace = Boolean(contacts.address || contacts.hours.length);
  const hasRequisites = Boolean(legal.operator);

  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: TITLE }]}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">{TITLE}</h1>
        <p className="dealer-section-lead max-w-[720px]">{LEAD}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section aria-labelledby="contacts-reach" className={`${PANEL} flex flex-col gap-6`} style={PANEL_SHADOW}>
          <h2 id="contacts-reach" className="dealer-type-h2 text-dealer-text-primary">
            Связаться
          </h2>
          <div className="flex flex-col gap-5">
            <Row icon={`${ICONS}/contact-user.svg`} label="Компания">
              {dealerConfig.partnerName}
            </Row>
            <Row icon={`${ICONS}/contact-phone.svg`} label="Телефон">
              <a href={dealerPhoneHref} className="hover:text-dealer-brand-primary">
                {dealerConfig.phone}
              </a>
            </Row>
            <Row icon={`${ICONS}/contact-email.svg`} label="Почта">
              <a href={`mailto:${dealerConfig.email}`} className="hover:text-dealer-brand-primary">
                {dealerConfig.email}
              </a>
            </Row>
          </div>
          {messengers.length ? (
            <ul className="flex flex-wrap gap-2">
              {messengers.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${BTN_SECONDARY} gap-2 !px-5`}>
                    {MESSENGER_ICON[item.label] ? <img src={MESSENGER_ICON[item.label]} alt="" width={20} height={20} className="size-5" /> : null}
                    <span className="dealer-type-mini-semibold">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-auto pt-2">
            <a href="#project-form" className={BTN_PRIMARY}>
              <span className="dealer-type-mini-semibold">Оставить заявку</span>
            </a>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          {hasPlace ? (
            <section aria-labelledby="contacts-place" className={`${PANEL} flex flex-col gap-4`} style={PANEL_SHADOW}>
              <h2 id="contacts-place" className="dealer-type-h2 text-dealer-text-primary">
                Адрес и часы работы
              </h2>
              {contacts.address ? (
                <p className="text-lg font-semibold leading-6 text-dealer-text-primary">
                  {contacts.address}{" "}
                  <a
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(contacts.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-sm font-semibold text-dealer-brand-primary hover:opacity-80"
                  >
                    На карте →
                  </a>
                </p>
              ) : null}
              {contacts.hours.length ? (
                <ul className="flex flex-col gap-1 text-base font-medium text-dealer-text-secondary">
                  {contacts.hours.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}

          <section aria-labelledby="contacts-help" className={`${PANEL} flex flex-col gap-4`} style={PANEL_SHADOW}>
            <h2 id="contacts-help" className="dealer-type-h2 text-dealer-text-primary">
              С чем поможем
            </h2>
            <ul className="flex flex-col gap-2 text-base font-medium leading-6 text-dealer-text-secondary">
              <li>Подбор панелей, покрытий и профилей под задачу объекта</li>
              <li>Расчёт стоимости по проекту или спецификации</li>
              <li>Образцы декоров и консультация по монтажу</li>
              <li>Сертификаты и документы для проектировщиков и снабжения</li>
            </ul>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm font-semibold text-dealer-brand-primary">
              <Link href="/documents" className="hover:opacity-80">
                Документы →
              </Link>
              <Link href="/montazh" className="hover:opacity-80">
                Монтаж →
              </Link>
              <Link href="/catalog" className="hover:opacity-80">
                Каталог →
              </Link>
            </div>
          </section>

          {hasRequisites ? (
            <section aria-labelledby="contacts-requisites" className={`${PANEL} flex flex-col gap-3`} style={PANEL_SHADOW}>
              <h2 id="contacts-requisites" className="dealer-type-h2 text-dealer-text-primary">
                Реквизиты
              </h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-base font-medium text-dealer-text-secondary">
                <dt className="text-dealer-text-description">Организация</dt>
                <dd>{legal.operator}</dd>
                {legal.inn ? (
                  <>
                    <dt className="text-dealer-text-description">ИНН</dt>
                    <dd>{legal.inn}</dd>
                  </>
                ) : null}
                {legal.ogrn ? (
                  <>
                    <dt className="text-dealer-text-description">ОГРН</dt>
                    <dd>{legal.ogrn}</dd>
                  </>
                ) : null}
                {legal.address ? (
                  <>
                    <dt className="text-dealer-text-description">Адрес</dt>
                    <dd>{legal.address}</dd>
                  </>
                ) : null}
              </dl>
            </section>
          ) : null}
        </div>
      </div>

      <p className="text-sm font-medium text-dealer-text-description">
        <Link href={PRIVACY_HREF} className="hover:text-dealer-brand-primary">
          Политика обработки персональных данных
        </Link>
        {"  ·  "}
        <Link href={CONSENT_HREF} className="hover:text-dealer-brand-primary">
          Согласие на обработку данных
        </Link>
      </p>
    </InnerPage>
  );
}
