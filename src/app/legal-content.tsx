import Link from "next/link";
import { dealerConfig } from "@/lib/dealer-config";

// Privacy policy and consent of the dealer site (152-ФЗ). The operator is the dealer, its details come from dealerConfig.legal.
// The texts are a template: the dealer approves them for its own processing before `legal.approved` is set.

const legal = dealerConfig.legal;
const privacyEmail = legal.privacyEmail || dealerConfig.email;

export const PRIVACY_HREF = "/privacy";
export const CONSENT_HREF = "/consent";

/** A field of the operator that is not filled in yet. */
function Field({ value, name }: { value: string; name: string }) {
  if (value) return <>{value}</>;
  return <mark className="rounded bg-[#fff3c4] px-1 text-dealer-text-primary">[{name}]</mark>;
}

export function OperatorLine() {
  return (
    <>
      <Field value={legal.operator} name="наименование оператора" />, ИНН <Field value={legal.inn} name="ИНН" />, ОГРН{" "}
      <Field value={legal.ogrn} name="ОГРН" />, адрес: <Field value={legal.address} name="юридический адрес" />
    </>
  );
}

export function DraftBanner() {
  if (legal.approved) return null;
  return (
    <p role="note" className="rounded-lg border border-[#e5c96b] bg-[#fffaf0] p-4 text-sm font-medium leading-5 text-dealer-text-secondary">
      Проект документа. Дилер утверждает текст под свой фактический порядок обработки данных и заполняет выделенные реквизиты до запуска сайта.
    </p>
  );
}

export function LegalArticle({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="flex max-w-[860px] flex-col gap-6 pt-4">
      <header className="flex flex-col gap-3">
        <h1 className="dealer-section-title">{title}</h1>
        <p className="text-sm font-medium text-dealer-text-description">Редакция от {legal.edition}</p>
      </header>
      <DraftBanner />
      <div className="legal-text flex flex-col gap-4 text-base font-medium leading-[1.55] text-dealer-text-secondary [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-dealer-text-primary [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:pl-6 [&_a]:text-dealer-brand-primary [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </article>
  );
}

const FORM_FIELDS = "имя, название компании, телефон, адрес электронной почты, тип объекта, описание задачи и приложенные файлы проекта";

export function PrivacyPolicyText() {
  const site = dealerConfig.partnerName;
  return (
    <>
      <h2>1. Общие положения</h2>
      <p>
        Политика описывает, как оператор обрабатывает и защищает персональные данные посетителей сайта {site} в соответствии с Федеральным законом
        от 27.07.2006 № 152-ФЗ «О персональных данных».
      </p>
      <p>
        Оператор: <OperatorLine />. Вопросы об обработке данных: <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
      </p>
      <p>
        Компания WINAL является производителем продукции, представленной на сайте. Данные из форм сайта получает и обрабатывает оператор, указанный выше.
      </p>

      <h2>2. Какие данные мы обрабатываем</h2>
      <p>Данные, которые посетитель сам указывает в форме заявки: {FORM_FIELDS}.</p>
      <p>
        Мы не запрашиваем специальные категории данных и биометрию. Не указывайте в описании и файлах лишние сведения о себе и данные других людей.
      </p>

      <h2>3. Цели обработки</h2>
      <ul>
        <li>ответ на заявку, консультация и подбор решений WINAL для объекта;</li>
        <li>подготовка расчёта стоимости и коммерческого предложения;</li>
        <li>связь по выполнению договорённостей с посетителем.</li>
      </ul>

      <h2>4. Правовые основания</h2>
      <p>
        Согласие посетителя на обработку данных, которое он даёт при отправке формы (п. 1 ч. 1 ст. 6 152-ФЗ), а при заключении договора — исполнение и
        заключение договора по инициативе посетителя (п. 5 ч. 1 ст. 6 152-ФЗ).
      </p>

      <h2>5. Действия с данными</h2>
      <p>
        Сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, блокирование, удаление и уничтожение. Обработка
        ведётся с использованием средств автоматизации и без них.
      </p>
      <p>
        Данные не распространяются и не передаются третьим лицам, кроме случаев, предусмотренных законом. Хранение ведётся в базах данных на территории
        Российской Федерации.
      </p>

      <h2>6. Сроки хранения</h2>
      <p>
        До достижения целей обработки или до отзыва согласия. Если с посетителем заключён договор, данные хранятся в сроки, установленные законом для
        договорных и бухгалтерских документов.
      </p>

      <h2>7. Cookie и веб-аналитика</h2>
      {legal.analytics.length ? (
        <p>
          Сайт использует сервисы веб-аналитики: {legal.analytics.join(", ")}. Они получают обезличенные сведения о посещениях: адрес страницы,
          источник перехода, тип устройства и браузера. Сбор можно ограничить в настройках браузера.
        </p>
      ) : (
        <p>Сайт не использует сервисы веб-аналитики и рекламные cookie. Технические данные сервера (IP-адрес, время запроса) используются только для работы и защиты сайта.</p>
      )}

      <h2>8. Права посетителя</h2>
      <ul>
        <li>получить сведения об обработке своих данных;</li>
        <li>потребовать уточнения, блокирования или уничтожения данных, если они неполные, устаревшие или обрабатываются незаконно;</li>
        <li>отозвать согласие, написав на <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a> или по адресу оператора;</li>
        <li>обжаловать действия оператора в Роскомнадзоре или в суде.</li>
      </ul>
      <p>Мы отвечаем на запрос в течение 10 рабочих дней с момента получения.</p>

      <h2>9. Защита данных</h2>
      <p>
        Оператор назначает ответственного за обработку данных, ограничивает доступ к ним кругом сотрудников, которым они нужны для работы, использует
        защищённое соединение (HTTPS) и средства защиты информации.
      </p>

      <h2>10. Изменения политики</h2>
      <p>
        Действующая редакция всегда опубликована на этой странице. Текст согласия на обработку данных — на странице{" "}
        <Link href={CONSENT_HREF}>«Согласие на обработку персональных данных»</Link>.
      </p>
    </>
  );
}

export function ConsentText() {
  return (
    <>
      <p>
        Отправляя форму на сайте {dealerConfig.partnerName} и отмечая согласие, я свободно, своей волей и в своём интересе даю согласие оператору —{" "}
        <OperatorLine /> — на обработку моих персональных данных на следующих условиях.
      </p>
      <h2>Данные</h2>
      <p>Указанные мной в форме: {FORM_FIELDS}.</p>
      <h2>Цели</h2>
      <p>Ответ на мою заявку, консультация и подбор решений, подготовка расчёта стоимости и коммерческого предложения, связь со мной по этим вопросам.</p>
      <h2>Действия</h2>
      <p>
        Сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, блокирование, удаление и уничтожение, с использованием
        средств автоматизации и без них.
      </p>
      <h2>Срок и отзыв</h2>
      <p>
        Согласие действует до достижения целей обработки или до его отзыва. Отозвать согласие можно письмом на{" "}
        <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a> или по адресу оператора.
      </p>
      <p>
        Согласие не распространяется на рекламные рассылки. Порядок обработки описан в <Link href={PRIVACY_HREF}>Политике обработки персональных данных</Link>.
      </p>
    </>
  );
}
