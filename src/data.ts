import type { CaseRecord, Client, Activity } from "./types";

export const cases: CaseRecord[] = [
  {
    id: "1",
    caseNumber: "0012345-56.2024.8.26.0100",
    title: "Perícia de Inspeção Predial — Edifício Aurora",
    client: "Condomínio Edifício Aurora",
    court: "1ª Vara Cível — São Paulo/SP",
    status: "em_andamento",
    createdAt: "2024-08-15",
    deadline: "2024-12-20",
    description:
      "Inspeção técnica em edifício residencial para verificação de patologias construtivas e vícios na estrutura.",
    progress: 65,
  },
  {
    id: "2",
    caseNumber: "0029876-33.2024.8.26.0224",
    title: "Avaliação de Imóvel Rural",
    client: "Fazenda Boa Vista Ltda.",
    court: "2ª Vara Cível — Guarulhos/SP",
    status: "aguardando",
    createdAt: "2024-09-01",
    deadline: "2025-01-15",
    description:
      "Avaliação de imóvel rural para fins de partilha em inventário. Área de 120 hectares.",
    progress: 20,
  },
  {
    id: "3",
    caseNumber: "0034521-10.2023.8.26.0050",
    title: "Perícia Contábil — Indenização Trabalhista",
    client: "José Carlos Mendes",
    court: "3ª Vara do Trabalho — São Paulo/SP",
    status: "concluido",
    createdAt: "2023-11-10",
    deadline: "2024-03-05",
    description:
      "Perícia contábil para apuração de verbas rescisórias e diferenças salariais em ação trabalhista.",
    progress: 100,
  },
  {
    id: "4",
    caseNumber: "0047890-22.2024.8.26.0100",
    title: "Vistoria de Veículo — Sinistro",
    client: "Maria Aparecida Souza",
    court: "Juizado Especial Cível — São Paulo/SP",
    status: "em_andamento",
    createdAt: "2024-09-20",
    deadline: "2024-11-30",
    description:
      "Vistoria técnica de veículo para apuração de danos materiais em colisão.",
    progress: 45,
  },
  {
    id: "5",
    caseNumber: "0056789-44.2024.8.26.0300",
    title: "Perícia de Engenharia Civil — Atraso de Obra",
    client: "Construtora Horizonte S/A",
    court: "4ª Vara Cível — Campinas/SP",
    status: "cancelado",
    createdAt: "2024-07-05",
    deadline: "2024-10-01",
    description:
      "Perícia para verificação de atraso em entrega de obra residencial e apuração de responsabilidade.",
    progress: 30,
  },
];

export const clients: Client[] = [
  {
    id: "1",
    name: "Condomínio Edifício Aurora",
    email: "sindico@aurora.com.br",
    phone: "(11) 3456-7890",
    document: "12.345.678/0001-90",
    type: "pessoa_juridica",
    casesCount: 1,
  },
  {
    id: "2",
    name: "Fazenda Boa Vista Ltda.",
    email: "contato@boavista.com.br",
    phone: "(11) 9876-5432",
    document: "98.765.432/0001-10",
    type: "pessoa_juridica",
    casesCount: 1,
  },
  {
    id: "3",
    name: "José Carlos Mendes",
    email: "jose.mendes@email.com",
    phone: "(11) 91234-5678",
    document: "123.456.789-00",
    type: "pessoa_fisica",
    casesCount: 1,
  },
  {
    id: "4",
    name: "Maria Aparecida Souza",
    email: "maria.souza@email.com",
    phone: "(11) 99876-5432",
    document: "987.654.321-00",
    type: "pessoa_fisica",
    casesCount: 1,
  },
  {
    id: "5",
    name: "Construtora Horizonte S/A",
    email: "juridico@horizonte.com.br",
    phone: "(19) 3456-7890",
    document: "45.678.901/0001-23",
    type: "pessoa_juridica",
    casesCount: 1,
  },
];

export const activities: Activity[] = [
  {
    id: "1",
    caseId: "1",
    caseTitle: "Perícia de Inspeção Predial — Edifício Aurora",
    description: "Visita técnica ao local realizada. Documentação fotográfica coletada.",
    date: "2024-09-25",
    type: "visita",
  },
  {
    id: "2",
    caseId: "1",
    caseTitle: "Perícia de Inspeção Predial — Edifício Aurora",
    description: "Audiência de conciliação designada para 15/10/2024.",
    date: "2024-09-20",
    type: "audiencia",
  },
  {
    id: "3",
    caseId: "2",
    caseTitle: "Avaliação de Imóvel Rural",
    description: "Aguardando liberação de acesso ao imóvel pela parte contrária.",
    date: "2024-09-18",
    type: "prazo",
  },
  {
    id: "4",
    caseId: "4",
    caseTitle: "Vistoria de Veículo — Sinistro",
    description: "Laudo preliminar enviado para análise das partes.",
    date: "2024-09-22",
    type: "relatorio",
  },
  {
    id: "5",
    caseId: "3",
    caseTitle: "Perícia Contábil — Indenização Trabalhista",
    description: "Laudo final protocolado nos autos.",
    date: "2024-03-01",
    type: "documento",
  },
];

export function getCaseById(id: string): CaseRecord | undefined {
  return cases.find((c) => c.id === id);
}

export function getActivitiesByCaseId(caseId: string): Activity[] {
  return activities.filter((a) => a.caseId === caseId);
}
