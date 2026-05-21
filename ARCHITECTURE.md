# ARCHITECTURE.md — Myhub
> Atualizado em 21 mai 2026.

---

## Visão geral

Monorepo pnpm com três apps Astro 5 e uma pasta `data/` para configs de apresentações.

```
Myhub/
├── apps/
│   ├── site/        → site público (porta 4321)
│   ├── hub/         → CMS privado Keystatic (porta 4322)
│   └── portfolio/   → deck de apresentações (porta 4323)
├── data/
│   └── portfolio/
│       ├── deck.config.json        → config do deck legado
│       └── presentations/*.json   → apresentações criadas via hub
└── keystatic.config.ts  → re-exporta apps/hub/keystatic.config
```

---

## Fonte única da verdade

```
apps/site/src/content/
├── profile/main.md          → dados do designer (editado via hub)
├── experience/*.md          → histórico profissional (editado via hub)
├── projects/*.md            → cases com todos os dados visuais (editado via hub)
└── cases/*.md               → cases estruturados Problem/Approach/Outcome (editado via hub)
```

**Regra:** todo conteúdo factual vive nos `.md`. Os apps consomem daqui. Nenhum JSON de conteúdo existe mais.

### Fluxo de dados

```
Keystatic Hub
    │ escreve
    ▼
apps/site/src/content/*.md   ←── fonte de verdade
    │                    │
    │ import.meta.glob   │ import.meta.glob
    ▼                    ▼
apps/site             apps/portfolio
(data.ts)             (lib/data.ts)
```

---

## apps/site — Site público

**Framework:** Astro 5 + React 19 + Tailwind 4 + Three.js
**Porta:** 4321 | **Página:** single scroll

### Como lê dados

`src/lib/data.ts` usa `import.meta.glob` nos `.md` de `src/content/`:

```ts
export const profileData  = getFrontmatter(profileGlob, "main");
export const realtorData  = getFrontmatter(projectGlob, "realtor-com");
export const fanfestData  = getFrontmatter(projectGlob, "fanfest-io");
export const availData    = getFrontmatter(projectGlob, "avail-co");
export const pepsicoData  = getFrontmatter(projectGlob, "pepsico");
```

### Componentes

| Componente | Dados |
|---|---|
| `Hero.tsx` | `profileData.name/role/summary` |
| `AboutMe.astro` | `profileData.about[]` |
| `CasePepsiCo.astro` | `pepsicoData.teams[], .kpiCards[]` |
| `CaseRealtor.astro` | `realtorData.metrics[].color, .teams[]` |
| `CaseAvail.astro` | `availData.paragraphs[], .metrics[].colorFrom/colorTo/suffix` |
| `CaseFanfest.astro` | `fanfestData.sections[], .logos[], .screens[], .metrics[]` |

---

## apps/hub — CMS privado

**Framework:** Astro 5 + Keystatic + React 19 (SSR, Node adapter)
**Porta:** 4322

### Collections Keystatic

| Collection | Arquivo(s) |
|---|---|
| `profile` (singleton) | `apps/site/src/content/profile/main.md` |
| `experience` | `apps/site/src/content/experience/*.md` |
| `projects` | `apps/site/src/content/projects/*.md` |
| `cases` | `apps/site/src/content/cases/*.md` |

Todos os campos opcionais (teams, sections, logos, screens, paragraphs, kpiCards, metric colors) estão expostos no editor Keystatic.

### Portfolio builder (`/portfolio`)

- **Painel esquerdo:** lista de apresentações salvas com link Preview → `$PUBLIC_PORTFOLIO_URL/p/:slug`
- **Painel direito:** seletor de slides (estáticos + cases disponíveis), salva JSON em `data/portfolio/presentations/`

**Env var:** `PUBLIC_PORTFOLIO_URL` (fallback: `http://localhost:4323`)

### API

| Endpoint | Método | O que faz |
|---|---|---|
| `/api/presentations` | GET | lista `data/portfolio/presentations/*.json` |
| `/api/presentations` | POST | cria nova apresentação |
| `/api/presentations` | DELETE | deleta por slug |

---

## apps/portfolio — Deck de apresentações

**Framework:** Astro 5 + React 19 + Tailwind 4
**Porta:** 4323

### Deck legado (`/`, `/cases`, `/cases/:slug`)

Lê de `data/portfolio/deck.config.json`. Projetos: fanfest, avail, realtor, pepsico.

### Novo sistema (`/p/:slug`)

Lê a config da apresentação de `data/portfolio/presentations/:slug.json` e o conteúdo dos `.md` via `import.meta.glob`.

**Slides implementados:**

| Tipo | Fonte | Componente |
|---|---|---|
| `about-me` | `profile/main.md` | `AboutMeSlide` |
| `timeline` | `experience/*.md` | `TimelineSlide` |
| `case:{slug}` | `projects/{slug}.md` | `ContentCaseSlide` |

**Tipos reservados (não implementados):** `skills`, `company-bio`

---

## Schema dos projetos (`projects/*.md`)

Campos comuns a todos:

```yaml
company, role, period, type, summary, order, metrics[], tags[]
```

Campos opcionais por projeto:

| Campo | Tipo | Usado em |
|---|---|---|
| `metrics[].color` | string (classe Tailwind) | gradiente no site |
| `metrics[].colorFrom/colorTo` | string (hex) | gradiente inline (Avail) |
| `metrics[].suffix` | string | sufixo numérico (Avail) |
| `teams[]` | `{name, description, bullets[]}` | Realtor, PepsiCo |
| `paragraphs[]` | string[] (HTML ok) | Avail |
| `sections[]` | `{title, text}[]` | FanFest |
| `logos[]` | string[] (filenames) | FanFest |
| `screens[]` | `{src, alt}[]` | FanFest |
| `kpiCards[]` | `{label, value, trend}[]` | PepsiCo |

---

## Schema das apresentações (`data/portfolio/presentations/:slug.json`)

```json
{
  "slug": "stripe-2025",
  "name": "Stripe 2025",
  "theme": { "accent": "#6366f1", "background": "#09090b", "foreground": "#fafafa" },
  "slides": [
    { "type": "about-me" },
    { "type": "timeline" },
    { "type": "case", "slug": "realtor-com" }
  ],
  "createdAt": "2026-05-21T00:00:00.000Z"
}
```

---

## Schema dos cases (`cases/*.md`)

```yaml
---
title: realtor-com
company: Realtor.com
role: Senior Product Designer
period: "Oct 2023 – May 2025"
order: 1
problem: "..."
approach: "..."
tradeoffs: "..."
outcome: "..."
retrospective: "..."        # opcional
metrics:
  - value: "+12.5%"
    label: Unique lead submissions
tags: [proptech, consumer, ai]
---
```

---

## Próximos passos

### Alta prioridade
1. **Popular `cases/`** — escrever pelo menos um case no Keystatic (Realtor é o mais rico em dados). Desbloqueia o slide `case` nas apresentações com estrutura Problem/Approach/Outcome.

### Média prioridade
2. **Slide `case` lendo de `cases/`** — `ContentCaseSlide` atualmente lê de `projects/`. Quando os cases tiverem conteúdo estruturado, migrar para usar `cases/` como fonte.
3. **Slide `company-bio`** — definir schema (dados da empresa destino, inputados por apresentação).
4. **Export PDF** — implementar via `window.print()` ou endpoint Puppeteer no hub.

### Configuração de produção
5. Definir `PUBLIC_PORTFOLIO_URL` no ambiente de produção do hub (apontar para o domínio do portfolio).
