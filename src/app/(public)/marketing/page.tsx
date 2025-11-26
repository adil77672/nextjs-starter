import { AuthPanel } from '@/components/auth-panel';
import { ThemeToggle } from '@/components/theme-toggle';

const starterCommands = [
  { label: 'pnpm dlx shadcn@latest init', accent: 'bg-[var(--primary)] text-[var(--primary-foreground)]' },
  { label: 'yarn dlx shadcn@latest add button card', accent: 'bg-[var(--accent)] text-[var(--accent-foreground)]' },
  { label: 'bunx shadcn@latest add theme.json', accent: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]' },
];

const cards = [
  {
    title: 'Clay palette',
    detail: '35+ CSS variables mapped to Tailwind v4 tokens for instant theming.',
  },
  {
    title: 'Shadcn blocks',
    detail: 'Use the CLI to drop in Button, Card, Sidebar, and Theme toggles.',
  },
  {
    title: 'Dark mode ready',
    detail: 'Switch via `.dark` or `data-theme="dark"` to integrate with shadcn sidebar toggles.',
  },
];

export default function MarketingPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <section className="space-y-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-10 shadow-xl">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.45em] text-[var(--muted-foreground)]">Claymorphism + shadcn</p>
          <h1 className="text-4xl font-semibold text-[var(--foreground)]">
            Ready-to-skin App Router starter for shadcn/ui
          </h1>
          <p className="text-base text-[var(--muted-foreground)]">
            Import any component with the shadcn CLI, and it will automatically inherit this clay theme. Dark mode can
            be controlled from the sidebar toggle ({'`'}data-theme{'`'}) or by applying the traditional `.dark` class.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-md">
            View components
          </button>
          <button className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm">
            Open docs
          </button>
          <ThemeToggle />
        </div>
      </section>

      <AuthPanel />

      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-foreground)]">CLI cheatsheet</p>
        <div className="grid gap-4 md:grid-cols-3">
          {starterCommands.map((cmd) => (
            <div key={cmd.label} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 font-mono text-sm">
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold shadow ${cmd.accent}`}>
                shadcn
              </span>
              <div className="mt-3 break-all text-[var(--foreground)]">{cmd.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{card.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{card.detail}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

