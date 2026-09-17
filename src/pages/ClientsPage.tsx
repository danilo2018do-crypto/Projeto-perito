import { clients } from "../data";

export function ClientsPage() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--neutral-900)" }}>
          Clientes
        </h1>
        <p style={{ color: "var(--neutral-500)", marginTop: "4px" }}>
          {clients.length} cliente(s) cadastrado(s)
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--neutral-200)" }}>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Tipo</th>
              <th style={thStyle}>Documento</th>
              <th style={thStyle}>Contato</th>
              <th style={thStyle}>Perícias</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr
                key={c.id}
                style={{ borderBottom: "1px solid var(--neutral-100)", transition: "background 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--neutral-50)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={tdStyle}>
                  <div style={{ fontWeight: 600, color: "var(--neutral-800)" }}>{c.name}</div>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: "0.85rem", color: "var(--neutral-500)" }}>
                    {c.type === "pessoa_fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>{c.document}</span>
                </td>
                <td style={tdStyle}>
                  <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>{c.email}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--neutral-400)" }}>{c.phone}</div>
                </td>
                <td style={tdStyle}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 10px",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      background: "var(--primary-50)",
                      color: "var(--primary-700)",
                    }}
                  >
                    {c.casesCount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "16px 20px",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "var(--neutral-500)",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
};

const tdStyle: React.CSSProperties = {
  padding: "16px 20px",
};
