"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import {
  CircuitBoard,
  ClipboardCheck,
  Gem,
  Globe2,
  Headset,
  Sparkles,
} from "lucide-react";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const protocols = [
  {
    eyebrow: "CONTORNO CORPORAL",
    name: "Beauty Code",
    copy:
      "Criado para pacientes com estilo de vida wellness que desejam otimizar o contorno glúteo, associando projeção e volumização com UP Max à qualidade tecidual e sustentação com STIIM.",
    products: "UP Max + STIIM",
    result: "Projeção, volumização e qualidade de pele",
    steps: ["Projeção", "Volume", "Qualidade tecidual"],
  },
  {
    eyebrow: "REJUVENESCIMENTO FACIAL",
    name: "FrameLift",
    copy:
      "Um tratamento completo que associa qualidade da pele e sustentação com STIIM, redefinição dos contornos com UP Contour e suavização das rugas de expressão com um neurotransmissor.",
    products: "STIIM + UP Contour + neurotransmissor",
    result: "Estrutura, sustentação e naturalidade",
    steps: ["Estrutura", "Sustentação", "Suavização"],
  },
  {
    eyebrow: "FIRMEZA ABDOMINAL",
    name: "Body Secrets",
    copy:
      "Desenvolvido para restaurar a firmeza da região abdominal por meio de uma abordagem combinada: bioestimulação de colágeno com STIIM e sustentação mecânica dos tecidos com Aptos Nano.",
    products: "STIIM + Aptos Nano",
    result: "Tratamento completo da flacidez supraumbilical",
    steps: ["Bioestimulação", "Sustentação", "Firmeza"],
  },
  {
    eyebrow: "SKINCARE TECNOLÓGICO",
    name: "Summer Skin",
    copy:
      "Para pacientes que não querem abrir mão da rotina de verão para cuidar da pele. Hydrafacial promove renovação, hidratação e infusão de ativos em um único procedimento, sem downtime.",
    products: "Hydrafacial",
    result: "Pele saudável, luminosa e pronta para o verão",
    steps: ["Renovação", "Hidratação", "Infusão de ativos"],
  },
];

const products = [
  {
    category: "BIOESTIMULADOR DE COLÁGENO",
    name: "STIIM",
    tagline: "Sustentação e qualidade de pele",
    image: "/assets/produto-stiim.jpg",
  },
  {
    category: "ÁCIDO HIALURÔNICO DE ALTA RETICULAÇÃO",
    name: "UP Max",
    tagline: "Projeção e volumização",
    image: "/assets/produto-up-max.jpg",
  },
  {
    category: "PREENCHEDOR À BASE DE ÁCIDO HIALURÔNICO",
    name: "UP Contour",
    tagline: "Estruturação e redefinição dos contornos",
    image: "/assets/produto-up-contour.jpg",
  },
  {
    category: "FIOS ABSORVÍVEIS DE ÁCIDO POLILÁTICO + POLIPROLACTONA",
    name: "APTOS",
    tagline: "Sustentação mecânica dos tecidos",
    image: "/assets/produto-aptos.jpg",
  },
  {
    category: "SKINCARE TECNOLÓGICO",
    name: "Hydrafacial",
    tagline: "Renovação, hidratação e infusão de ativos",
    image: "/assets/produto-hydrafacial.jpg",
  },
];

const benefits = [
  { label: "Protocolos prontos para aplicação", Icon: ClipboardCheck },
  { label: "Associação inteligente de tecnologias", Icon: CircuitBoard },
  { label: "Tratamentos alinhados às tendências internacionais", Icon: Globe2 },
  { label: "Maior percepção de valor pelo paciente", Icon: Gem },
  { label: "Diferenciação da concorrência", Icon: Sparkles },
  { label: "Apoio da equipe ILIKIA", Icon: Headset },
];


function scrollToForm() {
  document.getElementById("contato")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function Home() {
  const [activeProtocol, setActiveProtocol] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const protocol = protocols[activeProtocol];

  return (
    <main>
      <header className={menuOpen ? "floating-nav is-open" : "floating-nav"}>
        <nav className="desktop-nav" aria-label="Menu principal">
          <a href="#mudanca">Contexto</a>
          <a href="#protocolos">Protocolos</a>
          <a href="#tecnologias">Tecnologias</a>
          <a href="#estrategia">Para a clínica</a>
        </nav>
        <a className="nav-contact" href="#contato">
          Quero conhecer <span className="nav-arrow" aria-hidden="true">↘</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label="Menu mobile"
          aria-hidden={!menuOpen}
        >
          <a href="#mudanca" onClick={() => setMenuOpen(false)}>Contexto</a>
          <a href="#protocolos" onClick={() => setMenuOpen(false)}>Protocolos</a>
          <a href="#tecnologias" onClick={() => setMenuOpen(false)}>Tecnologias</a>
          <a href="#estrategia" onClick={() => setMenuOpen(false)}>Para a clínica</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            Quero conhecer <span className="nav-arrow" aria-hidden="true">↘</span>
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-ocean hero-ocean-back" aria-hidden="true" />
        <div className="hero-ocean hero-ocean-front" aria-hidden="true" />
        <div className="hero-shimmer" aria-hidden="true" />
        <div className="film-grain" />
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title-mark">
            <span className="visually-hidden">Corpo &amp; Alma Brasileira</span>
            <Image
              className="hero-lettering"
              src={`${publicBasePath}/assets/corpo-alma-lettering.png`}
              alt=""
              width={1800}
              height={446}
              priority
              unoptimized
              aria-hidden="true"
            />
          </h1>
          <p className="hero-subtitle">
            Os protocolos que vão transformar o verão da sua clínica.
          </p>
          <p className="hero-copy">
            Tratamentos que respeitam a individualidade do paciente, valorizam
            resultados naturais e acompanham as principais tendências da
            medicina estética mundial.
          </p>
          <button className="button button-sun" onClick={scrollToForm}>
            Quero conhecer os protocolos
            <span aria-hidden="true">↘</span>
          </button>
        </div>
        <a className="scroll-cue" href="#mudanca" aria-label="Ir para a próxima seção">
          <span>DESCUBRA</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="patient-section" id="mudanca" aria-labelledby="patient-title">
        <div className="patient-content">
          <h2 id="patient-title">
            O paciente muda
            <br />
            e a necessidade
            <br />
            também
          </h2>
          <p>
            Durante o verão, aumentam as buscas por procedimentos que entreguem
            resultados naturais, recuperação rápida e melhora da qualidade da
            pele.
          </p>
          <p>
            Por isso, a ILIKIA&amp;Co desenvolveu em parceria com profissionais
            protocolos que unem tecnologia, ciência e produtos de alta
            performance para atender às principais demandas da estação.
          </p>
        </div>
      </section>

      <section className="protocols-section" id="protocolos" aria-labelledby="protocols-title">
        <div className="protocols-heading">
          <p className="section-index">ABORDAGENS INTEGRADAS</p>
          <h2 id="protocols-title">
            Protocolos desenvolvidos
            <br />
            <span>para o verão brasileiro.</span>
          </h2>
        </div>

        <div className="protocol-tabs" role="tablist" aria-label="Protocolos">
          {protocols.map((item, index) => (
            <button
              key={item.name}
              role="tab"
              aria-selected={activeProtocol === index}
              aria-controls="protocol-panel"
              className={activeProtocol === index ? "active" : ""}
              onClick={() => setActiveProtocol(index)}
            >
              <span>0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </div>

        <article className="protocol-card" id="protocol-panel" role="tabpanel">
          <div className="protocol-copy">
            <p className="protocol-eyebrow">{protocol.eyebrow}</p>
            <h3>{protocol.name}</h3>
            <p>{protocol.copy}</p>
            <dl>
              <div>
                <dt>Combinação</dt>
                <dd>{protocol.products}</dd>
              </div>
              <div>
                <dt>Foco clínico</dt>
                <dd>{protocol.result}</dd>
              </div>
            </dl>
            <button className="text-link" onClick={scrollToForm}>
              Quero conhecer esse protocolo <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="protocol-visual">
            <div className="protocol-map" key={protocol.name}>
              <div className="protocol-map-topline">
                <span>PROTOCOLO 0{activeProtocol + 1}</span>
                <span>VERÃO 2026</span>
              </div>
              <div className="protocol-map-center">
                <span className="map-ring map-ring-one" />
                <span className="map-ring map-ring-two" />
                <strong>{protocol.name}</strong>
                <small>{protocol.eyebrow}</small>
              </div>
              <ol>
                {protocol.steps.map((step, index) => (
                  <li key={step}>
                    <span>0{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="asset-note">Área reservada para o visual oficial do protocolo</p>
            </div>
          </div>
        </article>
      </section>

      <section
        className="products-section products-accordion-section"
        id="tecnologias"
        aria-labelledby="products-title"
      >
        <div className="products-intro">
          <p className="section-index">TECNOLOGIAS</p>
          <h2 id="products-title">
            A combinação certa faz
            <br />
            <span>toda a diferença.</span>
          </h2>
          <p>
            Cada protocolo reúne tecnologias específicas, criando abordagens
            completas para diferentes necessidades clínicas.
          </p>
          <button className="button button-sun" onClick={scrollToForm}>
            Quero adquirir os produtos <span aria-hidden="true">↘</span>
          </button>
        </div>
        <div
          className="technology-accordion"
          aria-label="Tecnologias da campanha"
        >
          {products.map((item, index) => (
            <button
              className={
                activeProduct === index
                  ? "technology-panel is-active"
                  : "technology-panel"
              }
              key={item.name}
              type="button"
              aria-expanded={activeProduct === index}
              onMouseEnter={() => setActiveProduct(index)}
              onFocus={() => setActiveProduct(index)}
              onClick={() => setActiveProduct(index)}
            >
              <Image
                className="technology-panel-image"
                src={`${publicBasePath}${item.image}`}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 55vw"
                unoptimized
              />
              <span className="technology-panel-number">0{index + 1}</span>
              <span className="technology-panel-name">{item.name}</span>
              <div className="technology-panel-detail">
                <span>{item.category}</span>
                <strong>{item.name}</strong>
                <p>{item.tagline}</p>
                <span className="technology-panel-link">
                  Conhecer tecnologia <span aria-hidden="true">→</span>
                </span>
              </div>
            </button>
          ))}
        </div>
        <p className="touch-hint">Toque em uma tecnologia para expandir.</p>
      </section>

      <section
        className="strategy-section"
        id="estrategia"
        aria-labelledby="strategy-title"
      >
        <div className="strategy-ocean-window" aria-hidden="true">
          <div className="strategy-ocean strategy-ocean-back" />
        </div>
        <div className="strategy-ocean-window" aria-hidden="true">
          <div className="strategy-ocean strategy-ocean-front" />
        </div>
        <div className="strategy-overlay" />
        <div className="strategy-content">
          <p className="section-index">VALOR PARA A CLÍNICA</p>
          <h2 id="strategy-title">
            Mais do que protocolos.
            <br />
            <span>Uma estratégia para vender mais no verão.</span>
          </h2>
          <div className="benefits-grid benefits-grid-refined">
            {benefits.map(({ label, Icon }) => (
              <article key={label}>
                <span className="benefit-icon" aria-hidden="true">
                  <Icon strokeWidth={1.15} />
                </span>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="soul-section" id="essencia" aria-labelledby="soul-title">
        <div className="soul-copy">
          <p className="section-index">NOSSA ESSÊNCIA</p>
          <h2 id="soul-title">
            Corpo &amp; Alma
            <br />
            <span>Brasileira</span>
          </h2>
          <p>
            O Brasil fez do corpo uma assinatura cultural. Fez da emoção uma
            forma de presença. E fez da mistura a sua maior expressão de beleza.
          </p>
          <p>
            Os Protocolos de Verão nasceram dessa essência, combinando ciência,
            tecnologia e experiência clínica para oferecer tratamentos que
            respeitam a identidade de cada paciente e acompanham as necessidades
            da estação.
          </p>
          <button className="button button-light" onClick={scrollToForm}>
            Quero adquirir os protocolos <span aria-hidden="true">↘</span>
          </button>
        </div>
        <div className="soul-photo" aria-hidden="true" />
      </section>

      <section className="form-section" id="contato" aria-labelledby="form-title">
        <div className="form-image">
          <div>
            <p>CIÊNCIA, TECNOLOGIA E EXPERIÊNCIA CLÍNICA</p>
            <span>VERÃO 2026</span>
          </div>
        </div>
        <div className="form-wrap">
          <p className="section-index">FALE COM A NOSSA EQUIPE</p>
          <h2 id="form-title">
            Leve os protocolos de verão
            <br />
            <span>para sua clínica.</span>
          </h2>
          <p className="form-lead">
            Nossa equipe comercial está pronta para apresentar os produtos que
            compõem cada protocolo e indicar a melhor estratégia para sua
            clínica.
          </p>
          {submitted ? (
            <div className="success-message" role="status">
              <span aria-hidden="true">✓</span>
              <h3>Recebemos seu interesse.</h3>
              <p>Em breve, nossa equipe entrará em contato com você.</p>
              <button className="text-link" onClick={() => setSubmitted(false)}>
                Enviar outro contato
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Nome completo *
                <input
                  name="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Como podemos chamar você?"
                  required
                />
              </label>
              <label>
                E-mail *
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@clinica.com.br"
                  required
                />
              </label>
              <div className="form-row">
                <label>
                  Celular / WhatsApp *
                  <input
                    name="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </label>
                <label>
                  CPF / CNPJ
                  <input
                    name="documento"
                    type="text"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Especialidade *
                  <select name="especialidade" defaultValue="" required>
                    <option value="" disabled>Selecione</option>
                    <option value="dermatologia">Dermatologia</option>
                    <option value="cirurgia-plastica">Cirurgia Plástica</option>
                    <option value="biomedicina">Biomedicina</option>
                    <option value="enfermagem">Enfermagem</option>
                    <option value="fisioterapia">Fisioterapia</option>
                    <option value="estetica-cosmetica">Estética e Cosmética</option>
                    <option value="odontologia">Odontologia</option>
                    <option value="outra">Outra</option>
                  </select>
                </label>
                <label>
                  Número de registro
                  <input
                    name="registro"
                    type="text"
                    placeholder="Registro profissional"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Cidade *
                  <input
                    name="cidade"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Sua cidade"
                    required
                  />
                </label>
                <label>
                  Estado *
                  <select name="estado" defaultValue="" autoComplete="address-level1" required>
                    <option value="" disabled>Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </label>
              </div>
              <label className="consent">
                <input name="consentimento" type="checkbox" required />
                <span>
                  Autorizo o contato da ILIKIA&amp;Co e o tratamento dos meus
                  dados conforme a{" "}
                  <a
                    href="https://ilikia.com/politica-de-privacidade/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Política de Privacidade
                  </a>
                  .
                </span>
              </label>
              <button className="button button-green" type="submit">
                Quero receber uma apresentação <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-shell">
          <div className="footer-main">
            <div className="footer-brand-copy">
              <p className="footer-kicker">ILIKIA&amp;Co · Verão 2026</p>
              <p className="footer-title">Corpo &amp; Alma Brasileira</p>
              <p className="footer-description">
                Protocolos que unem ciência, tecnologia e experiência clínica
                para valorizar a beleza brasileira.
              </p>
            </div>

            <div className="footer-actions">
              <nav className="footer-navigation" aria-label="Navegação do rodapé">
                <p>Explore</p>
                <a href="#mudanca">Contexto</a>
                <a href="#protocolos">Protocolos</a>
                <a href="#tecnologias">Tecnologias</a>
                <a href="#estrategia">Para a clínica</a>
              </nav>
              <div className="footer-cta">
                <p className="footer-column-title">Contato</p>
                <p>Quer levar os protocolos para sua clínica?</p>
                <button type="button" onClick={scrollToForm}>
                  Falar com a equipe <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 ILIKIA&amp;Co. Todos os direitos reservados.</span>
            <div>
              <a
                href="https://ilikia.com/politica-de-privacidade/"
                target="_blank"
                rel="noreferrer"
              >
                Privacidade
              </a>
              <a href="#hero-title">Voltar ao início ↑</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
