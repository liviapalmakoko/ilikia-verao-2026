// Envio de lead — RD Station Marketing v1.3 + tracking global ILIKIA.
// Mesmo padrao das outras LPs da conta (nanogen, upfacial, upfull, stiim,
// upmax, aptos): mesmo token publico do RD, identificador proprio por LP,
// e o Lead espelhado pro gateway `track-ilikia.koko.ag` (Pixel + CAPI).

export const RD_PUBLIC_TOKEN = "61d98fcb65995325460b68f98e0995fe";
export const RD_IDENTIFIER = "verao-2026-lp-koko";
export const FORM_NAME = "verao-2026-apresentacao";

const RD_ENDPOINT = "https://www.rdstation.com.br/api/1.3/conversions";

// Atribuicao: guarda a origem da PRIMEIRA visita por 30 dias, pra o lead
// chegar no RD com a campanha certa mesmo se a pessoa converter depois.
const TRACKING_KEY = "ilikia_verao_tracking_v1";
const TRACKING_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
const CLICK_IDS = ["gclid", "fbclid", "gbraid", "wbraid", "msclkid", "ttclid"] as const;

type TrackingData = Record<string, string> & { savedAt?: number };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    trk?: {
      lead: (
        user: Record<string, string>,
        custom?: Record<string, string>,
      ) => void;
    };
  }
}

export function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&");
  const match = document.cookie.match(new RegExp("(?:^|; )" + escaped + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : "";
}

export function slugify(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readTracking(): TrackingData {
  try {
    const raw = localStorage.getItem(TRACKING_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as TrackingData;
    if (parsed.savedAt && Date.now() - parsed.savedAt > TRACKING_TTL_MS) {
      localStorage.removeItem(TRACKING_KEY);
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
}

/** Chamar uma vez no carregamento da pagina. */
export function captureTracking() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: TrackingData = {};
    [...UTM_KEYS, ...CLICK_IDS].forEach((key) => {
      const value = params.get(key);
      if (value) incoming[key] = value;
    });

    const stored = readTracking();
    // Sem parametro novo na URL, a primeira origem gravada prevalece.
    if (!Object.keys(incoming).length && Object.keys(stored).length) return;

    localStorage.setItem(
      TRACKING_KEY,
      JSON.stringify({
        ...stored,
        ...incoming,
        referrer: stored.referrer || document.referrer || "",
        landing_page: stored.landing_page || window.location.href,
        savedAt: Date.now(),
      }),
    );
  } catch {
    // localStorage bloqueado (aba anonima / cookies off): segue sem atribuicao.
  }
}

export type LeadData = {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  especialidade: string;
  registro: string;
  cidade: string;
  estado: string;
  consentimento: boolean;
};

export async function submitLead(data: LeadData) {
  const digits = data.documento.replace(/\D/g, "");
  const attribution = readTracking();

  const payload = {
    token_rdstation: RD_PUBLIC_TOKEN,
    identificador: RD_IDENTIFIER,
    email: data.email,
    nome: data.nome,
    telefone: data.telefone,
    cidade: data.cidade,
    estado: data.estado,
    cf_crm: data.registro,
    cf_numero_registro: data.registro,
    // CPF e CNPJ vao em campos separados no RD — separa por quantidade de digitos.
    cf_cpf: digits.length === 11 ? data.documento : "",
    cf_cnpj: digits.length === 14 ? data.documento : "",
    cf_especialidade: data.especialidade,
    tags: [
      "verao-2026-landing",
      "lp-koko",
      `especialidade-${slugify(data.especialidade)}`,
      `estado-${slugify(data.estado)}`,
    ],
    available_for_mailing: data.consentimento,

    utm_source: attribution.utm_source || "",
    utm_medium: attribution.utm_medium || "",
    utm_campaign: attribution.utm_campaign || "",
    utm_term: attribution.utm_term || "",
    utm_content: attribution.utm_content || "",
    gclid: attribution.gclid || "",
    fbclid: attribution.fbclid || "",

    client_id: getCookie("_rdtrk") || "",
    traffic_source: attribution.referrer || "",
    conversion_url: window.location.href,
    landing_page: attribution.landing_page || window.location.href,
  };

  const response = await fetch(RD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch {}
    throw new Error(`RD ${response.status} ${body}`);
  }
}

/** Lead pro Pixel + CAPI (dedupe por event_id fica a cargo do t.js). */
export function trackLead(data: LeadData) {
  pushDataLayer({
    event: "generate_lead",
    form_id: RD_IDENTIFIER,
    form_name: FORM_NAME,
    lead_email: data.email,
  });

  try {
    window.trk?.lead(
      {
        email: data.email,
        phone: "+55" + data.telefone.replace(/\D/g, ""),
        fn: data.nome,
        ct: data.cidade,
        st: data.estado,
        external_id: data.email,
      },
      {
        content_name: FORM_NAME,
        content_category: "profissional-saude",
      },
    );
  } catch (error) {
    console.warn("[VERAO] trk.lead falhou:", error);
  }
}
