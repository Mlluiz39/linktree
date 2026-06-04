# LinkHub MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React + TypeScript frontend MVP for LinkHub with an intro screen, dashboard, local CRUD, drag and drop ordering, localStorage persistence, basic metrics, and public preview.

**Architecture:** This is a frontend-only app. State lives in React and is persisted through a small `linksStorage` boundary, so future API migration does not require rewriting UI components. The dashboard is decomposed into focused components for cards, list, modal, metrics, and preview.

**Tech Stack:** React, TypeScript, Vite, TailwindCSS, `@dnd-kit`, `lucide-react`, CSS transitions.

---

## File Map

- Create `package.json`: scripts and dependencies.
- Create `index.html`: Vite HTML entry.
- Create `vite.config.ts`: Vite React config.
- Create `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: strict TypeScript config.
- Create `tailwind.config.ts`, `postcss.config.js`: Tailwind setup.
- Create `.gitignore`: ignore dependencies, build output, local env, and `.superpowers`.
- Create `README.md`: project setup and commands.
- Create `src/main.tsx`: React entry.
- Create `src/App.tsx`: route state between intro and dashboard.
- Create `src/index.css`: global design system and Tailwind layers.
- Create `src/types/link.ts`: `Link` and `LinkType`.
- Create `src/lib/linkTypes.ts`: display metadata for supported link types.
- Create `src/lib/seedLinks.ts`: first-run sample links.
- Create `src/lib/linksStorage.ts`: load/save links from localStorage.
- Create `src/components/IntroScreen.tsx`: first product presentation screen.
- Create `src/components/Dashboard.tsx`: dashboard orchestration and link mutations.
- Create `src/components/StatsBar.tsx`: derived metrics.
- Create `src/components/LinksList.tsx`: sortable list using `@dnd-kit`.
- Create `src/components/LinkCard.tsx`: single draggable link card.
- Create `src/components/LinkEditorModal.tsx`: create/edit modal.
- Create `src/components/PreviewPanel.tsx`: public preview of active links.

---

### Task 1: Scaffold Vite React Project

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Create: `README.md`

- [ ] **Step 1: Create package metadata**

Create `package.json`:

```json
{
  "name": "linkhub-links-manager",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@vitejs/plugin-react": "^5.0.0",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3",
    "vite": "^5.4.11"
  }
}
```

- [ ] **Step 2: Create Vite HTML entry**

Create `index.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LinkHub Links Manager</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create Vite and TypeScript config**

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

Create `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "tailwind.config.ts"]
}
```

- [ ] **Step 4: Create Tailwind config**

Create `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d1b16",
        parchment: "#f7f2e8",
        linen: "#fffaf1",
        brass: "#b78b43",
        moss: "#24594d",
        muted: "#776b5d"
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body: ["Aptos", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
```

Create `postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

- [ ] **Step 5: Create repository hygiene files**

Create `.gitignore`:

```gitignore
node_modules
dist
.env
.env.*
!.env.example
.DS_Store
*.log
.vite
.superpowers
```

Create `README.md`:

```md
# LinkHub Links Manager

Frontend MVP for managing profile links with CRUD, drag and drop ordering, basic metrics, and a public preview.

## Commands

```bash
npm install
npm run dev
npm run build
```
```

- [ ] **Step 6: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and dependencies install without errors.

- [ ] **Step 7: Commit scaffold**

Run:

```bash
git init
git add package.json package-lock.json index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json tailwind.config.ts postcss.config.js .gitignore README.md
git commit -m "chore: scaffold linkhub frontend"
```

Expected: initial commit succeeds.

---

### Task 2: Domain Types and Local Storage Boundary

**Files:**
- Create: `src/types/link.ts`
- Create: `src/lib/linkTypes.ts`
- Create: `src/lib/seedLinks.ts`
- Create: `src/lib/linksStorage.ts`

- [ ] **Step 1: Create domain type**

Create `src/types/link.ts`:

```ts
export type LinkType =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "whatsapp"
  | "website"
  | "custom";

export type Link = {
  id: string;
  title: string;
  url: string;
  type: LinkType;
  clicks: number;
  active: boolean;
  order: number;
  createdAt: string;
};
```

- [ ] **Step 2: Create type metadata**

Create `src/lib/linkTypes.ts`:

```ts
import type { LinkType } from "../types/link";

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  website: "Website",
  custom: "Personalizado"
};

export const LINK_TYPE_OPTIONS: Array<{ value: LinkType; label: string }> = [
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "website", label: "Website" },
  { value: "custom", label: "Personalizado" }
];
```

- [ ] **Step 3: Create seed data**

Create `src/lib/seedLinks.ts`:

```ts
import type { Link } from "../types/link";

export const seedLinks: Link[] = [
  {
    id: "seed-youtube",
    title: "Novo video no YouTube",
    url: "https://youtube.com/@linkhub",
    type: "youtube",
    clicks: 1284,
    active: true,
    order: 0,
    createdAt: "2026-06-04T12:00:00.000Z"
  },
  {
    id: "seed-instagram",
    title: "Instagram profissional",
    url: "https://instagram.com/linkhub",
    type: "instagram",
    clicks: 864,
    active: true,
    order: 1,
    createdAt: "2026-06-04T12:01:00.000Z"
  },
  {
    id: "seed-whatsapp",
    title: "Agendar pelo WhatsApp",
    url: "https://wa.me/5500000000000",
    type: "whatsapp",
    clicks: 311,
    active: true,
    order: 2,
    createdAt: "2026-06-04T12:02:00.000Z"
  },
  {
    id: "seed-portfolio",
    title: "Portfolio completo",
    url: "https://example.com",
    type: "website",
    clicks: 92,
    active: false,
    order: 3,
    createdAt: "2026-06-04T12:03:00.000Z"
  }
];
```

- [ ] **Step 4: Create storage boundary**

Create `src/lib/linksStorage.ts`:

```ts
import { seedLinks } from "./seedLinks";
import type { Link } from "../types/link";

const STORAGE_KEY = "linkhub.links.v1";

function isLink(value: unknown): value is Link {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.url === "string" &&
    typeof candidate.type === "string" &&
    typeof candidate.clicks === "number" &&
    typeof candidate.active === "boolean" &&
    typeof candidate.order === "number" &&
    typeof candidate.createdAt === "string"
  );
}

export function sortLinks(links: Link[]): Link[] {
  return [...links].sort((a, b) => a.order - b.order);
}

export function loadLinks(): Link[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return seedLinks;

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isLink)) return seedLinks;
    return sortLinks(parsed);
  } catch {
    return seedLinks;
  }
}

export function saveLinks(links: Link[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sortLinks(links)));
}
```

- [ ] **Step 5: Commit domain and storage**

Run:

```bash
git add src/types/link.ts src/lib/linkTypes.ts src/lib/seedLinks.ts src/lib/linksStorage.ts
git commit -m "feat: add link domain and local storage"
```

Expected: commit succeeds.

---

### Task 3: App Entry and Global Styling

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

- [ ] **Step 1: Create React entry**

Create `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 2: Create temporary app shell**

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-parchment text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <p className="font-display text-4xl">LinkHub</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Create global CSS**

Create `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color: #1d1b16;
  background: #f7f2e8;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: Aptos, "Segoe UI", sans-serif;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}
```

- [ ] **Step 4: Build smoke test**

Run:

```bash
npm run build
```

Expected: TypeScript build and Vite build exit with code 0.

- [ ] **Step 5: Commit app entry**

Run:

```bash
git add src/main.tsx src/App.tsx src/index.css
git commit -m "feat: add app shell"
```

Expected: commit succeeds.

---

### Task 4: Intro Screen

**Files:**
- Create: `src/components/IntroScreen.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create intro screen**

Create `src/components/IntroScreen.tsx`:

```tsx
import { ArrowRight, BarChart3, GripVertical, Sparkles } from "lucide-react";

type IntroScreenProps = {
  onOpenDashboard: () => void;
};

export function IntroScreen({ onOpenDashboard }: IntroScreenProps) {
  return (
    <section className="min-h-screen bg-parchment text-ink">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-ink/15 pb-4 text-xs uppercase tracking-[0.18em]">
          <strong>LinkHub</strong>
          <span>Links Manager</span>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-muted">
              Identity and conversion workspace
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Organize os links que movem sua presenca digital.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Crie, priorize e acompanhe links de redes sociais, sites e canais
              de contato em uma interface visual com drag and drop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-linen shadow-[0_14px_35px_rgba(29,27,22,0.22)] transition hover:-translate-y-0.5"
              >
                Abrir dashboard
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                onClick={onOpenDashboard}
                className="rounded-md border border-ink/35 px-5 py-3 text-sm font-semibold transition hover:border-ink hover:bg-linen"
              >
                Ver preview
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-ink/15 bg-linen p-4 shadow-[0_30px_80px_rgba(29,27,22,0.14)]">
            <div className="mb-4 flex items-center justify-between text-sm">
              <strong>marcelo.bio</strong>
              <span className="text-muted">12 ativos</span>
            </div>
            <div className="grid gap-3">
              {[
                ["YouTube", "1.2k", "bg-ink text-linen"],
                ["Instagram", "864", "border border-ink/15"],
                ["WhatsApp", "311", "border border-ink/15"]
              ].map(([label, clicks, className]) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-md px-4 py-4 ${className}`}
                >
                  <span>{label}</span>
                  <span>{clicks}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md bg-parchment p-4 text-sm text-muted">
              Drag para reorganizar. Toggle para publicar.
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-ink/15 pt-5 sm:grid-cols-3">
          <Feature icon={<GripVertical size={18} />} title="Drag and drop" text="Ordem visual dos links" />
          <Feature icon={<BarChart3 size={18} />} title="Analytics" text="Cliques por link" />
          <Feature icon={<Sparkles size={18} />} title="Preview publico" text="Somente links ativos" />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-brass">{icon}</span>
      <span>
        <strong className="block">{title}</strong>
        <span className="text-sm text-muted">{text}</span>
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Wire intro screen in App**

Replace `src/App.tsx` with:

```tsx
import { useState } from "react";
import { IntroScreen } from "./components/IntroScreen";

export default function App() {
  const [route, setRoute] = useState<"intro" | "dashboard">("intro");

  if (route === "dashboard") {
    return (
      <main className="min-h-screen bg-parchment text-ink">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
          <p className="font-display text-4xl">Dashboard em construcao</p>
        </div>
      </main>
    );
  }

  return <IntroScreen onOpenDashboard={() => setRoute("dashboard")} />;
}
```

- [ ] **Step 3: Build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

- [ ] **Step 4: Commit intro screen**

Run:

```bash
git add src/App.tsx src/components/IntroScreen.tsx
git commit -m "feat: add intro screen"
```

Expected: commit succeeds.

---

### Task 5: Dashboard Components and CRUD

**Files:**
- Create: `src/components/Dashboard.tsx`
- Create: `src/components/StatsBar.tsx`
- Create: `src/components/LinkEditorModal.tsx`
- Create: `src/components/PreviewPanel.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create StatsBar**

Create `src/components/StatsBar.tsx`:

```tsx
import type { Link } from "../types/link";

type StatsBarProps = {
  links: Link[];
};

export function StatsBar({ links }: StatsBarProps) {
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeCount = links.filter((link) => link.active).length;
  const topLink = [...links].sort((a, b) => b.clicks - a.clicks)[0];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat label="Cliques totais" value={totalClicks.toLocaleString("pt-BR")} />
      <Stat label="Links ativos" value={String(activeCount)} />
      <Stat label="Melhor link" value={topLink?.title ?? "Sem links"} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-ink/15 bg-linen p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 truncate font-display text-2xl">{value}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create modal**

Create `src/components/LinkEditorModal.tsx`:

```tsx
import { X } from "lucide-react";
import { useState } from "react";
import { LINK_TYPE_OPTIONS } from "../lib/linkTypes";
import type { Link, LinkType } from "../types/link";

type LinkDraft = Pick<Link, "title" | "url" | "type" | "active">;

type LinkEditorModalProps = {
  editingLink: Link | null;
  onClose: () => void;
  onSave: (draft: LinkDraft) => void;
};

export function LinkEditorModal({ editingLink, onClose, onSave }: LinkEditorModalProps) {
  const [title, setTitle] = useState(editingLink?.title ?? "");
  const [url, setUrl] = useState(editingLink?.url ?? "");
  const [type, setType] = useState<LinkType>(editingLink?.type ?? "website");
  const [active, setActive] = useState(editingLink?.active ?? true);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !url.trim()) {
      setError("Titulo e URL sao obrigatorios.");
      return;
    }
    onSave({ title: title.trim(), url: url.trim(), type, active });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-linen p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-3xl">{editingLink ? "Editar link" : "Novo link"}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-ink/10" aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <label className="block text-sm font-semibold">Titulo</label>
        <input className="mt-2 w-full rounded-md border border-ink/20 bg-white px-3 py-3" value={title} onChange={(event) => setTitle(event.target.value)} />

        <label className="mt-4 block text-sm font-semibold">URL</label>
        <input className="mt-2 w-full rounded-md border border-ink/20 bg-white px-3 py-3" value={url} onChange={(event) => setUrl(event.target.value)} />

        <label className="mt-4 block text-sm font-semibold">Tipo</label>
        <select className="mt-2 w-full rounded-md border border-ink/20 bg-white px-3 py-3" value={type} onChange={(event) => setType(event.target.value as LinkType)}>
          {LINK_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <label className="mt-4 flex items-center gap-3 text-sm font-semibold">
          <input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} />
          Link ativo
        </label>

        {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-md border border-ink/25 px-4 py-2">Cancelar</button>
          <button type="submit" className="rounded-md bg-ink px-4 py-2 font-semibold text-linen">Salvar</button>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 3: Create preview panel**

Create `src/components/PreviewPanel.tsx`:

```tsx
import { LINK_TYPE_LABELS } from "../lib/linkTypes";
import type { Link } from "../types/link";

type PreviewPanelProps = {
  links: Link[];
};

export function PreviewPanel({ links }: PreviewPanelProps) {
  const activeLinks = links.filter((link) => link.active);

  return (
    <aside className="rounded-lg border border-ink/15 bg-ink p-4 text-linen">
      <div className="mx-auto max-w-sm rounded-[28px] border border-linen/20 bg-parchment p-4 text-ink">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-brass" />
          <p className="font-display text-2xl">marcelo.bio</p>
          <p className="text-sm text-muted">Links ativos e priorizados</p>
        </div>
        <div className="grid gap-3">
          {activeLinks.map((link) => (
            <a key={link.id} href={link.url} className="rounded-md bg-ink px-4 py-3 text-center text-sm font-semibold text-linen">
              {link.title}
              <span className="block text-xs font-normal text-linen/70">{LINK_TYPE_LABELS[link.type]}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: Create dashboard state and CRUD**

Create `src/components/Dashboard.tsx`:

```tsx
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { loadLinks, saveLinks, sortLinks } from "../lib/linksStorage";
import type { Link } from "../types/link";
import { LinkEditorModal } from "./LinkEditorModal";
import { PreviewPanel } from "./PreviewPanel";
import { StatsBar } from "./StatsBar";

type LinkDraft = Pick<Link, "title" | "url" | "type" | "active">;

export function Dashboard() {
  const [links, setLinks] = useState<Link[]>(() => loadLinks());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const orderedLinks = useMemo(() => sortLinks(links), [links]);

  useEffect(() => {
    saveLinks(links);
  }, [links]);

  function openCreateModal() {
    setEditingLink(null);
    setIsModalOpen(true);
  }

  function handleSave(draft: LinkDraft) {
    setLinks((currentLinks) => {
      if (editingLink) {
        return currentLinks.map((link) => link.id === editingLink.id ? { ...link, ...draft } : link);
      }
      const nextOrder = currentLinks.length;
      const newLink: Link = {
        id: crypto.randomUUID(),
        ...draft,
        clicks: 0,
        order: nextOrder,
        createdAt: new Date().toISOString()
      };
      return [...currentLinks, newLink];
    });
    setIsModalOpen(false);
    setEditingLink(null);
  }

  function handleEdit(link: Link) {
    setEditingLink(link);
    setIsModalOpen(true);
  }

  function handleDelete(id: string) {
    setLinks((currentLinks) => currentLinks.filter((link) => link.id !== id).map((link, index) => ({ ...link, order: index })));
  }

  function handleToggle(id: string) {
    setLinks((currentLinks) => currentLinks.map((link) => link.id === id ? { ...link, active: !link.active } : link));
  }

  return (
    <main className="min-h-screen bg-parchment px-4 py-5 text-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">LinkHub</p>
            <h1 className="font-display text-4xl">Links Manager</h1>
          </div>
          <button type="button" onClick={openCreateModal} className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-linen">
            <Plus size={18} />
            Novo link
          </button>
        </header>

        <div className="mb-5">
          <StatsBar links={orderedLinks} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-lg border border-ink/15 bg-linen p-4">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">Sua ordem publica</p>
            <div id="links-list-mount" />
          </div>
          <PreviewPanel links={orderedLinks} />
        </div>
      </div>

      {isModalOpen ? (
        <LinkEditorModal editingLink={editingLink} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      ) : null}
    </main>
  );
}
```

- [ ] **Step 5: Wire dashboard in App**

Replace `src/App.tsx` with:

```tsx
import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { IntroScreen } from "./components/IntroScreen";

export default function App() {
  const [route, setRoute] = useState<"intro" | "dashboard">("intro");

  if (route === "dashboard") {
    return <Dashboard />;
  }

  return <IntroScreen onOpenDashboard={() => setRoute("dashboard")} />;
}
```

- [ ] **Step 6: Build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

- [ ] **Step 7: Commit CRUD shell**

Run:

```bash
git add src/App.tsx src/components/Dashboard.tsx src/components/StatsBar.tsx src/components/LinkEditorModal.tsx src/components/PreviewPanel.tsx
git commit -m "feat: add dashboard CRUD shell"
```

Expected: commit succeeds.

---

### Task 6: Sortable Link List and Link Cards

**Files:**
- Create: `src/components/LinkCard.tsx`
- Create: `src/components/LinksList.tsx`
- Modify: `src/components/Dashboard.tsx`

- [ ] **Step 1: Create draggable card**

Create `src/components/LinkCard.tsx`:

```tsx
import { CSS } from "@dnd-kit/utilities";
import { Edit3, GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { LINK_TYPE_LABELS } from "../lib/linkTypes";
import type { Link } from "../types/link";

type LinkCardProps = {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function LinkCard({ link, onEdit, onDelete, onToggle }: LinkCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <article ref={setNodeRef} style={style} className={`rounded-md border border-ink/15 bg-white p-4 transition ${isDragging ? "scale-[1.01] shadow-2xl" : "shadow-sm"}`}>
      <div className="flex items-start gap-3">
        <button type="button" className="mt-1 rounded p-1 text-muted hover:bg-parchment" aria-label="Arrastar link" {...attributes} {...listeners}>
          <GripVertical size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-semibold">{link.title}</h3>
            <span className="rounded-full bg-parchment px-2 py-1 text-xs text-muted">{LINK_TYPE_LABELS[link.type]}</span>
          </div>
          <p className="mt-1 truncate text-sm text-muted">{link.url}</p>
          <p className="mt-3 text-sm font-semibold">{link.clicks.toLocaleString("pt-BR")} cliques</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" checked={link.active} onChange={() => onToggle(link.id)} />
            Ativo
          </label>
          <button type="button" onClick={() => onEdit(link)} className="rounded p-2 hover:bg-parchment" aria-label="Editar link">
            <Edit3 size={16} />
          </button>
          <button type="button" onClick={() => onDelete(link.id)} className="rounded p-2 hover:bg-parchment" aria-label="Excluir link">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create sortable list**

Create `src/components/LinksList.tsx`:

```tsx
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Link } from "../types/link";
import { LinkCard } from "./LinkCard";

type LinksListProps = {
  links: Link[];
  onReorder: (links: Link[]) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onCreate: () => void;
};

export function LinksList({ links, onReorder, onEdit, onDelete, onToggle, onCreate }: LinksListProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = links.findIndex((link) => link.id === active.id);
    const newIndex = links.findIndex((link) => link.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex).map((link, index) => ({ ...link, order: index }));
    onReorder(reordered);
  }

  if (links.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-ink/25 bg-parchment p-8 text-center">
        <p className="font-display text-3xl">Nenhum link ainda</p>
        <p className="mt-2 text-muted">Crie o primeiro link para montar sua pagina publica.</p>
        <button type="button" onClick={onCreate} className="mt-5 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-linen">
          Criar primeiro link
        </button>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-3">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
```

- [ ] **Step 3: Wire list into dashboard**

In `src/components/Dashboard.tsx`, import `LinksList`:

```tsx
import { LinksList } from "./LinksList";
```

Replace:

```tsx
<div id="links-list-mount" />
```

With:

```tsx
<LinksList
  links={orderedLinks}
  onReorder={setLinks}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onToggle={handleToggle}
  onCreate={openCreateModal}
/>
```

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

- [ ] **Step 5: Commit drag and drop**

Run:

```bash
git add src/components/Dashboard.tsx src/components/LinkCard.tsx src/components/LinksList.tsx
git commit -m "feat: add sortable links list"
```

Expected: commit succeeds.

---

### Task 7: Final Verification

**Files:**
- No new files required.

- [ ] **Step 1: Run production build**

Run:

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 2: Run dev server**

Run:

```bash
npm run dev
```

Expected: Vite prints a local URL, usually `http://localhost:5173/`.

- [ ] **Step 3: Browser verification**

Open the local URL and verify:

- Intro screen renders first.
- `Abrir dashboard` navigates to dashboard.
- Seed links appear.
- `Novo link` opens modal.
- Saving a new link adds it to the list.
- Editing a link updates title, URL, type, and active state.
- Toggle hides inactive links from preview.
- Dragging a card changes order.
- Refresh keeps the changed order through localStorage.
- Mobile viewport does not overlap text or controls.

- [ ] **Step 4: Commit any verification fixes**

If changes were required:

```bash
git add .
git commit -m "fix: polish linkhub mvp verification"
```

Expected: commit succeeds only if verification fixes were made.

---

## Self-Review

- Spec coverage: intro screen, dashboard, CRUD, active toggle, drag and drop, persistence, preview, basic metrics, responsive layout, README, and `.gitignore` are covered by tasks.
- Red-flag scan: no incomplete markers or unspecified implementation steps remain.
- Type consistency: `Link`, `LinkType`, `LinkDraft`, `loadLinks`, `saveLinks`, and `sortLinks` signatures are consistent across tasks.
