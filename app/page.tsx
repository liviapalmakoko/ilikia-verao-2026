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
    visualType: "clinical-map",
    image: "/assets/protocols/clinical/beauty-code-map.png",
    imageWidth: 910,
    imageHeight: 492,
    visualAlt:
      "Mapa de aplicação do protocolo Beauty Code para projeção, volumização e qualidade tecidual",
    copy:
      "Criado para pacientes com estilo de vida wellness que desejam otimizar o contorno glúteo, o Beauty Code associa projeção e volumização com UP Max à qualidade tecidual e sustentação com STIIM. A abordagem integrada foi pensada para entregar resultados que se mantenham estáveis para além do verão.",
    focus: "Contorno glúteo, projeção, volumização e qualidade tecidual",
    components: [
      {
        name: "UP Max",
        category: "Preenchedor",
        amount: "60 ml",
        presentation: "4 kits de 15 ml",
        benefits: ["Projeção", "Volumização"],
      },
      {
        name: "STIIM",
        category: "Bioestimulador",
        amount: "4 caixas",
        presentation: "Protocolo corporal",
        benefits: ["Sustentação", "Qualidade da pele"],
      },
    ],
  },
  {
    eyebrow: "REJUVENESCIMENTO FACIAL",
    name: "FrameLift",
    visualType: "framelift-steps",
    image: "/assets/protocols/clinical/framelift-step-1.png",
    imageWidth: 412,
    imageHeight: 372,
    visualAlt: "Etapas de aplicação do protocolo FrameLift",
    /* As legendas vinham gravadas dentro do PNG — e a da etapa 3 trazia o
       nome "Botulift", que o briefing pede para não exibir. Os arquivos foram
       recortados na foto; selo e legenda agora são HTML. */
    stepImages: [
      {
        src: "/assets/protocols/clinical/framelift-step-1.png",
        width: 412,
        height: 209,
        caption: "Regeneração do colágeno com STIIM",
        detail: "(CaHA)",
      },
      {
        src: "/assets/protocols/clinical/framelift-step-2.png",
        width: 412,
        height: 211,
        caption: "Estruturação com UP Contour",
        detail: "(HA)",
      },
      {
        src: "/assets/protocols/clinical/framelift-step-3.png",
        width: 450,
        height: 233,
        caption: "Neuromodulação com neurotransmissor",
        detail: "(Toxina Botulínica)",
      },
    ],
    copy:
      "Desenvolvido para pacientes que desejam um rejuvenescimento facial completo, o FrameLift combina qualidade da pele e sustentação com STIIM, estruturação e redefinição dos contornos com UP Contour e suavização das rugas de expressão com um neurotransmissor. O resultado é uma abordagem integrada, natural e harmoniosa.",
    focus: "Qualidade da pele, estruturação facial e suavização das rugas de expressão",
    components: [
      {
        name: "STIIM",
        category: "Bioestimulador de colágeno",
        amount: "2 unidades",
        presentation: "2 seringas",
        benefits: ["Sustentação", "Qualidade da pele"],
      },
      {
        name: "UP Contour",
        category: "Preenchedor",
        amount: "2 unidades",
        presentation: "4 seringas",
        benefits: ["Estruturação", "Redefinição dos contornos"],
      },
      {
        // Hífen suave: se o nome não couber na coluna, quebra em "Neuro-".
        name: "Neuro­transmissor",
        category: "Neuromodulação",
        amount: "1 frasco",
        presentation: "150 U",
        benefits: ["Suavização das rugas", "Reprogramação muscular"],
      },
    ],
  },
  {
    eyebrow: "FIRMEZA ABDOMINAL",
    name: "Body Secrets",
    visualType: "clinical-map",
    image: "/assets/protocols/clinical/body-secrets-map.png",
    imageWidth: 654,
    imageHeight: 464,
    visualAlt:
      "Mapa de vetores do protocolo Body Secrets para firmeza e sustentação abdominal",
    copy:
      "Desenvolvido para pacientes que buscam restaurar a firmeza da região abdominal, o Body Secrets une a bioestimulação de colágeno promovida por STIIM à sustentação mecânica dos tecidos com Aptos Nano, favorecendo resultados mais completos no tratamento da flacidez supraumbilical.",
    focus: "Bioestimulação, sustentação mecânica e firmeza supraumbilical",
    components: [
      {
        name: "APTOS Nano",
        category: "Fios absorvíveis",
        amount: "4 caixas",
        presentation: "20 fios de 8 cm",
        benefits: ["Estruturação", "Qualidade da pele"],
      },
      {
        name: "STIIM",
        category: "Bioestimulador",
        amount: "2 caixas",
        presentation: "Protocolo abdominal",
        benefits: ["Sustentação", "Qualidade da pele"],
      },
    ],
  },
  {
    eyebrow: "SKINCARE TECNOLÓGICO",
    name: "Summer Skin",
    visualType: "technology",
    image: "/assets/protocols/clinical/hydrafacial-machine.png",
    imageWidth: 489,
    imageHeight: 972,
    visualAlt: "Equipamento Hydrafacial utilizado no protocolo Summer Skin",
    copy:
      "Para pacientes que não querem abrir mão da rotina de verão para cuidar da pele, o Summer Skin utiliza a tecnologia patenteada Vortex-Fusion® da Hydrafacial. O protocolo promove renovação, hidratação e infusão de ativos em um único procedimento, sem downtime, para uma pele saudável, luminosa e pronta para acompanhar o ritmo da estação.",
    focus: "Renovação, hidratação, infusão de ativos e luminosidade",
    components: [
      {
        name: "Hydrafacial",
        category: "Skincare tecnológico",
        amount: "1 sessão",
        presentation: "Tecnologia Vortex-Fusion®",
        benefits: ["Renovação e hidratação", "Infusão de ativos"],
      },
    ],
    evidence: [
      "Presente em mais de 90 países",
      "Uma sessão realizada a cada 15 segundos",
      "Múltiplos prêmios internacionais",
      "Reconhecida por celebridades e especialistas em beleza",
      "Mais de 80% dos pacientes relatam melhora da qualidade da pele*",
    ],
    source: "*Journal of Clinical and Aesthetic Dermatology.",
  },
];

/* Os packshots foram recortados na caixa do conteúdo, então width/height são
   as medidas reais do produto — é isso que permite alinhar a fileira pela
   base e dar peso visual equivalente a caixas de formatos diferentes. */
const products = [
  {
    category: "BIOESTIMULADOR DE COLÁGENO",
    name: "STIIM",
    tagline: "Sustentação e qualidade de pele",
    image: "/assets/products/stiim-packshot.png",
    width: 656,
    height: 1154,
  },
  {
    category: "ÁCIDO HIALURÔNICO DE ALTA RETICULAÇÃO",
    name: "UP Max",
    tagline: "Projeção e volumização",
    image: "/assets/products/up-max-packshot.png",
    width: 487,
    height: 1154,
  },
  {
    category: "PREENCHEDOR À BASE DE ÁCIDO HIALURÔNICO",
    name: "UP Contour",
    tagline: "Estruturação e redefinição dos contornos",
    image: "/assets/products/up-contour-packshot.png",
    width: 563,
    height: 1112,
  },
  {
    category: "FIOS ABSORVÍVEIS DE ÁCIDO POLILÁTICO + POLIPROLACTONA",
    name: "APTOS",
    tagline: "Sustentação mecânica dos tecidos",
    image: "/assets/products/aptos-packshot.png",
    width: 1045,
    height: 691,
  },
  {
    category: "SKINCARE TECNOLÓGICO",
    name: "Hydrafacial",
    tagline: "Renovação, hidratação e infusão de ativos",
    image: "/assets/products/hydrafacial-technology.png",
    width: 585,
    height: 1194,
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


/* Só abre no hover onde existe cursor de verdade. Em touch o mouseenter
   dispara junto com o toque, e o capítulo abriria e fecharia no mesmo gesto. */
function pointerHasHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

function scrollToForm() {
  document.getElementById("contato")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function Home() {
  // -1 = todos fechados. É o estado de repouso: com cursor, o capítulo só
  // abre enquanto o mouse está sobre a faixa. No toque, abre no clique.
  const [openProtocol, setOpenProtocol] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

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
            Quero conhecer os protocolos!
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
          <p className="protocols-lead">
            Quatro abordagens que combinam as tecnologias ILIKIA para as
            demandas mais buscadas da estação.
          </p>
        </div>

        <div
          className="protocol-accordion"
          data-open={openProtocol}
          onMouseLeave={() => {
            if (pointerHasHover()) setOpenProtocol(-1);
          }}
        >
          {protocols.map((item, index) => {
            const open = openProtocol === index;
            return (
              <article
                className={open ? "protocol-chapter is-open" : "protocol-chapter"}
                id={`protocolo-0${index + 1}`}
                key={item.name}
              >
                <h3 className="chapter-heading">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`painel-0${index + 1}`}
                    /* Com hover, clicar num capítulo já aberto não fecha:
                       fechar deixaria o painel piscando sob o cursor. */
                    onClick={() =>
                      setOpenProtocol(open && !pointerHasHover() ? -1 : index)
                    }
                    onMouseEnter={() => {
                      if (pointerHasHover()) setOpenProtocol(index);
                    }}
                    onFocus={() => setOpenProtocol(index)}
                  >
                    <span className="chapter-titles">
                      <span className="chapter-eyebrow">{item.eyebrow}</span>
                      <span className="chapter-name">{item.name}</span>
                    </span>
                    <span className="chapter-toggle" aria-hidden="true" />
                  </button>
                </h3>

                {/* Painel sempre no DOM (indexável); `inert` tira o conteúdo
                    fechado do foco e dos leitores de tela. */}
                <div
                  className="chapter-panel"
                  id={`painel-0${index + 1}`}
                  inert={!open}
                >
                  <div className="chapter-inner">
                    {/* Sem placa nem moldura: a imagem assenta direto no campo
                        do capítulo. Os mapas são opacos e ocupam o arquivo de
                        borda a borda, então recortar cortaria conteúdo — a
                        integração vem de máscara nas bordas, não de corte. */}
                    <div className={`chapter-media chapter-media-${item.visualType}`}>
                      {item.stepImages ? (
                        <ol className="chapter-steps">
                          {item.stepImages.map((step, stepIndex) => (
                            <li key={step.src}>
                              <div className="chapter-step-media">
                                <Image
                                  src={`${publicBasePath}${step.src}`}
                                  alt={`Etapa ${stepIndex + 1} do protocolo FrameLift`}
                                  width={step.width}
                                  height={step.height}
                                  /* eager: em repouso todos os painéis estão
                                     fechados, e imagem lazy dentro de painel
                                     fechado só carrega no primeiro hover — a
                                     abertura piscaria sem a imagem. */
                                  loading="eager"
                                  unoptimized
                                />
                                <span
                                  className="chapter-step-number"
                                  aria-hidden="true"
                                >
                                  {stepIndex + 1}
                                </span>
                              </div>
                              <p className="chapter-step-caption">
                                {step.caption} <strong>{step.detail}</strong>
                              </p>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <Image
                          src={`${publicBasePath}${item.image}`}
                          alt={item.visualAlt}
                          width={item.imageWidth}
                          height={item.imageHeight}
                          loading="eager"
                          unoptimized
                        />
                      )}
                    </div>

                    <div className="chapter-content">
                      {/* Repete o título dentro do painel: na lombada ele está
                          na vertical e serve de índice, aqui é o cabeçalho de
                          leitura. aria-hidden porque o <h3> da lombada já
                          nomeia o capítulo para leitores de tela. */}
                      <div className="chapter-headline" aria-hidden="true">
                        <p className="chapter-headline-eyebrow">{item.eyebrow}</p>
                        <p className="chapter-headline-name">{item.name}</p>
                      </div>

                      <p className="chapter-copy">{item.copy}</p>

                      <p className="chapter-focus">
                        <span>Foco clínico</span>
                        {item.focus}
                      </p>

                      <div className="chapter-composition">
                        <p className="chapter-label">Composição</p>
                        <ul className="chapter-components">
                          {item.components.map((component) => (
                            <li key={component.name}>
                              <h4>{component.name}</h4>
                              <p className="component-meta">
                                <strong>{component.amount}</strong>
                                <span>{component.presentation}</span>
                              </p>
                              <p className="component-benefits">
                                {component.benefits.join(" · ")}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {item.evidence && (
                        <div className="chapter-evidence">
                          <p className="chapter-label">
                            Reconhecida mundialmente
                          </p>
                          <ul>
                            {item.evidence.map((evidenceItem) => (
                              <li key={evidenceItem}>{evidenceItem}</li>
                            ))}
                          </ul>
                          <p className="chapter-source">{item.source}</p>
                        </div>
                      )}

                      <button className="text-link" onClick={scrollToForm}>
                        Quero conhecer esse protocolo!{" "}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="products-section products-grid-section"
        id="tecnologias"
        aria-labelledby="products-title"
      >
        <div className="products-intro">
          <p className="section-index">TECNOLOGIAS</p>
          <h2 id="products-title">
            A combinação certa
            <br />
            <span>faz toda a diferença.</span>
          </h2>
          <p>
            Cada protocolo reúne tecnologias específicas, criando abordagens
            completas para diferentes necessidades clínicas.
          </p>
          <button className="button button-sun" onClick={scrollToForm}>
            Quero adquirir os produtos <span aria-hidden="true">↘</span>
          </button>
        </div>
        <ul className="technology-grid">
          {products.map((item) => (
            <li className="technology-card" key={item.name}>
              <div className="technology-card-media">
                <Image
                  src={`${publicBasePath}${item.image}`}
                  alt=""
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 620px) 80vw, (max-width: 1040px) 32vw, 20vw"
                  unoptimized
                />
              </div>
              <div className="technology-card-caption">
                <p className="technology-card-category">{item.category}</p>
                <div className="technology-card-reveal">
                  <h3 className="technology-card-name">{item.name}</h3>
                  <p className="technology-card-tagline">{item.tagline}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
                    /* O link vive dentro do <label>: sem isto, abrir a
                       política também marca ou desmarca o consentimento. */
                    onClick={(event) => event.stopPropagation()}
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
