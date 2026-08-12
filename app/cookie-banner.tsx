"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Modelo opt-out, igual ao das outras LPs ILIKIA: o tracking carrega por
// padrao e SO e bloqueado se a pessoa clicar "Recusar". O aviso aparece
// uma unica vez, ate a primeira escolha.
const CONSENT_KEY = "ilikia_cookie_consent";
const TRACKING_SRC = "https://track-ilikia.koko.ag/t.js";

function isLocalPreview() {
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function writeConsent(value: string) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Sem localStorage o banner volta na proxima visita — aceitavel.
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const loaded = useRef(false);

  const loadTracking = useCallback(() => {
    // O gateway aceita apenas os domínios publicados. Não carregamos o script
    // na prévia local para evitar CORS e dados de teste na conta da campanha.
    if (loaded.current || isLocalPreview()) return;
    loaded.current = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = TRACKING_SRC;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const consent = readConsent();
    if (consent !== "denied") loadTracking();
    if (!consent) {
      const timer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
  }, [loadTracking]);

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <p>
        Usamos cookies de medição e marketing (Meta, Google Analytics e RD
        Station) para entender a audiência e melhorar sua experiência. Ao
        continuar navegando, você concorda com o uso — mas pode recusar quando
        quiser.
      </p>
      <div className="cookie-actions">
        <button
          type="button"
          onClick={() => {
            writeConsent("denied");
            setVisible(false);
            // Recarrega pra derrubar o que ja tiver sido carregado nesta sessao.
            location.reload();
          }}
        >
          Recusar
        </button>
        <button
          type="button"
          className="cookie-accept"
          onClick={() => {
            writeConsent("granted");
            setVisible(false);
            loadTracking();
          }}
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
