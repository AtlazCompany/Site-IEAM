# Graph Report - GRAPH_REPORT.md  (2026-08-18)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 444 nodes · 529 edges · 45 communities (36 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- react
- devDependencies
- sections/index.ts
- dependencies
- compilerOptions
- compilerOptions
- ShaderBackground
- App.tsx
- ui/index.ts
- About.tsx
- Reveal.tsx
- Footer.tsx
- content.ts
- types/enrollment.ts
- package.json
- Button.tsx
- types/index.ts
- FormField.tsx
- EnrollmentModalContext.tsx
- enrollmentService.ts
- Section.tsx
- enrollmentOptions.ts
- useEnrollmentDraft.ts
- meshDrift.ts
- config/enrollment.ts
- gallery.ts
- Badge.tsx
- useScrolled
- Contact.tsx
- Enrollment.tsx
- enrollmentSchema.ts
- forms.ts
- DeferredSection.tsx
- site.ts
- Institution.tsx
- Privacy.tsx
- analytics.ts
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `react` - 37 edges
2. `compilerOptions` - 19 edges
3. `ShaderBackground()` - 17 edges
4. `compilerOptions` - 15 edges
5. `InstitutionGallery()` - 7 edges
6. `EnrollmentWizard()` - 5 edges
7. `buildSubmissionPayload()` - 5 edges
8. `handleContextRestored()` - 5 edges
9. `loop()` - 5 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `plugins` --extends--> `typescript`  [EXTRACTED]
  .oxlintrc.json → package.json

## Import Cycles
- None detected.

## Communities (45 total, 9 thin omitted)

### Community 0 - "react"
Cohesion: 0.05
Nodes (28): react, EnrollmentModal(), EnrollmentModalProps, EnrollmentNavigation(), EnrollmentNavigationProps, EnrollmentProgress(), EnrollmentProgressProps, EnrollmentSuccess() (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.06
Nodes (30): autoprefixer, oxlint, plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, devDependencies (+22 more)

### Community 2 - "sections/index.ts"
Cohesion: 0.10
Nodes (16): CtaFinal(), Differentials(), BANDS, EducationLevels(), Faq(), Hero(), INDICATORS, useHeroParallax() (+8 more)

### Community 3 - "dependencies"
Cohesion: 0.07
Nodes (27): clsx, @fontsource/ibm-plex-mono, @fontsource-variable/archivo, @fontsource-variable/fraunces, framer-motion, @hookform/resolvers, lucide-react, dependencies (+19 more)

### Community 4 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx (+16 more)

### Community 5 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 6 - "ShaderBackground"
Cohesion: 0.20
Nodes (18): compileShader(), GLResources, initGL(), isLowPowerDevice(), isSmallViewport(), ShaderBackground(), draw(), escalate() (+10 more)

### Community 7 - "App.tsx"
Cohesion: 0.11
Nodes (9): App(), Contact, Enrollment, Home, Institution, NewsPage, NotFound, Privacy (+1 more)

### Community 8 - "ui/index.ts"
Cohesion: 0.19
Nodes (10): Card(), CardProps, CountUp(), CountUpProps, PageLoader(), base, FacebookIcon(), IconProps (+2 more)

### Community 9 - "About.tsx"
Cohesion: 0.23
Nodes (8): About(), PILLARS, useTabKeyboardNav(), InstitutionGallery(), handleKeyDown(), handlePointerUp(), pauseThenResume(), InstitutionGalleryProps

### Community 10 - "Reveal.tsx"
Cohesion: 0.18
Nodes (10): Direction, OFFSETS, Reveal(), RevealProps, StaggerGroup(), StaggerItem(), StaggerItemProps, StaggerProps (+2 more)

### Community 11 - "Footer.tsx"
Cohesion: 0.27
Nodes (5): Footer(), LEVELS, Logo(), LogoProps, Navbar()

### Community 12 - "content.ts"
Cohesion: 0.18
Nodes (10): CONFIRMED_TENURE, DIFFERENTIALS, EDUCATION_LEVELS, FAQ_ITEMS, GALLERY_ICONS, GALLERY_ITEMS, METHODOLOGY_STEPS, NEWS_ITEMS (+2 more)

### Community 13 - "types/enrollment.ts"
Cohesion: 0.18
Nodes (8): ContactChannel, EducationLevelId, ENROLLMENT_DEFAULT_VALUES, EnrollmentFormValues, EnrollmentSubmissionResult, WIZARD_STEPS, WizardStepDef, WizardStepId

### Community 14 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 15 - "Button.tsx"
Cohesion: 0.20
Nodes (9): BaseProps, Button, ButtonAsButton, ButtonAsLink, ButtonProps, Size, SIZES, Variant (+1 more)

### Community 16 - "types/index.ts"
Cohesion: 0.20
Nodes (9): Differential, EducationLevel, FaqItem, GalleryItem, MethodologyStep, NavLink, NewsItem, StatItem (+1 more)

### Community 17 - "FormField.tsx"
Cohesion: 0.22
Nodes (7): InputField, InputFieldProps, SelectField, SelectFieldProps, TextareaField, TextareaFieldProps, WrapperProps

### Community 18 - "EnrollmentModalContext.tsx"
Cohesion: 0.32
Nodes (4): EnrollmentModal, EnrollmentModalContext, EnrollmentModalContextValue, OpenEnrollmentOptions

### Community 19 - "enrollmentService.ts"
Cohesion: 0.50
Nodes (7): buildSubmissionPayload(), buildWhatsAppMessage(), effectiveWhatsapp(), getWhatsAppUrl(), labelFor(), levelLabel(), submitEnrollment()

### Community 20 - "Section.tsx"
Cohesion: 0.33
Nodes (5): Container(), ContainerProps, BACKGROUNDS, Section(), SectionProps

### Community 21 - "enrollmentOptions.ts"
Cohesion: 0.29
Nodes (6): BEST_TIME_OPTIONS, CONTACT_CHANNEL_OPTIONS, GRADE_OPTIONS_BY_LEVEL, HOW_FOUND_OPTIONS, RELATIONSHIP_OPTIONS, SHIFT_OPTIONS

### Community 23 - "meshDrift.ts"
Cohesion: 0.33
Nodes (5): FRAGMENT_SHADER_SRC, MESH_DRIFT_COLORS, MESH_DRIFT_COLORS_FLAT, MESH_DRIFT_PRESET, VERTEX_SHADER_SRC

### Community 24 - "config/enrollment.ts"
Cohesion: 0.40
Nodes (4): ContactChannel, ENROLLMENT_CONFIG, ENROLLMENT_DRAFT_STORAGE_KEY, EnrollmentConfig

### Community 25 - "gallery.ts"
Cohesion: 0.40
Nodes (4): GALLERY_CATEGORY_META, GALLERY_SLIDES, GalleryCategory, GallerySlide

### Community 26 - "Badge.tsx"
Cohesion: 0.50
Nodes (3): Badge(), BadgeProps, VARIANTS

### Community 27 - "useScrolled"
Cohesion: 0.67
Nodes (3): useScrolled(), check(), onScroll()

### Community 30 - "enrollmentSchema.ts"
Cohesion: 0.50
Nodes (3): CHANNELS, EnrollmentSchema, LEVEL_IDS

### Community 31 - "forms.ts"
Cohesion: 0.50
Nodes (3): ContactPayload, EnrollmentPayload, SubmissionResult

## Knowledge Gaps
- **193 isolated node(s):** `EnrollmentModalProps`, `EnrollmentNavigationProps`, `EnrollmentProgressProps`, `EnrollmentSuccessProps`, `Variant` (+188 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `DeferredSection.tsx`, `devDependencies`, `sections/index.ts`, `ShaderBackground`, `App.tsx`, `ui/index.ts`, `About.tsx`, `Reveal.tsx`, `Footer.tsx`, `Button.tsx`, `FormField.tsx`, `EnrollmentModalContext.tsx`, `Section.tsx`, `Badge.tsx`, `useScrolled`, `Contact.tsx`?**
  _High betweenness centrality (0.353) - this node is a cross-community bridge._
- **Why does `plugins` connect `devDependencies` to `react`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `ShaderBackground()` (e.g. with `handleContextLost()` and `handleContextRestored()`) actually correct?**
  _`ShaderBackground()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `EnrollmentModalProps`, `EnrollmentNavigationProps`, `EnrollmentProgressProps` to the rest of the system?**
  _193 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.050314465408805034 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._