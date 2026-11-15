import { NextResponse, type NextRequest } from "next/server";
import { techQuestions } from "@/data/tech-voprosy-proizvodstvu";
import { readAnswers, updateAnswers } from "@/lib/tech-answers-store";

export const dynamic = "force-dynamic";

const FORM = "voprosy-proizvodstvu";
const FIELD_KEYS = new Set(techQuestions.flatMap((q) => q.fields.map((f) => `${q.id}_${f.id}`)));
const QUESTION_IDS = new Set(techQuestions.map((q) => q.id));
const clip = (x: unknown, max: number) => (typeof x === "string" ? x.slice(0, max) : "");
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET() {
  return NextResponse.json(await readAnswers(FORM), { headers });
}

// Тело: { key: "q1_a", v, n, by } — ответ на поле, или { hold: "q1", on, by } — «Уточню позже».
export async function POST(req: NextRequest) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > 20_000) return NextResponse.json({ error: "too_large" }, { status: 413, headers });
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400, headers });
  }
  const by = clip(body.by, 80);
  const at = new Date().toISOString();

  if (typeof body.key === "string" && FIELD_KEYS.has(body.key)) {
    const key = body.key;
    const entry = { v: clip(body.v, 4000), n: clip(body.n, 2000), by, at };
    const doc = await updateAnswers(FORM, (d) => {
      d.answers[key] = entry;
    }, { key, ...entry });
    return NextResponse.json(doc, { headers });
  }
  if (typeof body.hold === "string" && QUESTION_IDS.has(body.hold)) {
    const q = body.hold;
    const entry = { on: body.on === true, by, at };
    const doc = await updateAnswers(FORM, (d) => {
      d.hold[q] = entry;
    }, { hold: q, ...entry });
    return NextResponse.json(doc, { headers });
  }
  return NextResponse.json({ error: "unknown_field" }, { status: 400, headers });
}
