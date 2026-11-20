import { dealerConfig } from "@/lib/dealer-config";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
      <path d="M21.4 4.1 2.9 11.2c-1.3.5-1.2 1.3-.2 1.6l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5ZM8.6 13.9l9.2-5.8c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2-1.8-4.5Z" />
    </svg>
  );
}

// Временная иконка MAX: заменить на официальный знак из брендбука мессенджера.
function MaxIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c5.4 0 9.5 3.9 9.5 9.2s-4.1 9.3-9.5 9.3c-1.3 0-2.4-.2-3.5-.6l-3.6 1.4c-.6.2-1.1-.3-1-.9l.5-3.2C3.2 16 2.5 13.9 2.5 11.7c0-5.3 4.1-9.2 9.5-9.2Zm0 3.7c-3.1 0-5.5 2.4-5.5 5.5s2.4 5.6 5.5 5.6 5.5-2.5 5.5-5.6-2.4-5.5-5.5-5.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" />
    </svg>
  );
}

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function externalLinkProps(url: string) {
  return url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};
}

/** Вариант D: крупный номер, под ним «Написать: Telegram · MAX · Почта». */
export function HeaderContacts() {
  return (
    <div className="dealer-header-contacts">
      <a className="dealer-header-phone" href={toTelHref(dealerConfig.phone)}>
        {dealerConfig.phone}
      </a>
      <div className="dealer-header-messengers">
        <span className="dealer-header-messengers-label">Написать:</span>
        <a className="dealer-header-messenger" {...externalLinkProps(dealerConfig.telegramUrl)}>
          <TelegramIcon />
          Telegram
        </a>
        <a className="dealer-header-messenger" {...externalLinkProps(dealerConfig.maxUrl)}>
          <MaxIcon />
          MAX
        </a>
        <a className="dealer-header-messenger" href={`mailto:${dealerConfig.email}`}>
          <MailIcon />
          Почта
        </a>
      </div>
    </div>
  );
}
