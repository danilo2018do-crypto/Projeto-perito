import type { View } from "../App";
import { cases, activities } from "../data";
import { StatusBadge } from "../components/StatusBadge";

interface DashboardProps {
  onNavigate: (view: View) => void;
  onOpenCase: (caseId: string) => void;
}

export function Dashboard({ onNavigate, onOpenCase }: DashboardProps) {
  const emAndamento = cases.filter((c) => c.status === "em_andamento").length;
  const concluidos = cases.filter((c) => c.status === "concluido").length;
  const aguardando = cases.filter((c) => c.status === "aguardando").length;
  const total = cases.length;

  const recentActivities = [...activities]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const upcomingCases = cases
    .filter((c) => c.status === "em_andamento" || c.status === "aguardando")
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 4);

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--neutral-900)" }}>
          Painel
        </h1>
        <p style={{ color: "var(--neutral-500)", marginTop: "4px" }}>
          Visão geral das perícias judiciais
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <StatCard label="Total de Perícias" value={total} color="var(--primary-500)" />
        <StatCard label="Em Andamento" value={emAndamento} color="var(--primary-600)" />
        <StatCard label="Aguardando" value={aguardando} color="var(--warning-500)" />
        <StatCard label="Concluídas" value={concluidos} color="var(--success-500)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius)",
            padding: "24px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--neutral-800)" }}>
              Prazos Próximos
            </h2>
            <button
              onClick={() => onNavigate({ name: "cases" })}
              style={{
                color: "var(--primary-600)",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              Ver todas →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {upcomingCases.map((c) => (
              <div
                key={c.id}
                onClick={() => onOpenCase(c.id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 16px",
                  borderRadius: "8px",
                  background: "var(--neutral-50)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "var(--neutral-800)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--neutral-500)", marginTop: "2px" }}>
                    Prazo: {formatDate(c.deadline)}
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "var(--radius)",
            padding: "24px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--neutral-800)", marginBottom: "20px" }}>
            Atividades Recentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentActivities.map((a) => (
              <div key={a.id} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--primary-500)",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--neutral-800)", fontWeight: 500 }}>
                    {a.description}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--neutral-400)", marginTop: "2px" }}>
                    {formatDate(a.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "var(--radius)",
        padding: "24px",
        boxShadow: "var(--shadow-sm)",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div style={{ fontSize: "0.85rem", color: "var(--neutral-500)", marginBottom: "8px" }}>
        {label}
      </div>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--neutral-900)" }}>{value}</div>
    </div>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
