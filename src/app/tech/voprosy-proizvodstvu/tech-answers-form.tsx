"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TechField, TechQuestion } from "@/data/tech-voprosy-proizvodstvu";
import s from "./page.module.css";

type Answer = { v: string; n: string };
type Doc = {
  answers: Record<string, Answer & { by?: string; at?: string }>;
  hold: Record<string, { on: boolean }>;
};
type SaveState = { text: string; kind: "" | "ok" | "err" };

const API = "/api/tech/answers";
const WHO_KEY = "tech-voprosy-who";
const keyOf = (q: TechQuestion, f: TechField) => `${q.id}_${f.id}`;

function isAnswered(f: TechField, a?: Answer) {
  if (!a) return false;
  return !!(a.v.trim() || (f.t === "chips" && a.n.trim()));
}

export function TechAnswersForm({ questions }: { questions: TechQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [hold, setHold] = useState<Record<string, boolean>>({});
  const [who, setWho] = useState("");
  const [save, setSave] = useState<SaveState>({ text: "Загружаю ответы…", kind: "" });
  const [copied, setCopied] = useState("");
  const [zoom, setZoom] = useState<string | null>(null);
  const pending = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const whoRef = useRef("");

  const applyDoc = useCallback((doc: Doc) => {
    setAnswers((cur) => {
      const next = { ...cur };
      for (const [k, a] of Object.entries(doc.answers || {})) {
        if (!pending.current[k]) next[k] = { v: a.v || "", n: a.n || "" };
      }
      return next;
    });
    setHold(Object.fromEntries(Object.entries(doc.hold || {}).map(([k, h]) => [k, !!h.on])));
  }, []);

  // Подтягиваем ответы при открытии и раз в 8 секунд, если страницу заполняют вдвоём.
  useEffect(() => {
    void Promise.resolve().then(() => {
      try {
        const w = localStorage.getItem(WHO_KEY) || "";
        whoRef.current = w;
        setWho(w);
      } catch {}
    });
    let alive = true;
    const load = async (first: boolean) => {
      try {
        const r = await fetch(API, { cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const doc = (await r.json()) as Doc;
        if (!alive) return;
        applyDoc(doc);
        if (first) setSave({ text: "", kind: "" });
      } catch {
        if (alive && first) setSave({ text: "Нет связи с сервером, ответы не загрузились", kind: "err" });
      }
    };
    load(true);
    const t = setInterval(() => {
      if (!document.hidden && Object.keys(pending.current).length === 0) load(false);
    }, 8000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [applyDoc]);

  const post = useCallback(async (body: Record<string, unknown>) => {
    setSave({ text: "Сохраняю…", kind: "" });
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, by: whoRef.current.trim() }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setSave({ text: "Сохранено", kind: "ok" });
    } catch {
      setSave({ text: "Не сохранилось, проверьте интернет и повторите", kind: "err" });
    }
  }, []);

  const setAnswer = (k: string, a: Answer, debounce: boolean) => {
    setAnswers((cur) => ({ ...cur, [k]: a }));
    clearTimeout(pending.current[k]);
    pending.current[k] = setTimeout(
      () => {
        delete pending.current[k];
        void post({ key: k, v: a.v, n: a.n });
      },
      debounce ? 700 : 0,
    );
  };

  const toggleHold = (qid: string) => {
    const on = !hold[qid];
    setHold((cur) => ({ ...cur, [qid]: on }));
    void post({ hold: qid, on });
  };

  let total = 0;
  let done = 0;
  for (const q of questions)
    for (const f of q.fields) {
      total++;
      if (isAnswered(f, answers[keyOf(q, f)])) done++;
    }

  const copyAll = () => {
    const w = who.trim();
    const out = [`Ответы производства по монтажным профилям WINAL${w ? ` (${w})` : ""}`, ""];
    questions.forEach((q, i) => {
      out.push(`${i + 1}. ${q.title}${hold[q.id] ? " [уточнят позже]" : ""}`);
      q.fields.forEach((f) => {
        const a = answers[keyOf(q, f)];
        const txt = [a?.v, f.t === "chips" ? a?.n : ""].filter((x) => x && x.trim()).join(" — ");
        out.push(`   ${f.q} → ${txt || "нет ответа"}`);
      });
      out.push("");
    });
    navigator.clipboard.writeText(out.join("\n")).then(
      () => {
        setCopied("Скопировано");
        setTimeout(() => setCopied(""), 2000);
      },
      () => setCopied("Не удалось скопировать"),
    );
  };

  return (
    <div className={s.page}>
      <div className={s.bar}>
        <div className={s.barIn}>
          <div className={s.prog}>
            <b>
              Отвечено {done} из {total}
            </b>{" "}
            <span className={`${s.save} ${save.kind ? s[save.kind] : ""}`}>{save.text}</span>
            <div className={s.track}>
              <div className={s.fill} style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
            </div>
          </div>
          <label className={s.who}>
            Кто отвечает
            <input
              type="text"
              placeholder="Имя"
              value={who}
              onChange={(e) => {
                setWho(e.target.value);
                whoRef.current = e.target.value;
                try {
                  localStorage.setItem(WHO_KEY, e.target.value);
                } catch {}
              }}
            />
          </label>
        </div>
      </div>

      <main className={s.wrap}>
        <h1>Вопросы производству</h1>
        <p className={s.lead}>
          Шесть профилей WINAL, по которым в альбоме АТР нет схемы монтажа. Достаточно выбрать вариант или
          написать пару слов. Ответы сохраняются сразу, отправлять ничего не нужно. Можно ответить не на всё:
          нажмите «Уточню позже» и переходите дальше. Картинки увеличиваются по клику.
        </p>

        {questions.map((q, qi) => {
          const qDone = q.fields.every((f) => isAnswered(f, answers[keyOf(q, f)]));
          return (
            <section key={q.id} id={q.id} className={`${s.q} ${qDone ? s.done : ""}`}>
              <div className={s.pics}>
                {q.imgs.map((im) => (
                  <figure key={im.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={im.src}
                      alt={im.cap}
                      loading="lazy"
                      className={im.vec ? "" : s.photo}
                      onClick={() => setZoom(im.src)}
                    />
                    <figcaption>{im.cap}</figcaption>
                  </figure>
                ))}
              </div>
              <div className={s.body}>
                <div className={s.num}>
                  Вопрос {qi + 1} из {questions.length}
                </div>
                <h2>{q.title}</h2>
                <p className={s.src}>
                  {q.src}.{" "}
                  {q.site && (
                    <a href={q.site.href} target="_blank" rel="noopener noreferrer">
                      {q.site.label}
                    </a>
                  )}
                </p>
                {q.fields.map((f) => {
                  const k = keyOf(q, f);
                  const a = answers[k] || { v: "", n: "" };
                  const ans = isAnswered(f, a);
                  if (f.t === "chips")
                    return (
                      <div key={k} className={`${s.f} ${ans ? s.ans : ""}`}>
                        <div className={s.lb}>{f.q}</div>
                        <div className={s.chips}>
                          {f.o.map((o) => (
                            <button
                              key={o}
                              type="button"
                              className={s.chip}
                              aria-pressed={a.v === o}
                              onClick={() => setAnswer(k, { v: a.v === o ? "" : o, n: a.n }, false)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                        {f.note && (
                          <input
                            type="text"
                            aria-label="Уточнение"
                            placeholder={f.ph || "Уточнение, если нужно"}
                            value={a.n}
                            onChange={(e) => setAnswer(k, { v: a.v, n: e.target.value }, true)}
                          />
                        )}
                      </div>
                    );
                  return (
                    <div key={k} className={`${s.f} ${ans ? s.ans : ""}`}>
                      <label htmlFor={`i_${k}`} className={s.lb}>
                        {f.q}
                      </label>
                      {f.t === "text" ? (
                        <textarea
                          id={`i_${k}`}
                          data-lenis-prevent
                          placeholder={f.ph || ""}
                          value={a.v}
                          onChange={(e) => setAnswer(k, { v: e.target.value, n: "" }, true)}
                        />
                      ) : (
                        <input
                          id={`i_${k}`}
                          type="text"
                          placeholder={f.ph || ""}
                          value={a.v}
                          onChange={(e) => setAnswer(k, { v: e.target.value, n: "" }, true)}
                        />
                      )}
                    </div>
                  );
                })}
                <button
                  type="button"
                  className={s.hold}
                  aria-pressed={!!hold[q.id]}
                  onClick={() => toggleHold(q.id)}
                >
                  {hold[q.id] ? "Уточню позже ✓" : "Уточню позже"}
                </button>
              </div>
            </section>
          );
        })}

        <div className={s.act}>
          <button type="button" className={s.btn} onClick={copyAll}>
            Скопировать все ответы текстом
          </button>
          <span className={s.save}>{copied}</span>
        </div>
      </main>

      {zoom && (
        <div className={s.overlay} onClick={() => setZoom(null)} role="presentation">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="" />
        </div>
      )}
    </div>
  );
}
