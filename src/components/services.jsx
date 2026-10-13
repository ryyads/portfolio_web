import React from 'react';
import Section from './section';
import { go } from './header';
import { useDb } from '../data/store';
import { byOrder } from '../data/portfolio';
export default function Services({ onRequest }) {
  const { services } = useDb().db;
  return (
    <Section id="services" title="Services">
      <div className="grid">
        {byOrder(services).map((s) => (
          <div key={s.service_id} className="card">
            <h3>{s.service_name}</h3>
            <p>{s.description}</p>
            <p><b>{s.starting_price != null ? `From ₱${Number(s.starting_price).toLocaleString()}` : 'Message me for pricing'}</b></p>
            {s.is_available
              ? <button className="btn" onClick={(e) => { onRequest(s.service_name); go('contact')(e); }}>Request this service</button>
              : <span className="badge off">Unavailable</span>}
          </div>
        ))}
      </div>
    </Section>
  );
}
