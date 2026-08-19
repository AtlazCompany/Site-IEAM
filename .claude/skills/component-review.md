---
name: component-review
description: Revisão de qualidade de componente React/TypeScript. Verifica tipagem, props, performance, acessibilidade e consistência com o design system do projeto.
tools: [Read, Grep]
---

## Revisão de Componente React

### Tipagem
- [ ] Props com interface/type nomeado (nunca `any`)
- [ ] `children` tipado como `React.ReactNode` quando necessário
- [ ] Event handlers com tipos corretos (`React.MouseEvent`, etc.)

### Performance
- [ ] `React.memo` aplicado em componentes puros com renders frequentes
- [ ] Evita criar funções/objetos inline em renders (use `useCallback`/`useMemo` quando justificado)
- [ ] Imports lazy (`lazy()`) para páginas (padrão do projeto em `App.tsx`)

### Design System
- [ ] Usa primitivos de `src/components/ui/` (Button, Card, Badge, Section, Container)
- [ ] Classes Tailwind via `cn()` de `src/utils/cn.ts`
- [ ] Animações via `Reveal`/`StaggerGroup` de `ui/Reveal.tsx` ou Framer Motion
- [ ] Dados hardcoded devem ir para `src/constants/`

### Boas práticas
- [ ] Sem `console.log` em produção
- [ ] Sem lógica de negócio em componentes de UI (extrair para hooks/services)
- [ ] Estado local mínimo; preferir props ou contexto
- [ ] Nomes descritivos em português ou inglês consistente com o arquivo

Relate com: arquivo, linha, categoria, descrição e sugestão.
