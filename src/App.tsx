import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { CasesPage } from "./pages/CasesPage";
import { CaseDetail } from "./pages/CaseDetail";
import { ClientsPage } from "./pages/ClientsPage";


export type View =
  | { name: "dashboard" }
  | { name: "cases" }
  | { name: "case-detail"; caseId: string }
  | { name: "clients" };

export default function App() {
  const [view, setView] = useState<View>({ name: "dashboard" });

  const openCase = (caseId: string) => setView({ name: "case-detail", caseId });

  const renderView = () => {
    switch (view.name) {
      case "dashboard":
        return <Dashboard onNavigate={setView} onOpenCase={openCase} />;
      case "cases":
        return <CasesPage onOpenCase={openCase} />;
      case "case-detail":
        return <CaseDetail caseId={view.caseId} onBack={() => setView({ name: "cases" })} />;
      case "clients":
        return <ClientsPage />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar current={view.name} onNavigate={setView} />
      <main style={{ flex: 1, minWidth: 0, padding: "32px 40px" }}>
        {renderView()}
      </main>
    </div>
  );
}


