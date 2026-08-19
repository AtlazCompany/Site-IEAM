---
name: seo-a11y-check
description: Audita um componente ou página quanto a SEO semântico e acessibilidade (a11y). Verifica heading hierarchy, alt texts, aria-labels, roles, contraste e meta tags.
tools: [Read, Grep, Glob]
---

## Checklist SEO & A11y

Ao auditar um arquivo, verifique:

### Semântica HTML
- [ ] Hierarquia de headings correta (h1 → h2 → h3, sem pular níveis)
- [ ] Elementos semânticos (`<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- [ ] `<title>` e `<meta name="description">` presentes e únicos por página (ver `Seo.tsx`)

### Imagens
- [ ] Todo `<img>` tem `alt` descritivo (não vazio, exceto decorativas com `alt=""`)
- [ ] Imagens decorativas usam `aria-hidden="true"`

### Interatividade
- [ ] Botões têm texto visível ou `aria-label`
- [ ] Links descritivos (não "clique aqui")
- [ ] Foco visível em todos elementos interativos
- [ ] Modais têm `role="dialog"` e `aria-modal="true"`
- [ ] Navegação por teclado funciona (Tab, Enter, Esc)

### Formulários (ver `FormField.tsx`)
- [ ] Cada `<input>` tem `<label>` associado via `htmlFor`/`id`
- [ ] Mensagens de erro anunciadas com `aria-live` ou `role="alert"`
- [ ] `required` marcado com `aria-required="true"`

### Performance/SEO
- [ ] Imagens pesadas usam lazy loading
- [ ] Textos alternativos incluem palavras-chave relevantes
- [ ] URLs em português e descritivas (já configuradas no `App.tsx`)

Relate cada problema com: arquivo, linha, severidade (critical/warning/info) e sugestão de fix.
