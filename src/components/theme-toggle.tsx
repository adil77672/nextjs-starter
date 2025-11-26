'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted-foreground)]">
        Loading theme…
      </div>
    );
  }

  const currentTheme = (theme === 'system' ? resolvedTheme : theme) === 'dark' ? 'dark' : 'light';

  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:border-[var(--ring)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: currentTheme === 'light' ? 'var(--primary)' : 'var(--accent)',
          boxShadow: 'var(--shadow-xs)',
        }}
      />
      {currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    </button>
  );
}

