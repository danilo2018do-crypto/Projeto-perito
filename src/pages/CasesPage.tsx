import { useState } from "react";
import { cases } from "../data";
import { StatusBadge } from "../components/StatusBadge";
import type { CaseStatus } from "../types";

interface CasesPageProps {
  onOpenCase: (caseId: string) => void;
}

const filters: { key: CaseStatus | "todos"; label: string }[] = [
  { key: "todos", label: "Todas" },
  { key: "em_andamento", label: "Em Andamento" },
  { key: "aguardando", label: "Aguardando" },
  { key: "concluido", label: "Concluídas" },
  { key: "cancelado", label: "Canceladas" },
];

export function CasesPage({ onOpenCase }: CasesPageProps) {
  const [filter, setFilter] = useState<CaseStatus | "todos">("todos");
  const [search, setSearch] = useState("");

  const filtered = cases.filter((c) => {
    if (filter !== "todos" && c.status !== filter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.caseNumber.includes(search))
      return false;
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--neutral-900)" }}>
          Perícias
        </h1>
        <p style={{ color: "var(--neutral-500)", marginTop: "4px" }}>
          {filtered.length} caso(s) encontrado(s)
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar por título ou número do processo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "10px 16px",
            border: "1px solid var(--neutral-300)",
            borderRadius: "8px",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 500,
                background: filter === f.key ? "var(--primary-600)" : "white",
                color: filter === f.key ? "white" : "var(--neutral-600)",
                border: "1px solid var(--neutral-300)",
                transition: "all 0.2s ease",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => onOpenCase(c.id)}
            style={{
              background: "white",
              borderRadius: "var(--radius)",
              padding: "24px",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer",
              transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.8rem", color: "var(--neutral-400)", marginBottom: "4px" }}>
                  {c.caseNumber}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--neutral-900)", marginBottom: "6px" }}>
                  {c.title}
                </h3>
                <div style={{ fontSize: "0.85rem", color: "var(--neutral-500)" }}>
                  {c.client} · {c.court}
                </div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--neutral-500)", marginBottom: "6px" }}>
                <span>Progresso</span>
                <span>{c.progress}%</span>
              </div>
              <div style={{ height: "6px", background: "var(--neutral-200)", borderRadius: "999px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${c.progress}%`,
                    background: "var(--primary-500)",
                    borderRadius: "999px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
