"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lightbulb,
  Loader2,
  Lock,
  MessageCircleQuestion,
  Paperclip,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import {
  buildIdeaLead,
  buildInitialLead,
  buildTriageLead,
  CONECTA_API_BASE,
  type ConectaCadastro,
  type ConectaIntent,
  type ConectaLead,
  type ConectaMessage,
  type ConectaVisual,
  generateConectaLeadId,
  isConectaCadastroValid,
} from "@/lib/conecta";
import { cn } from "@/lib/utils";

type Stage = "doors" | "gate" | "triage" | "idea" | "done";
type Door = "triagem_dor" | "ideia_conecta";
type Attachment = {
  name: string;
  type: string;
  size: number;
};

type ConectaExperienceProps = {
  ideaTypes: string[];
  industrialAreas: string[];
};

const initialForm = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  cargo: "",
  segmento: "",
};

const defaultAssistantMessage =
  "Ola! Eu ajudo o time tecnico da Dutex a entender o seu desafio. Pode contar o que esta acontecendo na operacao?";

async function callIA({
  modo,
  messages,
}: {
  modo: "triagem" | "resultado" | "ideia";
  messages: ConectaMessage[];
}) {
  const res = await fetch(`${CONECTA_API_BASE}/triagem-ia`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modo, messages }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.msg || data.erro || `HTTP ${res.status}`);
  }
  return data.resultado;
}

async function submitLead(lead: ConectaLead) {
  const res = await fetch(`${CONECTA_API_BASE}/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.erro) {
    throw new Error(data.erro || data.msg || `HTTP ${res.status}`);
  }
  return data;
}

function attachmentVisual(files: Attachment[]): ConectaVisual {
  return {
    desenho: false,
    anexos: files.map((file) => ({
      nome: file.name,
      tipo: file.type || "arquivo",
      kb: Math.round(file.size / 1024),
    })),
  };
}

function getReadbackText(result: Record<string, unknown> | null, fallback: string) {
  if (!result) return fallback;
  const keys = [
    "leitura_para_cliente",
    "resumo_dor",
    "resumo_ideia",
    "aplicacao_industrial",
    "proximo_passo",
  ];
  return keys
    .map((key) => result[key])
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .slice(0, 3)
    .join("\n\n") || fallback;
}

export default function ConectaExperience({
  ideaTypes,
  industrialAreas,
}: ConectaExperienceProps) {
  const leadId = useRef(generateConectaLeadId()).current;
  const [stage, setStage] = useState<Stage>("doors");
  const [selectedDoor, setSelectedDoor] = useState<Door>("triagem_dor");
  const [cadastro, setCadastro] = useState<ConectaCadastro | null>(null);
  const [doneLead, setDoneLead] = useState<ConectaLead | null>(null);
  const [readback, setReadback] = useState("");
  const [finalWarning, setFinalWarning] = useState("");

  function openGate(door: Door) {
    setSelectedDoor(door);
    setStage("gate");
  }

  async function handleGateSubmit(nextCadastro: ConectaCadastro) {
    const initialLead = buildInitialLead({
      leadId,
      intent: selectedDoor,
      cadastro: nextCadastro,
    });
    await submitLead(initialLead);
    setCadastro(nextCadastro);
    setStage(selectedDoor === "triagem_dor" ? "triage" : "idea");
  }

  function reset() {
    setStage("doors");
    setDoneLead(null);
    setReadback("");
    setFinalWarning("");
  }

  return (
    <div id="conecta-experience" className="scroll-mt-32">
      {stage === "doors" && <DoorPicker onPick={openGate} />}
      {stage === "gate" && (
        <GateForm
          intent={selectedDoor}
          onBack={() => setStage("doors")}
          onSubmit={handleGateSubmit}
        />
      )}
      {stage === "triage" && cadastro && (
        <TriageFlow
          cadastro={cadastro}
          leadId={leadId}
          onBack={reset}
          onDone={(lead, summary, warning) => {
            setDoneLead(lead);
            setReadback(summary);
            setFinalWarning(warning || "");
            setStage("done");
          }}
        />
      )}
      {stage === "idea" && cadastro && (
        <IdeaFlow
          cadastro={cadastro}
          leadId={leadId}
          ideaTypes={ideaTypes}
          industrialAreas={industrialAreas}
          onBack={reset}
          onDone={(lead, summary, warning) => {
            setDoneLead(lead);
            setReadback(summary);
            setFinalWarning(warning || "");
            setStage("done");
          }}
        />
      )}
      {stage === "done" && doneLead && (
        <DoneScreen
          lead={doneLead}
          readback={readback}
          warning={finalWarning}
          onHome={reset}
        />
      )}
    </div>
  );
}

function DoorPicker({ onPick }: { onPick: (door: Door) => void }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <DoorCard
        tone="blue"
        icon={<MessageCircleQuestion size={28} />}
        eyebrow="Triagem tecnica"
        title="Tenho um problema"
        description="Conte uma dor operacional, avaria, gargalo ou risco. A IA guia a conversa e organiza um briefing para a engenharia."
        button="Comecar triagem"
        onClick={() => onPick("triagem_dor")}
      />
      <DoorCard
        tone="green"
        icon={<Lightbulb size={28} />}
        eyebrow="Inovacao aberta"
        title="Tenho uma ideia"
        description="Envie uma proposta de produto, processo ou parceria com aplicacao industrial para analise do time Dutex."
        button="Enviar ideia"
        onClick={() => onPick("ideia_conecta")}
      />
    </div>
  );
}

function DoorCard({
  tone,
  icon,
  eyebrow,
  title,
  description,
  button,
  onClick,
}: {
  tone: "blue" | "green";
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  button: string;
  onClick: () => void;
}) {
  const isGreen = tone === "green";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group min-h-72 rounded-lg border p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl",
        isGreen
          ? "border-green-accent/30 bg-green-accent/10 hover:shadow-green-accent/10"
          : "border-primary/25 bg-primary/10 hover:shadow-primary/10"
      )}
    >
      <span
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center rounded-lg",
          isGreen ? "bg-green-accent text-dark" : "bg-primary text-white"
        )}
      >
        {icon}
      </span>
      <p
        className={cn(
          "mt-6 text-[10px] font-extrabold uppercase tracking-[3px]",
          isGreen ? "text-green-accent-dark" : "text-primary"
        )}
      >
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-gray-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-text">{description}</p>
      <span
        className={cn(
          "mt-7 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors",
          isGreen
            ? "bg-green-accent text-dark group-hover:bg-green-accent-dark"
            : "bg-primary text-white group-hover:bg-primary-dark"
        )}
      >
        {button}
        <ArrowRight size={16} />
      </span>
    </button>
  );
}

function GateForm({
  intent,
  onBack,
  onSubmit,
}: {
  intent: ConectaIntent;
  onBack: () => void;
  onSubmit: (cadastro: ConectaCadastro) => Promise<void>;
}) {
  const [form, setForm] = useState(initialForm);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const cadastro = useMemo<ConectaCadastro>(
    () => ({
      ...form,
      consentimento_lgpd: consent,
      data_consentimento: consent ? new Date().toISOString() : "",
    }),
    [form, consent]
  );
  const isValid = isConectaCadastroValid(cadastro);

  async function submit() {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(cadastro);
    } catch {
      setError(
        "Nao conseguimos registrar seu contato agora. Tente novamente em instantes."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton onClick={onBack} />
      <div className="rounded-lg border border-gray-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[2px] text-primary">
          <Lock size={13} />
          Seu contato fica so com a Dutex
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {intent === "ideia_conecta"
            ? "Antes de enviar sua ideia"
            : "Antes de comecar a triagem"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-text">
          Um cadastro rapido libera a ferramenta e garante que a equipe Dutex
          consiga retornar sobre o que voce trouxe.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field label="Nome" value={form.nome} onChange={(nome) => setForm((f) => ({ ...f, nome }))} />
          <Field label="Empresa" value={form.empresa} onChange={(empresa) => setForm((f) => ({ ...f, empresa }))} />
          <Field label="E-mail" type="email" value={form.email} onChange={(email) => setForm((f) => ({ ...f, email }))} />
          <Field label="Telefone / WhatsApp" value={form.telefone} onChange={(telefone) => setForm((f) => ({ ...f, telefone }))} />
          <Field label="Cargo" value={form.cargo} onChange={(cargo) => setForm((f) => ({ ...f, cargo }))} />
          <Field label="Segmento" value={form.segmento} onChange={(segmento) => setForm((f) => ({ ...f, segmento }))} />
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-gray-border bg-gray-light p-4 text-xs leading-relaxed text-gray-text">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-primary"
          />
          <span>
            Autorizo a Dutex a tratar estes dados para avaliar e responder meu
            contato, conforme a LGPD. Posso solicitar exclusao a qualquer
            momento.
          </span>
        </label>

        <TrustLine />

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <Button
          type="button"
          size="lg"
          className="mt-6 w-full justify-center"
          disabled={!isValid || submitting}
          onClick={submit}
        >
          {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
          {intent === "ideia_conecta" ? "Continuar para a ideia" : "Continuar para a triagem"}
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}

function TriageFlow({
  cadastro,
  leadId,
  onBack,
  onDone,
}: {
  cadastro: ConectaCadastro;
  leadId: string;
  onBack: () => void;
  onDone: (lead: ConectaLead, readback: string, warning?: string) => void;
}) {
  const [messages, setMessages] = useState<ConectaMessage[]>([
    { role: "assistant", content: defaultAssistantMessage },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [building, setBuilding] = useState(false);
  const [files, setFiles] = useState<Attachment[]>([]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || thinking) return;
    const next: ConectaMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setThinking(true);
    try {
      const reply = await callIA({ modo: "triagem", messages: next });
      setMessages((current) => [
        ...current,
        { role: "assistant", content: typeof reply === "string" ? reply : JSON.stringify(reply) },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Tive um problema para responder agora. Tente enviar novamente; sua mensagem anterior ficou registrada na conversa.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  async function finalize() {
    setBuilding(true);
    const transcript = messages
      .map((message) => `${message.role === "user" ? "Cliente" : "Dutex"}: ${String(message.content)}`)
      .join("\n");
    let result: Record<string, unknown> = {};
    try {
      const response = await callIA({
        modo: "resultado",
        messages: [
          {
            role: "user",
            content: `Transcricao da triagem:\n${transcript}`,
          },
        ],
      });
      result = typeof response === "object" && response !== null ? response as Record<string, unknown> : { leitura_para_cliente: response };
    } catch {
      result = {
        leitura_para_cliente:
          "Recebemos sua descricao. O time tecnico da Dutex vai analisar o contexto e retornar com proximos passos.",
        resumo_dor: "Revisar a transcricao manualmente.",
      };
    }

    const lead = buildTriageLead({
      leadId,
      cadastro,
      result,
      messages,
      visual: attachmentVisual(files),
    });
    let warning = "";
    try {
      await submitLead(lead);
    } catch {
      warning = "A conclusao apareceu na tela, mas o enriquecimento final nao foi confirmado pelo servidor.";
    }
    setBuilding(false);
    onDone(
      lead,
      getReadbackText(
        result,
        "Recebemos seu desafio. A equipe Dutex vai analisar o contexto tecnico e retornar."
      ),
      warning
    );
  }

  const userTurns = messages.filter((message) => message.role === "user").length;

  return (
    <ToolShell
      title="Triagem guiada"
      description="Converse com a IA para organizar o desafio antes de enviar ao time tecnico."
      onBack={onBack}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <div className="rounded-lg border border-gray-border bg-white p-4">
          <div className="flex h-[420px] flex-col gap-3 overflow-y-auto rounded-lg bg-gray-light p-4">
            {messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
            {thinking && (
              <div className="inline-flex items-center gap-2 text-sm text-gray-text">
                <Loader2 size={15} className="animate-spin" />
                Analisando...
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Descreva a dor, o produto, a etapa ou o risco..."
              className="min-w-0 flex-1 rounded-lg border border-gray-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
            <Button type="button" onClick={sendMessage} disabled={!input.trim() || thinking}>
              <Send size={16} />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <Attachments files={files} setFiles={setFiles} />
          <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[2px] text-primary">
              Encerramento
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-text">
              Quando a conversa tiver contexto suficiente, gere a devolutiva e
              envie o briefing para a Dutex.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-4 w-full justify-center"
              disabled={userTurns < 1 || building}
              onClick={finalize}
            >
              {building ? <Loader2 size={18} className="animate-spin" /> : null}
              Gerar devolutiva
            </Button>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

function IdeaFlow({
  cadastro,
  leadId,
  ideaTypes,
  industrialAreas,
  onBack,
  onDone,
}: {
  cadastro: ConectaCadastro;
  leadId: string;
  ideaTypes: string[];
  industrialAreas: string[];
  onBack: () => void;
  onDone: (lead: ConectaLead, readback: string, warning?: string) => void;
}) {
  const [tipo, setTipo] = useState(ideaTypes[0] || "Novo produto industrial");
  const [area, setArea] = useState(industrialAreas[0] || "Protecao industrial");
  const [problema, setProblema] = useState("");
  const [solucao, setSolucao] = useState("");
  const [estagio, setEstagio] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const canSubmit = problema.trim().length > 0 && solucao.trim().length > 0;

  async function submit() {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    const idea = {
      tipo_ideia: tipo,
      area_relacionada: area,
      problema,
      solucao,
      estagio: estagio || "nao informado",
    };
    let result: Record<string, unknown> = {};
    try {
      const response = await callIA({
        modo: "ideia",
        messages: [
          {
            role: "user",
            content: `Tipo: ${tipo}\nArea: ${area}\nProblema que resolve: ${problema}\nSolucao proposta: ${solucao}\nEstagio atual: ${estagio || "nao informado"}`,
          },
        ],
      });
      result = typeof response === "object" && response !== null ? response as Record<string, unknown> : { resumo_ideia: response };
    } catch {
      result = {
        resumo_ideia: problema,
        aplicacao_industrial: area,
        encaixe_dutex: "avaliacao manual pelo time Dutex",
        proximo_passo: "Triagem de fit pela engenharia",
      };
    }

    const lead = buildIdeaLead({
      leadId,
      cadastro,
      idea,
      result,
      visual: attachmentVisual(files),
    });
    let warning = "";
    try {
      await submitLead(lead);
    } catch {
      warning = "A conclusao apareceu na tela, mas o enriquecimento final nao foi confirmado pelo servidor.";
    }
    setSubmitting(false);
    onDone(
      lead,
      getReadbackText(
        result,
        "Recebemos sua ideia. A equipe Dutex vai avaliar aderencia industrial e retornar."
      ),
      warning
    );
  }

  return (
    <ToolShell
      title="Envio de ideia"
      description="Estruture a proposta para que o time de inovacao e engenharia consiga avaliar o fit."
      onBack={onBack}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4 rounded-lg border border-gray-border bg-white p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Tipo de ideia" value={tipo} onChange={setTipo} options={ideaTypes} />
            <Select label="Area relacionada" value={area} onChange={setArea} options={industrialAreas} />
          </div>
          <TextArea
            label="Qual problema resolve?"
            value={problema}
            onChange={setProblema}
            placeholder="Descreva a dor, risco, gargalo ou oportunidade."
          />
          <TextArea
            label="Como funciona a solucao?"
            value={solucao}
            onChange={setSolucao}
            placeholder="Explique a proposta, material, processo ou aplicacao."
            rows={5}
          />
          <TextArea
            label="Estagio atual"
            value={estagio}
            onChange={setEstagio}
            placeholder="Ideia, desenho, prototipo, fornecedor atual, uso real..."
          />
          <TrustLine />
          <Button
            type="button"
            size="lg"
            className="justify-center"
            disabled={!canSubmit || submitting}
            onClick={submit}
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
            Enviar ao time Dutex
            <ArrowRight size={16} />
          </Button>
        </div>
        <Attachments files={files} setFiles={setFiles} />
      </div>
    </ToolShell>
  );
}

function DoneScreen({
  lead,
  readback,
  warning,
  onHome,
}: {
  lead: ConectaLead;
  readback: string;
  warning: string;
  onHome: () => void;
}) {
  return (
    <div className="rounded-lg border border-green-accent/30 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-accent/15 text-green-accent-dark">
          <CheckCircle2 size={28} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-[3px] text-green-accent-dark">
            Protocolo {lead.lead_id}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            Enviado ao time {lead.intent === "triagem_dor" ? "tecnico" : "de inovacao"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-text">
            Chegou a Dutex. Em breve a equipe retorna pelo contato informado.
          </p>
          <div className="mt-6 rounded-lg border border-gray-border bg-gray-light p-5">
            <p className="text-xs font-bold uppercase tracking-[2px] text-primary">
              O que entendemos
            </p>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-800">
              {readback}
            </p>
          </div>
          {warning && <p className="mt-4 text-sm text-yellow-700">{warning}</p>}
          <Button type="button" className="mt-6" onClick={onHome}>
            Voltar ao inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

function ToolShell({
  title,
  description,
  onBack,
  children,
}: {
  title: string;
  description: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <BackButton onClick={onBack} />
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-text">{description}</p>
      </div>
      {children}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-text transition-colors hover:text-primary"
    >
      <ArrowLeft size={16} />
      Voltar
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[1px] text-gray-text">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-border bg-white px-4 py-3 text-sm text-gray-900 focus:border-primary focus:outline-none"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[1px] text-gray-text">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-border bg-white px-4 py-3 text-sm text-gray-900 focus:border-primary focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[1px] text-gray-text">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-lg border border-gray-border bg-white px-4 py-3 text-sm text-gray-900 focus:border-primary focus:outline-none"
      />
    </label>
  );
}

function ChatBubble({ message }: { message: ConectaMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[86%] rounded-lg px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-primary text-white" : "bg-white text-gray-800"
        )}
      >
        {String(message.content)}
      </div>
    </div>
  );
}

function Attachments({
  files,
  setFiles,
}: {
  files: Attachment[];
  setFiles: React.Dispatch<React.SetStateAction<Attachment[]>>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function pickFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const next = Array.from(event.target.files || []).map((file) => ({
      name: file.name,
      type: file.type || "arquivo",
      size: file.size,
    }));
    setFiles((current) => [...current, ...next]);
    event.target.value = "";
  }

  return (
    <div className="rounded-lg border border-gray-border bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[2px] text-gray-text">
        Anexos opcionais
      </p>
      <p className="mt-1 text-xs leading-relaxed text-gray-text">
        Adicione fotos ou arquivos para ajudar a equipe tecnica.
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-border bg-gray-light px-4 py-4 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary"
      >
        <Paperclip size={16} />
        Adicionar arquivo
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.dwg,.dxf,.step,.stp"
        onChange={pickFiles}
        className="hidden"
      />
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-border px-3 py-2"
            >
              <FileText size={16} className="shrink-0 text-gray-text" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-text">{Math.round(file.size / 1024)} KB</p>
              </div>
              <button
                type="button"
                onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
                className="rounded p-1 text-gray-text hover:bg-gray-light hover:text-primary"
                aria-label="Remover anexo"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TrustLine() {
  return (
    <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-gray-text">
      <ShieldCheck size={15} className="mt-0.5 shrink-0 text-green-accent-dark" />
      <span>
        Suas informacoes sao confidenciais e analisadas apenas pela equipe
        tecnica Dutex. Consulte nossa pagina de{" "}
        <Link href="/compliance" className="font-semibold text-primary underline">
          compliance
        </Link>
        .
      </span>
    </p>
  );
}
