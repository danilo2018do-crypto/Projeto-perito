import { getCaseById, getActivitiesByCaseId } from "../data";
import { StatusBadge } from "../components/StatusBadge";

interface CaseDetailProps {
  caseId: string;
  onBack: () => void;
}

const activityTypeLabels: Record<string, string> = {
  audiencia: "Audiência",
  relatorio: "Relatório",
  visita: "Visita Técnica",
  documento: "Documento",
  prazo: "Prazo",
};

export function CaseDetail({ caseId, onBack }: CaseDetailProps) {
  const caseRecord = getCaseById(caseId);

  if (!caseRecord) {
    return (
      <div>
        <button onClick={onBack} style={{ color: "var(--primary-600)", marginBottom: "16px" }}>
          ← Voltar
        </button>
        <p>Perícia não encontrada.</p>
      </div>
    );
  }

  const caseActivities = getActivitiesByCaseId(caseId);

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          color: "var(--primary-600)",
          marginBottom: "24px",
          fontSize: "0.9rem",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        ← Voltar para Perícias
      </button>

      <div
        style={{
          background: "white",
          borderRadius: "var(--radius)",
          padding: "32px",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--neutral-400)", marginBottom: "6px" }}>
              {caseRecord.caseNumber}
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--neutral-900)" }}>
              {caseRecord.title}
            </h1>
          </div>
          <StatusBadge status={caseRecord.status} />
        </div>

        <p style={{ color: "var(--neutral-600)", lineHeight: 1.6, marginBottom: "24px" }}>
          {caseRecord.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            paddingTop: "24px",
            borderTop: "1px solid var(--neutral-200)",
          }}
        >
          <InfoField label="Cliente" value={caseRecord.client} />
          <InfoField label="Vara" value={caseRecord.court} />
          <InfoField label="Aberto em" value={formatDate(caseRecord.createdAt)} />
          <InfoField label="Prazo" value={formatDate(caseRecord.deadline)} />
        </div>

        <div style={{ marginTop: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--neutral-500)", marginBottom: "8px" }}>
            <span>Progresso</span>
            <span>{caseRecord.progress}%</span>
          </div>
          <div style={{ height: "8px", background: "var(--neutral-200)", borderRadius: "999px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${caseRecord.progress}%`,
                background: "var(--primary-500)",
                borderRadius: "999px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "var(--radius)",
          padding: "32px",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--neutral-800)", marginBottom: "24px" }}>
          Histórico de Atividades
        </h2>
        {caseActivities.length === 0 ? (
          <p style={{ color: "var(--neutral-400)" }}>Nenhuma atividade registrada.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {caseActivities.map((a, i) => (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  paddingBottom: i < caseActivities.length - 1 ? "20px" : "0",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "var(--primary-500)",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  />
                  {i < caseActivities.length - 1 && (
                    <div
                      style={{
                        width: "2px",
                        flex: 1,
                        background: "var(--neutral-200)",
                        marginTop: "4px",
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: i < caseActivities.length - 1 ? "0" : "0" }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "2px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      background: "var(--primary-50)",
                      color: "var(--primary-700)",
                      marginBottom: "6px",
                    }}
                  >
                    {activityTypeLabels[a.type] || a.type}
                  </div>
                  <div style={{ color: "var(--neutral-700)", fontSize: "0.9rem", marginBottom: "2px" }}>
                    {a.description}
                  </div>
                  <div style={{ color: "var(--neutral-400)", fontSize: "0.8rem" }}>
                    {formatDate(a.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: "0.8rem", color: "var(--neutral-400)", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "0.95rem", color: "var(--neutral-800)", fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
