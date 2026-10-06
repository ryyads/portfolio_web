import React, { useState } from 'react';
import Section from './section';
import { columns } from '../data/portfolio';
const show = (v) => (v === null || v === undefined ? 'NULL' : String(v));
export default function Database({ tables }) {
  const [t, setT] = useState('user');
  const cols = columns[t].split(' ');
  return (
    <Section id="database" title="Database Tables">
      <div className="tabs">
        {Object.keys(tables).map((n) => (
          <button key={n} className={n === t ? 'on' : ''} onClick={() => setT(n)}>{n}</button>
        ))}
      </div>
      <div className="tbl">
        <table>
          <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {tables[t].length === 0 && <tr><td colSpan={cols.length}>No rows yet.</td></tr>}
            {tables[t].map((r, i) => <tr key={i}>{cols.map((c) => <td key={c} title={show(r[c])}>{show(r[c])}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
