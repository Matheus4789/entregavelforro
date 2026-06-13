# Entre no Forró — Área de Membros (Entregável)

Área de membros estática do curso **Entre no Forró · Forró Sem Parede** (Especial São João 2026).
É o **entregável** que o cliente acessa após comprar pela [landing page](../forro) — mesma identidade visual (laranja `#FF4D00` / preto, fontes Archivo Black + Space Mono + Inter, bandeirinhas de São João).

## O que tem

- **Acesso direto** — sem tela de login; abre já no dashboard com os entregáveis.
- **Dashboard** — saudação por horário, estatísticas (dinâmicas), barra de progresso e "continuar de onde parou".
- **2 trilhas · 17 aulas em vídeo** — Trilha Iniciante (9) e Trilha Intermediária (8), com os vídeos hospedados no **YouTube** tocando num player nativo.
- **Player nativo** — UI própria (play/pause, seek, tempo, velocidade, mudo, fullscreen) com a barra/branding do YouTube ocultos; lista lateral (playlist), marcar como concluída, anterior/próxima e avanço automático ao terminar.
- **Miniaturas** — reaproveitadas das artes da oferta (`assets/mod*.png`, `assets/aula_*.png`).
- **6 bônus com entregável real** — cada card abre uma página própria:
  - *Guia da Abordagem Certa* e *Checklist Anti-Travada* — conteúdo escrito (checklist marcável).
  - *Playlist "Arrasta-pé"* — clássicos do forró, cada um abre no YouTube.
  - *Agenda de Forrós* — links pra achar forró perto (Sympla, Instagram, etc.).
  - *Comunidade VIP* — botão pro grupo (configurável).
  - *Aula Bônus* — player nativo (configurável).
- **Progresso salvo** em `localStorage` (chaves `enf_done`, `enf_last`, `enf_check`).

## Configurar bônus (link do grupo e vídeo bônus)

No topo do `<script>` do `index.html` há duas constantes pra você preencher:

```js
const COMUNIDADE_URL = ''; // convite do grupo (WhatsApp/Telegram) — bônus "Comunidade VIP"
const AULA_BONUS_YT  = ''; // ID do YouTube da aula bônus — bônus "Passos Avançados"
```

Enquanto vazias, o bônus mostra "Conteúdo sendo gerado"; preenchidas, viram o botão/vídeo.

## Ofertas (produtos pagos)

A seção "Ofertas pra você" no dashboard vende produtos extras. A primeira é a
**Playlist do Salão + Passos de Cada Música**: cada música traz andamento e os passos
ideais — e os passos são **clicáveis**, abrindo a aula correspondente.

Cada oferta em `OFFERS` (no script do `index.html`) tem:
- `checkout` — link de pagamento (vazio mostra aviso).
- `code` — código que o aluno usa pra desbloquear após comprar (ex.: `SALAO`).

O desbloqueio é cosmético (guardado em `localStorage` → `enf_unlocked`), ideal pra MVP
sem backend. Para travar de verdade por compra, é preciso um backend de validação.

## Vídeos (YouTube) e player nativo

As aulas estão mapeadas em `COURSE[].lessons[]` pelo campo `yt` (ID do vídeo do YouTube).
O player nativo (`buildNativePlayer`) carrega o vídeo via IFrame API com `controls=0` e
constrói a própria UI; a barra/branding do YouTube ficam ocultos por recorte do quadro
(variável CSS `--np-zoom` no `.np` — aumente se aparecer algo, diminua se cortar demais).

Para trocar/adicionar um vídeo, basta editar o `yt: '<id>'` da aula (o ID é o trecho
de `youtube.com/watch?v=<id>`). Os vídeos precisam estar **Público** ou **Não listado**
no YouTube (vídeos *Privados* não tocam em embed).

## Como rodar

Tudo é estático. Abra o `index.html` direto ou sirva localmente:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Estrutura

```
index.html         → app completo (HTML + CSS + JS inline)
assets/            → logos e miniaturas (artes da oferta, usadas nos cards/aulas)
```

## Conectar mais vídeos

Para plugar vídeo nos outros módulos, adicione um campo `yt: '<id-do-youtube>'` na aula
em `COURSE[].lessons[]`. O player detecta automaticamente (`renderVideoStage`): com `yt`
mostra o embed do YouTube; sem nada mostra o placeholder "vídeo em breve".
(O campo `video: '<url-.mp4>'` também é suportado, caso queira hospedar fora do YouTube.)

## Resetar progresso

No console do navegador: `localStorage.clear()`.
