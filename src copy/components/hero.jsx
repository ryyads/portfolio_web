import React from 'react';
import { profile, social_links, byOrder } from '../data/portfolio';
const icons = { Email: '/EMAIL.jpg', GitHub: '/GITHUB.jpg', Facebook: '/FB.png' };
export default function Hero() {
  const p = profile[0];
  return (
    <section className="hero" id="top">
      <div>
        <p className="rise" style={{ '--i': 0 }}>Hello, I am</p>
        <h1 className="rise" style={{ '--i': 1 }}>{p.firstname} {p.lastname}</h1>
        <p className="rise tag" style={{ '--i': 2 }}>student / artist</p>
        <div className="icons rise" style={{ '--i': 3 }}>
          {byOrder(social_links).filter((s) => s.is_visible).map((s) => (
            <a key={s.social_id} href={s.url} title={s.platform} target="_blank" rel="noreferrer">
              <img src={icons[s.platform]} alt={s.platform} />
            </a>
          ))}
        </div>
      </div>
      <div className="hero-img"><img src="/ME.png" alt={`${p.firstname} ${p.lastname}`} /></div>
    </section>
  );
}
