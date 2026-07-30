# Deploy — VPS Koko (ilikia-verao.koko.ag)

Espelho de homologação da LP na VPS `64.227.0.167`, no mesmo padrão das demais
LPs ILIKIA/AICONIQ (nginx:alpine + Traefik, `/opt/clients/ilikia/<projeto>/production/`).

O GitHub Pages continua funcionando normalmente — os dois convivem.

## Publicar

```bash
./deploy.sh
```

Faz build, sincroniza pro diretório servido e roda smoke test. É o único comando
necessário no dia a dia.

Por baixo:

```bash
pnpm build:static           # export estatico SEM basePath, canonical/OG no dominio koko.ag
rsync -a --delete out/ www/ # www/ e o que o container serve
docker compose up -d        # no-op se ja estiver rodando
```

Diferença para o `build:pages` (GitHub Pages): lá o site vive em
`/ilikia-verao-2026/`, aqui na raiz. O `basePath` é configurável
(`NEXT_PUBLIC_BASE_PATH`) e o domínio de canonical/OG também
(`NEXT_PUBLIC_SITE_URL`) — ver `next.config.ts` e `app/layout.tsx`.

### Por que `www/` e não `out/`

Duas armadilhas que custaram deploy quebrado:

1. `next build` **apaga e recria** o `out/`. Com bind mount direto em `out/`, o
   container fica preso ao inode antigo e passa a servir 404 em tudo.
2. Recriar o container abre uma janela em que o **Traefik responde 404** — e o
   **Cloudflare cacheia esse 404** por ~3 min, deixando o site fora do ar mesmo
   com o origin já saudável.

Com o rsync pro `www/`, publicar é só trocar arquivo: sem restart, sem janela.
O `nginx.conf` também marca 404 como `no-store`, pro edge não segurar erro.

Se precisar mesmo recriar o container (mudou `docker-compose.yml` ou
`nginx.conf`), espere ~3 min antes de confiar no smoke test.

## Infra

- Container `ilikia-verao-web` (projeto compose `ilikia-verao`), rede `proxy-network`.
- Traefik: `Host(ilikia-verao.koko.ag)`, TLS `certresolver=cloudflare` (DNS-01),
  middlewares `security-headers@file` + `noindex@file`.
- DNS: A `ilikia-verao.koko.ag` → `64.227.0.167` (Cloudflare, proxied).
- Healthcheck: `GET /healthz`.

## Noindex

A LP cita marcas de terceiros (ex.: Hydrafacial). Espelho `*.koko.ag` indexado já
gerou notificação de marca em 19/07/2026 — por isso `X-Robots-Tag: noindex` vem
tanto do nginx quanto do middleware do Traefik. Se precisar fechar o acesso de
vez, basta descomentar o bloco `auth_basic` em `nginx.conf` e criar o
`.htpasswd-dev` (`htpasswd -nbB <user> <senha> > www/.htpasswd-dev`).

## Tracking

Mesmo sistema global das outras LPs: `window.__TRK__` (Pixel ILIKIA
`666277432116339`, gateway `track-ilikia.koko.ag`) declarado em `app/layout.tsx`,
e o `t.js` carregado pelo `app/cookie-banner.tsx` no modelo opt-out — só não
carrega se a pessoa clicar "Recusar".

O `ga4Id` está vazio porque a marca ILIKIA ainda não tem GA4 (pendência antiga,
vale pras 8 LPs ILIKIA). Quando houver Measurement ID + api_secret, preencher o
`.env` do gateway e o `ga4Id` aqui.

## Formulário

`app/lead.ts` — RD Station Marketing v1.3, mesmo token público da conta ILIKIA,
identificador `verao-2026-lp-koko`. Envia UTM/gclid/fbclid guardados da primeira
visita (30 dias, `localStorage`) e dispara `trk.lead` (Pixel + CAPI) no sucesso.

## Performance

Imagens em WebP, fontes em woff2, hero com variante mobile de 1024px.
Referenciadas: ~2 MB (era ~13,9 MB). Página completa: ~600 KB no mobile.

Lighthouse mobile: 81/100, LCP 4,27s, CLS 0. O que ainda segura o LCP são as
camadas decorativas empilhadas do hero (`mask-image` + `mix-blend-mode` +
animações infinitas) — reduzir isso mexe no visual, então ficou como decisão de
design.

## Pendências

- GA4 da marca ILIKIA (vale pras 8 LPs, não só esta).
- 16 arquivos em `public/assets/` não são referenciados por nada (~11 MB). Não
  pesam no carregamento, mas engordam o repo e o deploy.
