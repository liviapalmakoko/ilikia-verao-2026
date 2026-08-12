# Relatório de ajustes — Corpo & Alma Brasileira

Data da entrega: 12/08/2026

## Resumo executivo

A landing page foi revisada a partir do briefing inicial e das rodadas de
feedback visual. A entrega consolida o cabeçalho, o hero em vídeo, os protocolos,
as tecnologias, as imagens wide, a seção final com formulário e o comportamento
responsivo. As tentativas de fazer o título final contornar a modelo foram
abandonadas conforme decisão da revisão; o texto permanece em HTML, com uma
composição estável e legível.

## 1. Menu e cabeçalho

- Logo “Corpo & Alma Brasileira” incorporado ao cabeçalho.
- Navegação desktop reposicionada e centralizada, com escala mais confortável.
- Botão de contato mantido como ação principal.
- Menu mobile revisado para preservar navegação e leitura em telas estreitas.
- Estados de foco visíveis mantidos para navegação por teclado.

## 2. Hero e fundo animado

- O vídeo `magnific_use-the-provided-image-as_s77nNnJl8e` foi aplicado como
  fundo do header, em reprodução automática, silenciosa, contínua e inline.
- O original de 22 MB foi preservado localmente e não entra no deploy.
- Foi criada uma versão 1080p de 9,4 MB para desktop.
- Foi criada uma versão 720p de 6,6 MB para mobile.
- O navegador seleciona automaticamente o arquivo mobile em telas de até 700 px.
- A imagem anterior é usada como poster enquanto o vídeo carrega.
- Para pessoas com “reduzir movimento” ativado no sistema, o hero retorna
  automaticamente à imagem estática.
- A solução anterior do mar animado em CSS continua preservada no código. A
  reversão exige apenas mudar `heroBackgroundMode` de `"video"` para `"image"`
  em `app/page.tsx`; os detalhes estão em `HERO-VARIANTES.md`.

## 3. Layout, leveza visual e arredondamentos

- Raios de borda foram organizados em variáveis de layout e aplicados aos
  principais cards, imagens, formulário e botões.
- O peso visual foi reduzido por meio de fundos mais claros, melhor respiro e
  tratamento mais consistente dos componentes.
- Os botões principais passaram a compartilhar linguagem de bordas e estados.

## 4. Protocolos e interações

- As transições de hover dos protocolos foram alongadas e receberam curvas de
  aceleração mais suaves.
- A expansão dos painéis passou a ocorrer de forma progressiva, sem a mudança
  brusca registrada na primeira versão.
- Em dispositivos sem hover e em preferência de movimento reduzido, as
  animações não são usadas como requisito para acessar o conteúdo.
- As imagens originais de “Abordagens Integradas” foram preservadas; alterações
  ficaram limitadas ao enquadramento e à interação solicitada.

## 5. Imagens e seções wide

- Foi feita auditoria individual dos arquivos recebidos, considerando resolução,
  proporção, transparência, peso e uso na página.
- A seção de paciente passou a usar `paciente-verao-wide.webp`.
- A seção de estratégia utiliza composição horizontal completa.
- A seção final recebeu uma reconstrução wide da modelo sentada, evitando
  ampliar artificialmente um recorte estreito.
- O enquadramento das seções foi ajustado para recuperar a área inferior das
  fotografias e reduzir o excesso de céu.
- As imagens têm fundos e cantos arredondados quando isso faz parte do sistema
  visual, sem recortes indiscriminados.
- Os materiais-fonte recebidos somam aproximadamente 1,9 GB e incluem PSD, AI e
  PDFs muito grandes. Eles foram preservados localmente, mas não enviados ao
  GitHub. Somente os derivados web utilizados entram no repositório.

## 6. Produtos e equipamentos

- Aptos Nano foi reconstruído como packshot vertical com perspectiva e volume
  compatíveis com as demais caixas da vitrine.
- Hydrafacial foi atualizado para o equipamento novo e de maior resolução.
- O mesmo arquivo de Hydrafacial é usado no protocolo Summer Skin e na seção
  Tecnologias, garantindo padronização entre as duas aparições.
- Os produtos da seção Tecnologias receberam alinhamento de base e escala visual
  proporcional, considerando as dimensões reais de cada embalagem/equipamento.

## 7. Tipografia e conteúdo

- Foi realizada auditoria de escala tipográfica nos títulos e textos das seções.
- A quebra do título final no desktop foi organizada como:
  “Leve os protocolos” / “de verão para” / “sua clínica.”
- No mobile, a frase volta a quebrar naturalmente conforme a largura disponível.
- “Hydrafacial” foi protegido contra quebras inadequadas nos pontos críticos.
- Elementos desalinhados foram reposicionados dentro dos respectivos grids.
- O texto comercial “Nossa equipe comercial está pronta...” permanece integrado
  à fotografia, na parte inferior da composição, sem sombra e sem faixa extra.
- Nenhum texto novo de essência foi acrescentado nesta entrega além do conteúdo
  previsto na composição atual.

## 8. Texto ao redor da modelo

O efeito foi tecnicamente testado em desktop, mas não se mostrou robusto diante
das diferentes larguras e enquadramentos. Ele também criava conflitos com o
rosto da modelo e blocos artificiais no mobile. Conforme decisão da revisão, o
efeito foi removido. A versão final mantém texto HTML real — copiável, acessível
e responsivo — sem tentar contornar a pessoa. Essa decisão deve ser mencionada
ao cliente como uma adequação de responsividade e legibilidade.

## 9. Cor

- O azul principal foi clareado para `#86A4BF`, com apoio de tons próximos na
  seção do formulário.
- A escolha aproxima a interface da atmosfera clara e costeira da campanha.
- O código não veio de um manual de marca; é uma aproximação visual e permanece
  como item de validação com o cliente.

## 10. Responsivo

- Alturas fixas e reservas excessivas de viewport foram reduzidas no mobile.
- Fundos passaram a preencher suas áreas sem criar extensões azuis desconectadas
  da fotografia.
- Títulos, parágrafos, cards, formulário e navegação receberam regras próprias
  para tablet e celular.
- A seção final separa corretamente imagem e formulário no fluxo mobile.
- O vídeo usa fonte própria de menor resolução no celular.

## 11. Performance e acessibilidade

- Vídeo configurado com `preload="metadata"`, poster e fontes por largura.
- Animações respeitam `prefers-reduced-motion`.
- Imagens e camadas decorativas têm tratamento semântico apropriado.
- Foco de teclado continua visível.
- Otimizações anteriores das camadas do hero e da seção de estratégia foram
  preservadas para evitar repinturas pesadas durante o scroll.

## 12. Validação da entrega

- ESLint executado sobre o projeto.
- Verificação de whitespace e conflitos com `git diff --check`.
- Build estático do GitHub Pages executado localmente.
- Hero validado em Chrome nas larguras 1440×1000 e 390×844.
- Reprodução confirmada nos dois tamanhos, incluindo seleção do MP4 mobile.
- Texto comercial final verificado via navegador com `text-shadow: none` e
  `box-shadow: none`.

## Pendências conscientes

- Confirmar com o cliente o código oficial do azul de campanha.
- Substituir os três mapas FrameLift se forem fornecidos originais em resolução
  maior.
- WebM pode ser acrescentado em uma rodada futura caso seja necessário reduzir
  ainda mais a transferência do vídeo; não é bloqueador para a versão atual.
