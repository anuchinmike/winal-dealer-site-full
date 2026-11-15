import type { MontazhNode, MontazhSolution } from "@/data/montazh-panelej";
import styles from "./montazh.module.css";

export function NodeImage({
  node,
  solution,
  index = 0,
  sizes = "(max-width: 720px) 100vw, 40vw",
  className,
}: {
  node: MontazhNode;
  /** Картинка конкретного решения; без него — сводный список картинок точки. */
  solution?: MontazhSolution;
  index?: number;
  sizes?: string;
  className?: string;
}) {
  const list = solution?.images ?? node.images;
  const im = list[index] ?? list[0];
  const base = im.src.replace(/\.webp$/, "");
  return (
    <img
      className={className}
      src={im.src}
      srcSet={`${base}-640.webp 640w, ${im.src} 1200w`}
      sizes={sizes}
      alt={im.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

/** Заголовочный блок узла: тёмное стекло, по правилу Михаила для сцен (верхний правый угол). */
export function NodeTitleGlass({
  node,
  solution,
  compact = false,
}: {
  node: MontazhNode;
  solution?: MontazhSolution;
  compact?: boolean;
}) {
  return (
    <div
      className={`${styles.glassTitle} ${compact ? styles.glassTitleCompact : ""}`}
    >
      <span className={styles.glassKicker}>
        Узел {node.n} · {node.zone}
      </span>
      <strong className={styles.glassName}>
        {solution && node.solutions.length > 1
          ? `${node.title}: ${solution.name}`
          : node.title}
      </strong>
    </div>
  );
}

export function NodeProfiles({
  node,
  solution,
}: {
  node: MontazhNode;
  solution?: MontazhSolution;
}) {
  return (
    <ul className={styles.chips} aria-label="Профили WINAL в узле">
      {(solution?.profiles ?? node.profiles).map((p) => (
        <li key={p} className={styles.chip}>
          {p}
        </li>
      ))}
    </ul>
  );
}

export function NodeNav({
  onPrev,
  onNext,
  onClose,
  position,
  total,
}: {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  position: number;
  total: number;
}) {
  return (
    <div className={styles.nodeNav}>
      <button
        type="button"
        className={styles.navBtn}
        onClick={onPrev}
        aria-label="Предыдущий узел"
      >
        ←
      </button>
      <span className={styles.navCount}>
        {position} / {total}
      </span>
      <button
        type="button"
        className={styles.navBtn}
        onClick={onNext}
        aria-label="Следующий узел"
      >
        →
      </button>
      <button
        type="button"
        className={`${styles.navBtn} ${styles.navClose}`}
        onClick={onClose}
        aria-label="Закрыть узел"
      >
        ✕
      </button>
    </div>
  );
}

/** Переключатель решений внутри одной точки (сегменты, без анимации: это частое действие). */
export function SolutionTabs({
  node,
  current,
  onChange,
}: {
  node: MontazhNode;
  current: number;
  onChange: (i: number) => void;
}) {
  if (node.solutions.length < 2) return null;
  return (
    <div
      className={styles.solTabs}
      role="tablist"
      aria-label="Решения в этой точке"
    >
      {node.solutions.map((s, i) => (
        <button
          key={s.id}
          type="button"
          role="tab"
          aria-selected={i === current}
          className={`${styles.solTab} ${i === current ? styles.solTabOn : ""}`}
          onClick={() => onChange(i)}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}
