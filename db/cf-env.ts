type D1Like = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      first: <T = unknown>() => Promise<T | null>;
      run: () => Promise<{ meta: { changes: number } }>;
    };
  };
};

export async function getD1(): Promise<D1Like | null> {
  try {
    // ponytail: eval import keeps `cloudflare:` out of the Node prod graph. Workers still resolve it.
    const load = new Function("s", "return import(s)") as (s: string) => Promise<{ env?: { DB?: D1Like } }>;
    const mod = await load("cloudflare:workers");
    return mod.env?.DB ?? null;
  } catch {
    return null;
  }
}
