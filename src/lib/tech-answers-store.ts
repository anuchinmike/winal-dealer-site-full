import { promises as fs } from "node:fs";
import path from "node:path";

// Ответы техстраниц хранятся на сервере в JSON-файле: <TECH_ANSWERS_DIR>/<form>.json,
// каждое изменение дописывается в <form>.log.jsonl, чтобы ничего не потерять.

export type TechAnswer = { v: string; n: string; by: string; at: string };
export type TechHold = { on: boolean; by: string; at: string };
export type TechAnswersDoc = {
  answers: Record<string, TechAnswer>;
  hold: Record<string, TechHold>;
  updatedAt: string | null;
};

const dir = () => process.env.TECH_ANSWERS_DIR || path.join(process.cwd(), ".data", "tech-answers");
const file = (form: string) => path.join(dir(), `${form}.json`);

let queue: Promise<unknown> = Promise.resolve();

export async function readAnswers(form: string): Promise<TechAnswersDoc> {
  try {
    const raw = await fs.readFile(file(form), "utf8");
    const doc = JSON.parse(raw) as Partial<TechAnswersDoc>;
    return { answers: doc.answers ?? {}, hold: doc.hold ?? {}, updatedAt: doc.updatedAt ?? null };
  } catch {
    return { answers: {}, hold: {}, updatedAt: null };
  }
}

export function updateAnswers(
  form: string,
  change: (doc: TechAnswersDoc) => void,
  logEntry: Record<string, unknown>,
): Promise<TechAnswersDoc> {
  const run = async () => {
    await fs.mkdir(dir(), { recursive: true });
    const doc = await readAnswers(form);
    change(doc);
    doc.updatedAt = new Date().toISOString();
    const tmp = `${file(form)}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(doc, null, 1), "utf8");
    await fs.rename(tmp, file(form));
    await fs.appendFile(
      path.join(dir(), `${form}.log.jsonl`),
      JSON.stringify({ ...logEntry, at: doc.updatedAt }) + "\n",
      "utf8",
    );
    return doc;
  };
  const next = queue.then(run, run);
  queue = next.catch(() => undefined);
  return next;
}
