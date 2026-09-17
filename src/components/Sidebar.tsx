import type { View } from "../App";

interface SidebarProps {
  current: View["name"];
  onNavigate: (view: View) => void;
}

const menuItems: { key: View["name"]; label: string; icon: string }[] = [
  { key: "dashboard", label: "Painel", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { key: "cases", label: "Perícias", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { key: "clients", label: "Clientes", icon: "M17 20h5v-2a3 3 0 00-5.357-2M17 20H7m10 0v-2a3 3 0 00-.357-2M7 20H2v-2a3 3 0 015.357-2M7 20v-2a3 3 0 01.357-2m0 0a3 3 0 015.286 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

export function Sidebar({ current, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{
        width: "260px",
        background: "var(--neutral-900)",
        color: "var(--neutral-300)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        padding: "24px 0",
      }}
    >
      <div
        style={{
          padding: "0 24px 28px",
          borderBottom: "1px solid var(--neutral-800)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "var(--primary-500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "white",
            fontSize: "1.25rem",
          }}
        >
          P
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "white", fontSize: "1.05rem" }}>
            Projeto Perito
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--neutral-500)" }}>
            Gestão de Perícias
          </div>
        </div>
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {menuItems.map((item) => {
          const active = current === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate({ name: item.key } as View)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                width: "100%",
                marginBottom: "4px",
                color: active ? "white" : "var(--neutral-400)",
                background: active ? "var(--primary-600)" : "transparent",
                fontWeight: active ? 600 : 400,
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--neutral-800)",
          fontSize: "0.8rem",
          color: "var(--neutral-500)",
        }}
      >
        © 2024 Projeto Perito
      </div>
    </aside>
  );
}
