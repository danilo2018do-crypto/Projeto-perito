export type CaseStatus = "em_andamento" | "concluido" | "aguardando" | "cancelado";

export interface CaseRecord {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  court: string;
  status: CaseStatus;
  createdAt: string;
  deadline: string;
  description: string;
  progress: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  type: "pessoa_fisica" | "pessoa_juridica";
  casesCount: number;
}

export interface Activity {
  id: string;
  caseId: string;
  caseTitle: string;
  description: string;
  date: string;
  type: "audiencia" | "relatorio" | "visita" | "documento" | "prazo";
}
