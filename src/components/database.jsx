import React, { useState } from 'react';
import Section from './section';
import { useDb } from '../data/store';
import { columns } from '../data/portfolio';
const show = (c, v) => (c === 'password' ? '••••••••' : v === null || v === undefined ? 'NULL' : String(v));
export function DatabaseTables() {
  const { db } = useDb();
  const [t, setT] = useState('user');
  const cols = columns[t].split(' ');
  return (
    <>
      <div className="tabs">
        {Object.keys(columns).map((n) => <button key={n} className={n === t ? 'on' : ''} onClick={() => setT(n)}>{n} ({db[n].length})</button>)}
      </div>
      <div className="tbl">
        <table>
          <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {db[t].length === 0 && <tr><td colSpan={cols.length}>No rows yet.</td></tr>}
            {db[t].map((r, i) => <tr key={i}>{cols.map((c) => <td key={c} title={show(c, r[c])}>{show(c, r[c])}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default function Database() {
  return <Section id="database" title="Database Tables"><DatabaseTables /></Section>;
}
