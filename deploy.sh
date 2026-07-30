#!/usr/bin/env bash
# Build + publicacao da LP Verao 2026 em ilikia-verao.koko.ag.
#
# O container serve `www/`, que e sincronizado a partir do `out/` gerado pelo
# Next. Duas armadilhas que isso evita:
#   1. `next build` APAGA e recria o `out/`. Se o compose montasse `out/`
#      direto, o container ficaria preso ao inode antigo e serviria 404.
#   2. Recriar o container abre uma janela em que o Traefik responde 404 — e o
#      Cloudflare cacheia esse 404 por alguns minutos, deixando o site fora do
#      ar mesmo com o origin ja saudavel.
# Com o rsync, publicar e so trocar arquivos: sem restart, sem janela de 404.
set -euo pipefail

cd "$(dirname "$0")"

echo "==> build"
pnpm install --frozen-lockfile
pnpm build:static

echo "==> publicando"
mkdir -p www
rsync -a --delete out/ www/

# So sobe o container se ele ainda nao estiver rodando (ou se o compose mudou).
docker compose up -d

echo "==> smoke test"
fail=0
check() {
  local path="$1" expected="${2:-200}"
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' "https://ilikia-verao.koko.ag${path}")
  if [ "$code" = "$expected" ]; then
    echo "  ok   $path ($code)"
  else
    echo "  FALHA $path (esperado $expected, veio $code)"
    fail=1
  fi
}

check /
check /og.jpg
check /fonts/sketchetik-black.woff2
check /assets/hero-oficial.webp

if curl -s https://ilikia-verao.koko.ag/ | grep -q '__TRK__'; then
  echo "  ok   tracking (__TRK__ no head)"
else
  echo "  FALHA tracking (__TRK__ ausente)"
  fail=1
fi

if [ "$fail" = "0" ]; then
  echo "==> no ar: https://ilikia-verao.koko.ag"
else
  echo "==> deploy com falhas (se acabou de recriar o container, pode ser 404"
  echo "    cacheado no Cloudflare — expira em ~3 min, rode de novo)"
  exit 1
fi
