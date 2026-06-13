# Entre no Forró — Área de Membros (Entregável)

Área de membros estática do curso **Entre no Forró · Forró Sem Parede** (Especial São João 2026).
É o **entregável** que o cliente acessa após comprar pela [landing page](../forro) — mesma identidade visual (laranja `#FF4D00` / preto, fontes Archivo Black + Space Mono + Inter, bandeirinhas de São João).

## O que tem

- **Acesso direto** — sem tela de login; abre já no dashboard com os entregáveis.
- **Dashboard** — saudação por horário, estatísticas (dinâmicas), barra de progresso e "continuar de onde parou".
- **Trilha Iniciante (9 aulas em vídeo)** — primeiro módulo, com os vídeos hospedados no **YouTube** (embed) tocando direto no player.
- **+6 módulos × 3 aulas** da oferta (placeholder de vídeo) — total **7 módulos · 27 aulas**.
- **Player de aula** — vídeo (YouTube) ou placeholder, descrição, lista lateral (playlist), marcar como concluída, anterior/próxima e avanço automático.
- **6 bônus** liberados.
- **Progresso salvo** em `localStorage` (chaves `enf_done`, `enf_last`).

## Vídeos (YouTube)

As aulas estão mapeadas em `COURSE[].lessons[]` pelo campo `yt` (ID do vídeo do YouTube).
O player monta o embed em `renderVideoStage()` usando `youtube-nocookie.com/embed/<id>`.
As miniaturas dos cards/playlist ficam em `assets/iniciante/iniNN.jpg`.

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
assets/            → logos e miniaturas da oferta
assets/iniciante/  → posters das aulas de iniciante (cards/playlist)
```

## Conectar mais vídeos

Para plugar vídeo nos outros módulos, adicione um campo `yt: '<id-do-youtube>'` na aula
em `COURSE[].lessons[]`. O player detecta automaticamente (`renderVideoStage`): com `yt`
mostra o embed do YouTube; sem nada mostra o placeholder "vídeo em breve".
(O campo `video: '<url-.mp4>'` também é suportado, caso queira hospedar fora do YouTube.)

## Resetar progresso

No console do navegador: `localStorage.clear()`.
