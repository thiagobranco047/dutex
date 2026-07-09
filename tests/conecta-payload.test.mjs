import assert from "node:assert/strict";
import test from "node:test";
import {
  buildIdeaLead,
  buildInitialLead,
  buildTriageLead,
  generateConectaLeadId,
  isConectaCadastroValid,
} from "../lib/conecta.ts";

const cadastro = {
  nome: "Ana Souza",
  empresa: "Metal Brasil",
  email: "ana@example.com",
  telefone: "+55 47 99999-0000",
  cargo: "Engenharia",
  segmento: "Siderurgia",
  consentimento_lgpd: true,
  data_consentimento: "2026-07-09T12:00:00.000Z",
};

test("generateConectaLeadId returns the Dutex protocol format", () => {
  assert.match(generateConectaLeadId(), /^DTX-[A-Z0-9]{5}$/);
});

test("isConectaCadastroValid requires LGPD consent and core contact fields", () => {
  assert.equal(isConectaCadastroValid(cadastro), true);
  assert.equal(
    isConectaCadastroValid({ ...cadastro, consentimento_lgpd: false }),
    false
  );
  assert.equal(isConectaCadastroValid({ ...cadastro, email: "ana" }), false);
});

test("buildInitialLead captures a new contact before the tool opens", () => {
  const lead = buildInitialLead({
    leadId: "DTX-ABCDE",
    intent: "triagem_dor",
    cadastro,
  });

  assert.equal(lead.lead_id, "DTX-ABCDE");
  assert.equal(lead.intent, "triagem_dor");
  assert.equal(lead.origem, "Dutex Conecta (web)");
  assert.deepEqual(lead.conteudo, {});
  assert.equal(lead.cadastro.consentimento_lgpd, true);
  assert.equal(lead.roteamento.status_lead, "novo_contato_capturado");
});

test("buildTriageLead enriches the same lead with result and transcript", () => {
  const lead = buildTriageLead({
    leadId: "DTX-ABCDE",
    cadastro,
    result: { resumo_dor: "Avarias no transporte", prioridade_sugerida: "alta" },
    messages: [{ role: "user", content: "Tenho avarias." }],
    visual: { desenho: false, anexos: [] },
  });

  assert.equal(lead.lead_id, "DTX-ABCDE");
  assert.equal(lead.intent, "triagem_dor");
  assert.equal(lead.conteudo.resumo_dor, "Avarias no transporte");
  assert.equal(lead.roteamento.status_lead, "triagem_concluida");
  assert.equal(lead.roteamento.prioridade, "alta");
  assert.equal(lead.transcricao?.[0].content, "Tenho avarias.");
});

test("buildIdeaLead enriches the same lead with structured idea content", () => {
  const lead = buildIdeaLead({
    leadId: "DTX-ABCDE",
    cadastro,
    idea: {
      tipo_ideia: "Novo produto industrial",
      area_relacionada: "Protecao industrial",
      problema: "Risco no manuseio",
      solucao: "Protetor customizado",
      estagio: "protótipo",
    },
    result: { resumo_ideia: "Protetor para manuseio", proximo_passo: "Avaliar fit" },
    visual: { desenho: false, anexos: [] },
  });

  assert.equal(lead.lead_id, "DTX-ABCDE");
  assert.equal(lead.intent, "ideia_conecta");
  assert.equal(lead.conteudo.problema, "Risco no manuseio");
  assert.equal(lead.conteudo.resumo_ideia, "Protetor para manuseio");
  assert.equal(lead.roteamento.status_lead, "ideia_enviada");
});
