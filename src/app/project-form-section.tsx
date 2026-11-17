"use client";
import Link from "next/link";
import { CONSENT_HREF, PRIVACY_HREF } from "@/app/legal-content";
import { asset } from "@/lib/asset";
import { dealerConfig } from "@/lib/dealer-config";

import { useId, useRef, useState, type DragEvent, type FormEvent } from "react";

const IMAGES = asset("/images/home/project-form");

const assets = {
  uploadIcon: `${IMAGES}/upload-icon.svg`,
  arrowWhite: `${IMAGES}/arrow-white.svg`,
  dividerLine: `${IMAGES}/divider-line.svg`,
  iconPhone: `${IMAGES}/icon-phone.svg`,
  iconTelegram: `${IMAGES}/icon-telegram.svg`,
  iconEmail: `${IMAGES}/icon-email.svg`,
  interior: `${IMAGES}/interior.webp`,
} as const;

const ACCEPTED_FILE_TYPES = ".pdf,.dwg,.jpeg,.jpg,.png";

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
  inputClassName?: string;
};

function FormField({ id, label, placeholder, className = "", inputClassName = "" }: FieldProps) {
  return (
    <div className={`dealer-form-field flex flex-col gap-4 ${className}`}>
      <label htmlFor={id} className="dealer-text-trim text-base font-medium leading-normal text-dealer-text-secondary">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        className={`dealer-form-input h-[38px] w-full rounded border border-dealer-text-description bg-transparent px-3 py-3 text-xs font-normal leading-normal text-dealer-text-primary placeholder:text-dealer-text-description focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary ${inputClassName}`}
      />
    </div>
  );
}

type ContactRowProps = {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  title: string;
  subtitle: string;
};

function ContactRow({ icon, iconWidth, iconHeight, title, subtitle }: ContactRowProps) {
  return (
    <div className="dealer-form-contact-row flex w-full items-center gap-4">
      <div
        className="flex size-[70px] shrink-0 items-center justify-center rounded-lg bg-dealer-brand-white p-[18px] backdrop-blur-[21.875px]"
        style={{ boxShadow: "0 4px 32px rgba(1, 88, 171, 0.1)" }}
      >
        <div className="flex size-12 items-center justify-center px-[9px] py-3">
          <img src={icon} alt="" width={iconWidth} height={iconHeight} className="block max-w-none" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-xl font-semibold leading-none text-dealer-text-primary">{title}</p>
        <p className="dealer-text-trim text-base font-normal leading-normal text-dealer-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative h-0 w-full shrink-0">
      <img src={assets.dividerLine} alt="" className="block h-px w-full max-w-none" />
    </div>
  );
}

export function ProjectFormSection() {
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!fileInputRef.current) {
      return;
    }

    const transfer = new DataTransfer();
    Array.from(event.dataTransfer.files).forEach((file) => transfer.items.add(file));
    fileInputRef.current.files = transfer.files;
  };

  return (
    <section
      id="project-form"
      data-header-density-trigger
      className="dealer-form-section dealer-section-glass flex h-[952px] w-full max-w-[1472px] flex-col items-center rounded-lg p-12"
      aria-labelledby={`${formId}-title`}
    >
      <div className="dealer-form-inner flex h-[856px] w-full max-w-[1376px] flex-col gap-12">
        <header className="dealer-form-header flex h-[169px] w-full flex-col gap-8">
          <p className="dealer-text-trim text-base font-semibold uppercase leading-normal text-dealer-brand-primary">
            ДАВАЙТЕ СОЗДАДИМ ВАШ ОБЪЕКТ
          </p>
          <div className="flex flex-col gap-8">
            <h2
              id={`${formId}-title`}
              className="dealer-form-h2 dealer-text-trim w-full text-[64px] font-semibold leading-none text-dealer-text-primary"
            >
              Подберем решения WINAL под ваш проект
            </h2>
            <p className="dealer-form-intro dealer-text-trim w-[667.061px] max-w-full text-base font-normal leading-normal text-dealer-text-description">
              Пришлите проект или опишите задачу - предложим оптимальные варианты, рассчитаем комплектацию и сроки.
              Ответим в течение 30 минут в рабочий день
            </p>
          </div>
        </header>

        <div className="dealer-form-row flex h-[639px] w-full gap-4">
          <form
            onSubmit={handleSubmit}
            className="dealer-form-card flex h-[639px] w-[912px] shrink-0 flex-col gap-7 rounded-lg bg-dealer-brand-white p-7 backdrop-blur-[10px]"
            style={{ boxShadow: "var(--dealer-shadow-glass)" }}
          >
            <div className="dealer-form-upload-row flex h-[117px] w-full gap-4">
              <div className="dealer-form-upload-text flex h-[66px] w-[420px] shrink-0 flex-col gap-4">
                <p className="text-xl font-semibold leading-none text-dealer-text-primary">Расскажите о вашем проекте</p>
                <p className="dealer-text-trim w-[363px] max-w-full text-base font-normal leading-normal text-dealer-text-primary">
                  Загрузите чертежи, визуализации или опишите задачи - мы подготовим решения и расчет.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={openFilePicker}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openFilePicker();
                  }
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="dealer-form-dropzone flex h-[117px] w-[420px] shrink-0 cursor-pointer items-start justify-center gap-7 rounded-lg border-[1.2px] border-dashed border-dealer-text-description p-7"
              >
                <div className="relative h-14 w-12 shrink-0">
                  <img src={assets.uploadIcon} alt="" width={48} height={56} className="block size-full max-w-none" />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="dealer-text-trim text-base font-medium leading-normal text-dealer-text-secondary">
                    <p>Загрузите файлы</p>
                    <p>или нажмите для выбора</p>
                  </div>
                  <p className="dealer-text-trim text-base font-normal leading-normal text-dealer-text-description">
                    PDF, DWG, JPEG, PNG до 50 Mb
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_FILE_TYPES}
                  multiple
                  className="sr-only"
                  tabIndex={-1}
                  aria-label="Загрузить файлы проекта"
                />
              </div>
            </div>

            <div className="dealer-form-field-row flex w-full gap-4">
              <FormField id={`${formId}-name`} label="Ваше имя" placeholder="Введите имя" className="w-[420px] shrink-0" />
              <FormField
                id={`${formId}-company`}
                label="Компания"
                placeholder="Название компании"
                className="w-[420px] shrink-0"
              />
            </div>

            <div className="dealer-form-field-row flex w-full gap-4">
              <FormField
                id={`${formId}-phone`}
                label="Телефон"
                placeholder="+7 (XXX) XXX-XX-XX"
                className="w-[420px] shrink-0"
              />
              <FormField
                id={`${formId}-email`}
                label="E-mail"
                placeholder="name@company.ru"
                className="w-[420px] shrink-0"
              />
            </div>

            <FormField
              id={`${formId}-object-type`}
              label="Тип объекта"
              placeholder="Например: Жилой комплекс, Школа, Медицинское учреждение, Коммерческий объект и тд"
            />

            <div className="flex w-full flex-col gap-4">
              <label
                htmlFor={`${formId}-description`}
                className="dealer-text-trim text-base font-medium leading-normal text-dealer-text-secondary"
              >
                Краткое описание задачи
              </label>
              <textarea
                id={`${formId}-description`}
                name="description"
                placeholder="Опишите задачи, требования, пожелания к системам и материалам."
                className="dealer-form-textarea h-16 w-full resize-none rounded border border-dealer-text-description bg-transparent px-3 py-3 text-xs font-normal leading-normal text-dealer-text-primary placeholder:text-dealer-text-description focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary"
              />
            </div>

            <div className="dealer-form-submit-row flex h-10 w-full items-start gap-8">
              <button
                type="submit"
                className="dealer-form-submit-btn inline-flex h-10 w-[225px] shrink-0 items-center justify-center gap-2 rounded bg-dealer-brand-primary px-12 py-3"
              >
                <span className="text-xs font-semibold leading-normal text-dealer-brand-white">Отправить проект</span>
                <img src={assets.arrowWhite} alt="" width={12} height={10} className="h-[10px] w-3 shrink-0" />
              </button>

              <div className="dealer-form-consent flex h-10 w-[465px] items-center gap-4">
                <label htmlFor={`${formId}-consent`} className="dealer-form-consent-checkbox relative flex size-8 shrink-0 cursor-pointer items-center justify-center">
                  <input
                    id={`${formId}-consent`}
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(event) => setConsentChecked(event.target.checked)}
                    className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                  />
                  <span className="pointer-events-none size-4 rounded-[2px] border-[0.8px] border-dealer-text-description bg-dealer-brand-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dealer-brand-primary" />
                </label>
                <p className="text-xs font-normal leading-normal text-dealer-text-primary">
                  <span>Даю </span>
                  <Link href={CONSENT_HREF} target="_blank" className="text-dealer-brand-primary underline-offset-2 hover:underline">согласие на обработку моих персональных данных</Link>
                  <span> и ознакомлен(а)</span>
                  <br />
                  <span>с </span>
                  <Link href={PRIVACY_HREF} target="_blank" className="text-dealer-brand-primary underline-offset-2 hover:underline">Политикой обработки персональных данных</Link>
                  <span>.</span>
                </p>
              </div>
            </div>
          </form>

          <aside
            className="dealer-form-aside flex h-[639px] w-[448px] shrink-0 flex-col gap-5 rounded-lg bg-dealer-brand-white p-7 backdrop-blur-[10px]"
            style={{ boxShadow: "var(--dealer-shadow-glass)" }}
          >
            <div className="flex w-full flex-col gap-2">
              <p className="text-[32px] font-semibold leading-none text-dealer-text-primary">{dealerConfig.partnerName}</p>
              <p className="text-xl font-semibold leading-none text-dealer-text-muted">представитель WINAL в {dealerConfig.region}</p>
            </div>

            <Divider />

            <div className="flex w-full flex-col gap-4">
              <ContactRow
                icon={assets.iconPhone}
                iconWidth={36}
                iconHeight={36}
                title={dealerConfig.phone}
                subtitle={dealerConfig.contacts.hours[0] ?? "Позвоните нам"}
              />
              <ContactRow
                icon={assets.iconTelegram}
                iconWidth={36}
                iconHeight={33}
                title="Написать в Telegram"
                subtitle="Отвечаем в течение 30 минут"
              />
              <ContactRow
                icon={assets.iconEmail}
                iconWidth={36}
                iconHeight={36}
                title={dealerConfig.email}
                subtitle="Напишите нам на почту "
              />
            </div>

            <Divider />

            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <div className="dealer-form-aside-image relative h-[155px] w-full shrink-0 overflow-hidden rounded-lg">
                <img
                  src={assets.interior}
                  alt=""
                  width={392}
                  height={155}
                  className="dealer-form-aside-image-el block h-[155px] w-full max-w-none object-cover"
                />
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <p className="dealer-form-aside-title whitespace-nowrap text-dealer-text-primary">
                  <span className="text-xl font-semibold leading-none">Внутренняя отделка WINAL</span>
                  <span className="text-[12.9px] font-semibold leading-none">TM</span>
                </p>
                <p className="dealer-form-aside-caption w-[363px] max-w-full text-xs font-normal leading-normal text-dealer-text-secondary">
                  Премиальные решения для современных объектов
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
