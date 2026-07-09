export const CONECTA_API_BASE = "https://api.dutex.ind.br/api/conecta";
export const CONECTA_ORIGIN = "Dutex Conecta (web)";

export type ConectaIntent = "triagem_dor" | "ideia_conecta";
export type ConectaMode = "triagem" | "resultado" | "ideia";

export type ConectaMessage = {
  role: "user" | "assistant";
  content: string | unknown[];
};

export type ConectaCadastro = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  cargo?: string;
  segmento?: string;
  consentimento_lgpd: boolean;
  data_consentimento: string;
};

export type ConectaAttachment = {
  nome: string;
  tipo: string;
  kb: number;
};

export type ConectaVisual = {
  desenho: boolean;
  anexos: ConectaAttachment[];
};

export type ConectaLead = {
  lead_id: string;
  intent: ConectaIntent;
  origem: typeof CONECTA_ORIGIN;
  data: string;
  cadastro: ConectaCadastro;
  conteudo: Record<string, unknown>;
  visual: ConectaVisual;
  roteamento: {
    time: string;
    prioridade?: string;
    status_lead: string;
  };
  transcricao?: ConectaMessage[];
};

type InitialLeadInput = {
  leadId: string;
  intent: ConectaIntent;
  cadastro: ConectaCadastro;
};

type TriageLeadInput = {
  leadId: string;
  cadastro: ConectaCadastro;
  result: Record<string, unknown>;
  messages: ConectaMessage[];
  visual: ConectaVisual;
};

type IdeaLeadInput = {
  leadId: string;
  cadastro: ConectaCadastro;
  idea: Record<string, unknown>;
  result?: Record<string, unknown> | null;
  visual: ConectaVisual;
};

export function generateConectaLeadId() {
  const token = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `DTX-${token.padEnd(5, "0").slice(0, 5)}`;
}

export function isConectaCadastroValid(cadastro: ConectaCadastro) {
  return Boolean(
    cadastro.nome.trim() &&
      cadastro.empresa.trim() &&
      /^\S+@\S+\.\S+$/.test(cadastro.email) &&
      cadastro.telefone.replace(/\D/g, "").length >= 10 &&
      cadastro.consentimento_lgpd
  );
}

export function buildInitialLead({
  leadId,
  intent,
  cadastro,
}: InitialLeadInput): ConectaLead {
  return {
    lead_id: leadId,
    intent,
    origem: CONECTA_ORIGIN,
    data: new Date().toISOString(),
    cadastro,
    conteudo: {},
    visual: { desenho: false, anexos: [] },
    roteamento: {
      time: intent === "ideia_conecta" ? "Inovacao + Engenharia" : "Comercial + Engenharia",
      prioridade: "a definir",
      status_lead: "novo_contato_capturado",
    },
  };
}

export function buildTriageLead({
  leadId,
  cadastro,
  result,
  messages,
  visual,
}: TriageLeadInput): ConectaLead {
  return {
    lead_id: leadId,
    intent: "triagem_dor",
    origem: CONECTA_ORIGIN,
    data: new Date().toISOString(),
    cadastro,
    conteudo: result,
    visual,
    roteamento: {
      time: "Comercial + Engenharia",
      prioridade:
        typeof result.prioridade_sugerida === "string"
          ? result.prioridade_sugerida
          : "a definir",
      status_lead: "triagem_concluida",
    },
    transcricao: messages,
  };
}

export function buildIdeaLead({
  leadId,
  cadastro,
  idea,
  result,
  visual,
}: IdeaLeadInput): ConectaLead {
  return {
    lead_id: leadId,
    intent: "ideia_conecta",
    origem: CONECTA_ORIGIN,
    data: new Date().toISOString(),
    cadastro,
    conteudo: {
      ...idea,
      ...(result ?? {}),
    },
    visual,
    roteamento: {
      time: "Inovacao + Engenharia",
      prioridade: "a definir",
      status_lead: "ideia_enviada",
    },
  };
}
