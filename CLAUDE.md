# IEAM — Instituto Educacional Afonso Mafrense

Site institucional React 19 + Vite 8 + TypeScript + TailwindCSS v4 + Framer Motion.

## Comandos essenciais

```bash
npm run dev        # dev server → http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run lint       # oxlint
npm run preview    # serve dist/ → http://localhost:4173
```

## Arquitetura rápida

```
src/
  pages/          # Home Instituição Ensino Notícias Contato Matrícula Privacidade 404
  components/
    layout/       # MainLayout Navbar Footer Logo Seo
    sections/     # Hero About Stats Differentials EducationLevels Methodology
                  # Infrastructure Testimonials News Faq CtaFinal InstitutionGallery PageHero
    enrollment/   # EnrollmentModal EnrollmentWizard + steps/ (7 passos)
    ui/           # Button Card Badge Section Container SectionHeading Reveal
                  # CountUp PageLoader FormField ShaderBackground DeferredSection
  constants/      # site.ts content.ts gallery.ts  ← dados do site
  services/       # enrollmentService.ts leadService.ts analytics.ts
  schemas/        # enrollmentSchema.ts (zod)
  config/         # enrollment.ts (lê VITE_* env vars)
  types/          # index.ts enrollment.ts forms.ts
  hooks/          # useEnrollmentWizard useEnrollmentDraft useEnrollmentModal useScrolled useScrollToTop
  context/        # EnrollmentModalContext
```

## Variáveis de ambiente (`.env`)

```
VITE_ENROLLMENT_API_ENDPOINT=   # endpoint HTTP do backend (vazio = só WhatsApp)
VITE_ENROLLMENT_CONTACT_EMAIL=contato@ieamafrense.com.br
VITE_ENROLLMENT_WHATSAPP_NUMBER=5586999006021
```

## Regras operacionais

- Consulte `GRAPH_REPORT.md` antes de qualquer grep/glob amplo.
- Dados do site ficam em `src/constants/`. Edite lá, nunca inline.
- Alias `@/` aponta para `src/`.
- Sem comentários desnecessários; só quando o WHY não é óbvio.
- Acessibilidade (a11y), SEO semântico e responsividade são não-negociáveis.
