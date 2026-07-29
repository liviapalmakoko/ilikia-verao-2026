# Corpo & Alma Brasileira — Protocolos de Verão 2026

Landing page responsiva da campanha de verão, construída a partir do KV e do
briefing fornecidos pela ILIKIA.

## Conteúdo

- Hero da campanha
- Contexto e oportunidade da estação
- Navegação interativa entre quatro protocolos
- Vitrine de tecnologias com interação no hover/toque
- Benefícios comerciais para clínicas
- Manifesto Corpo & Alma Brasileira
- Formulário de interesse

## Desenvolvimento local

Requisitos:

- Node.js 22.13 ou superior
- pnpm 11

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`.

## Build de produção

```bash
pnpm build
```

## Site público

A landing page é publicada automaticamente pelo GitHub Pages a cada atualização
da branch `main`:

https://liviapalmakoko.github.io/ilikia-verao-2026/

Para validar localmente a versão estática usada pelo GitHub Pages:

```bash
pnpm build:pages
```

## Estrutura principal

- `app/page.tsx`: conteúdo e interações da landing page
- `app/globals.css`: direção visual e responsividade
- `public/assets`: imagens tratadas a partir dos materiais da campanha
- `public/fonts`: tipografia fornecida no KV
- `public/og.png`: imagem de compartilhamento social

## Observação

O formulário apresenta a confirmação na interface, mas ainda precisa ser
conectado ao destino definitivo dos leads (CRM, e-mail, webhook ou API).
