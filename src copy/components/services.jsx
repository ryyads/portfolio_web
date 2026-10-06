import React from 'react';
import Section from './section';
import { services, byOrder } from '../data/portfolio';
export default function Services() {
  return (
    <Section id="services" title="Services">
      <div className="grid">
        {byOrder(services).map((s) => (
          <div key={s.service_id} className="card">
            <h3>{s.service_name}</h3>
            <p>{s.description}</p>
            <p><b>{s.starting_price != null ? `From ₱${Number(s.starting_price).toLocaleString()}` : 'Message me for pricing'}</b></p>
            <span className={`badge ${s.is_available ? '' : 'off'}`}>{s.is_available ? 'Available' : 'Unavailable'}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
