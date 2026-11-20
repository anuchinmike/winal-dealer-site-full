/**
 * Everything that changes from one dealer to the next. A new dealer site starts by filling this file.
 * Empty strings are treated as «not filled»: contacts hide the row, legal pages show a highlighted gap.
 */
export const dealerConfig = {
  partnerName: "2design.pro",
  region: "Сочи",
  descriptor: "2design.pro — WINAL в Сочи",
  phone: "+7 (863) 300-00-00",
  email: "info@2design.pro",
  // TODO: заменить заглушки на реальные ссылки дилера. Пустая строка: ссылка
  // в шапке рисуется, но никуда не ведёт.
  telegramUrl: "",
  maxUrl: "",
  socialLabels: ["Telegram", "WhatsApp", "Чат"],
  primaryCta: "Обсудить проект",
  secondaryCta: "Смотреть выполненные проекты",

  /** Contacts page. */
  contacts: {
    /** Office or showroom address, one line. */
    address: "",
    /** Opening hours, one line each. */
    hours: ["Пн–Пт с 9:00 до 18:00"] as string[],
    /** Messenger links; an empty href hides the button. */
    messengers: [
      { label: "Telegram", href: "" },
      { label: "WhatsApp", href: "" },
    ],
  },

  /**
   * Operator of personal data: the dealer's legal entity. Feeds the privacy policy, the consent and the requisites on the contacts page.
   * Until `approved` is true the legal pages carry a «draft» banner.
   */
  legal: {
    approved: false,
    /** Full name of the legal entity, e.g. ООО «Название». */
    operator: "",
    inn: "",
    ogrn: "",
    /** Legal address. */
    address: "",
    /** Mailbox for requests about personal data; falls back to `email`. */
    privacyEmail: "",
    /** Date of the current edition, DD.MM.YYYY. */
    edition: "17.11.2026",
    /** Web analytics counters on the site (e.g. «Яндекс Метрика»). Empty: none. */
    analytics: [] as string[],
  },
};

export const dealerPhoneHref = `tel:${dealerConfig.phone.replace(/[^+\d]/g, "")}`;
