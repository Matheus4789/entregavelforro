# Entre no Forró — Área de Membros (Entregável)

Área de membros estática do curso **Entre no Forró · Forró Sem Parede** (Especial São João 2026).
É o **entregável** que o cliente acessa após comprar pela [landing page](../forro) — mesma identidade visual (laranja `#FF4D00` / preto, fontes Archivo Black + Space Mono + Inter, bandeirinhas de São João).

## O que tem

- **Acesso direto** — sem tela de login; abre já no dashboard com os entregáveis.
- **Dashboard** — saudação por horário, estatísticas (dinâmicas), barra de progresso e "continuar de onde parou".
- **Trilha Iniciante (9 vídeos reais)** — primeiro módulo, com os MP4 de `aulas-iniciante/` tocando direto no player (`<video controls>`), poster gerado de um frame de cada aula.
- **+6 módulos × 3 aulas** da oferta (placeholder de vídeo) — total **7 módulos · 27 aulas**.
- **Player de aula** — vídeo real ou placeholder, descrição, lista lateral (playlist), marcar como concluída, anterior/próxima e avanço automático.
- **6 bônus** liberados.
- **Progresso salvo** em `localStorage` (chaves `enf_done`, `enf_last`).

## Trilha Iniciante (vídeos)

Os 9 vídeos ficam em `aulas-iniciante/*.mp4` e estão mapeados em `COURSE[0].lessons[]`
(campo `video`). As miniaturas foram extraídas com ffmpeg para `assets/iniciante/iniNN.jpg`.
Para regerar uma miniatura: `ffmpeg -y -ss 4 -i "aulas-iniciante/ARQUIVO.mp4" -frames:v 1 -vf scale=640:-1 -q:v 4 assets/iniciante/iniNN.jpg`.

## Como rodar

Tudo é estático. Abra direto ou sirva localmente:

```bash
npx serve .        # recomendado: suporta range requests (seek nos vídeos funciona)
# ou
python3 -m http.server 8080   # funciona, mas sem seek nos vídeos (não faz range request)
```

## Estrutura

```
index.html         → app completo (HTML + CSS + JS inline)
assets/            → logos e miniaturas da oferta
assets/iniciante/  → posters gerados dos vídeos de iniciante
aulas-iniciante/   → 9 vídeos .mp4 da Trilha Iniciante
```

## Conectar mais vídeos

A Trilha Iniciante já está com vídeo real. Para plugar vídeo nos outros módulos,
basta adicionar um campo `video` (caminho do `.mp4` ou URL) na aula em `COURSE[].lessons[]`.
O player detecta o campo automaticamente (`renderVideoStage`): com `video` mostra o
`<video controls>`; sem `video` mostra o placeholder "vídeo em breve".

## Resetar progresso

No console do navegador: `localStorage.clear()`.
