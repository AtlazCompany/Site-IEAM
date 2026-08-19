---
name: content-update
description: Atualiza textos, dados ou imagens do site institucional. Todo conteúdo do site fica em src/constants/ — nunca edite inline em componentes.
tools: [Read, Edit, Glob]
---

## Atualizar Conteúdo do Site

### Mapa de conteúdo

| O que atualizar | Arquivo |
|---|---|
| Nome, telefone, WhatsApp, e-mail, endereço, redes sociais | `src/constants/site.ts` → `SITE` |
| Links de navegação | `src/constants/site.ts` → `NAV_LINKS` |
| Níveis de ensino (cards) | `src/constants/content.ts` → `EDUCATION_LEVELS` |
| Diferenciais | `src/constants/content.ts` → `DIFFERENTIALS` |
| Depoimentos | `src/constants/content.ts` → `TESTIMONIALS` (se existir) |
| Notícias | `src/constants/content.ts` → `NEWS_ITEMS` |
| FAQ | `src/constants/content.ts` → `FAQ_ITEMS` |
| Passos de metodologia | `src/constants/content.ts` → `METHODOLOGY_STEPS` |
| Galeria de fotos | `src/constants/gallery.ts` → `GALLERY_SLIDES` |
| Opções do formulário de matrícula | `src/config/enrollment.ts` + `src/config/enrollmentOptions.ts` |
| Config de matrícula (endpoint, WhatsApp) | `.env` (VITE_ENROLLMENT_*) |

### Fluxo
1. Leia o arquivo de constante correspondente.
2. Edite apenas o valor, mantendo a estrutura TypeScript.
3. Se adicionar imagem: coloque em `src/assets/images/` e importe no constants.
4. Rode `npm run build` para confirmar sem erros de tipo.

Nunca edite texto diretamente em arquivos `.tsx` — centralize sempre em `constants/`.
