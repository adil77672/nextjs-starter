"use client";

import { useEffect, useState, useTransition } from "react";

type SessionState = {
  authenticated: boolean;
  message?: string;
};

export function AuthPanel() {
  const [email, setEmail] = useState("demo@clay.dev");
  const [session, setSession] = useState<SessionState>({ authenticated: false });
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    void fetch("/api/auth/session")
      .then((response) => response?.json() ?? { authenticated: false })
      .then((data: SessionState) => setSession(data));
  }, []);

  const signIn = () => {
    startTransition(async () => {
      setStatus(null);
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as SessionState;
      if (!response.ok) {
        setStatus(data.message ?? "Unable to sign in.");
        return;
      }

      setSession(data);
      setStatus("Session cookie stored. You can now open the dashboard.");
    });
  };

  const signOut = () => {
    startTransition(async () => {
      await fetch("/api/auth/session", { method: "DELETE" });
      setSession({ authenticated: false });
      setStatus("Signed out.");
    });
  };

  return (
    <div className="clay-card space-y-4 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-foreground)]">
          Demo auth
        </p>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Cookie-backed middleware guard
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          Issue a fake session cookie, then visit <code className="font-mono">/dashboard</code>. Middleware will redirect unauthenticated users back here.
        </p>
      </div>

      <label className="text-xs font-semibold text-[var(--muted-foreground)]">Email</label>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--foreground)] shadow-inner"
      />

      {status ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--accent-foreground)]">
          {status}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={isPending}
          onClick={signIn}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg disabled:opacity-50"
        >
          {isPending ? "Please wait…" : session.authenticated ? "Refresh session" : "Create session"}
        </button>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-sm"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

