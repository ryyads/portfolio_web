import React from 'react';
import { useDb } from '../data/store';
import { asset } from '../data/assets';
import { byOrder } from '../data/portfolio';
const icons = { Email: '/EMAIL.jpg', GitHub: '/GITHUB.jpg', Facebook: '/FB.png' };
export default function Hero() {
  const { db } = useDb();
  const p = db.profile[0];
  return (
    <section className="hero" id="top">
      <div>
        <p className="rise" style={{ '--i': 0 }}>Hello, I am</p>
        <h1 className="rise" style={{ '--i': 1 }}>{p.firstname} {p.lastname}</h1>
        <p className="rise tag" style={{ '--i': 2 }}>student / artist</p>
        <div className="icons rise" style={{ '--i': 3 }}>
          {byOrder(db.social_links).filter((s) => s.is_visible).map((s) => (
            <a key={s.social_id} href={s.url} title={s.platform} target="_blank" rel="noreferrer">{icons[s.platform] ? <img src={asset(icons[s.platform])} alt={s.platform} /> : <span className="chip">{s.platform}</span>}</a>
          ))}
        </div>
      </div>
      <div className="hero-img"><img src={asset('/ME.png')} alt={`${p.firstname} ${p.lastname}`} /></div>
    </section>
  );
}
