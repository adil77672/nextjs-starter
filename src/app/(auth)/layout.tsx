import type { ReactNode } from 'react';

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-[var(--foreground)]">
      <div className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        {children}
      </div>
    </div>
  );
}

