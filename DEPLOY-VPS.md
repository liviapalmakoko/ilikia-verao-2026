# Deploy — VPS Koko (ilikia-verao.koko.ag)

Espelho de homologação da LP na VPS `64.227.0.167`, no mesmo padrão das demais
LPs ILIKIA/AICONIQ (nginx:alpine + Traefik, `/opt/clients/ilikia/<projeto>/production/`).

O GitHub Pages continua funcionando normalmente — os dois convivem.

## Build

```bash
pnpm install --frozen-lockfile
pnpm build:static      # export estatico SEM basePath, canonical/OG no dominio koko.ag
```

Gera `out/`, que é o diretório servido pelo container (read-only).

Diferença para o `build:pages` (GitHub Pages): lá o site vive em
`/ilikia-verao-2026/`, aqui na raiz. O `basePath` virou configurável
(`NEXT_PUBLIC_BASE_PATH`) e o domínio de canonical/OG também
(`NEXT_PUBLIC_SITE_URL`) — ver `next.config.ts` e `app/layout.tsx`.

## Subir / atualizar

```bash
cd /opt/clients/ilikia/verao-2026/production
git pull && pnpm install --frozen-lockfile && pnpm build:static
docker compose up -d        # so precisa recriar se mudar compose/nginx.conf
```

Como o volume é `./out`, atualizar o build já publica — sem restart.

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
`.htpasswd-dev` (`htpasswd -nbB <user> <senha> > out/.htpasswd-dev`).

## Pendências conhecidas (não resolvidas neste deploy)

1. **Tracking ausente** — a LP não tem Pixel/CAPI/GA4. As outras 10 LPs usam o
   gateway `track-ilikia.koko.ag` (`window.__TRK__` + `t.js`).
2. **Formulário não envia nada** — `handleSubmit` só faz `preventDefault()` e
   mostra a tela de sucesso. O lead é descartado (o próprio README do repo avisa).
3. **Peso das imagens** — ~29 MB em `out/`, tudo PNG/JPG, `og.png` com 3 MB.
   As demais LPs já foram convertidas para WebP.
4. **Fontes `.otf`** — converter para `woff2` (as outras LPs já usam).
