import React from 'react';
import { social_links, analytic, byOrder } from '../data/portfolio';
const icons = { Email: '/EMAIL.jpg', GitHub: '/GITHUB.jpg', Facebook: '/FB.png' };
export default function Footer() {
  const views = analytic.reduce((n, a) => n + a.viewers_count, 0);
  return (
    <footer className="footer">
      <a href="#top">Back to top</a>
      <div className="icons">
        {byOrder(social_links).filter((s) => s.is_visible).map((s) => (
          <a key={s.social_id} href={s.url} title={s.platform} target="_blank" rel="noreferrer"><img src={icons[s.platform]} alt={s.platform} /></a>
        ))}
      </div>
      <p>{views} portfolio views</p>
      <p>©2025 Raeven Maranan. All rights reserved.</p>
    </footer>
  );
}
