import type { CaseStatus } from "../types";

const statusConfig: Record<CaseStatus, { label: string; bg: string; color: string }> = {
  em_andamento: { label: "Em Andamento", bg: "var(--primary-50)", color: "var(--primary-700)" },
  concluido: { label: "Concluído", bg: "var(--success-50)", color: "var(--success-500)" },
  aguardando: { label: "Aguardando", bg: "var(--warning-50)", color: "var(--warning-500)" },
  cancelado: { label: "Cancelado", bg: "var(--error-50)", color: "var(--error-500)" },
};

export function StatusBadge({ status }: { status: CaseStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "0.8rem",
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}
