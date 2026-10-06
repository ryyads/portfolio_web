import React, { createContext, useContext, useState } from 'react';
import { tables } from './portfolio';
const KEY = 'portfolio_db';
const Ctx = createContext();
export const nextId = (rows, k) => Math.max(0, ...rows.map((r) => r[k])) + 1;
export function StoreProvider({ children }) {
  const [db, setDb] = useState(() => { try { return { ...tables, ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return tables; } });
  const save = (fn) => setDb((d) => { const n = fn(d); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {} return n; });
  const api = {
    db, save,
    add: (t, row) => save((d) => ({ ...d, [t]: [...d[t], row] })),
    patch: (t, k, id, p) => save((d) => ({ ...d, [t]: d[t].map((r) => (r[k] === id ? { ...r, ...p } : r)) })),
    del: (t, k, id) => save((d) => ({ ...d, [t]: d[t].filter((r) => r[k] !== id) })),
    reset: () => { try { localStorage.removeItem(KEY); } catch {} setDb(tables); },
  };
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
export const useDb = () => useContext(Ctx);
