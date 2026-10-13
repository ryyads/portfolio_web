import React from 'react';
import { Link } from 'react-router-dom';
import { go } from './header';
import { useDb } from '../data/store';
import { asset } from '../data/assets';
import { byOrder } from '../data/portfolio';
const icons = { Email: '/EMAIL.jpg', GitHub: '/GITHUB.jpg', Facebook: '/FB.png' };
export default function Footer() {
  const { db } = useDb();
  const views = db.analytic.reduce((n, a) => n + a.viewers_count, 0);
  return (
    <footer className="footer">
      <a href="#top" onClick={go('top')}>Back to top</a>
      <div className="icons">
        {byOrder(db.social_links).filter((s) => s.is_visible).map((s) => (
          <a key={s.social_id} href={s.url} title={s.platform} target="_blank" rel="noreferrer">{icons[s.platform] ? <img src={asset(icons[s.platform])} alt={s.platform} /> : <span className="chip">{s.platform}</span>}</a>
        ))}
      </div>
      <p>{views} portfolio views</p>
      <p>©2025 Raeven Maranan. All rights reserved. · <Link to="/admin">Admin</Link></p>
    </footer>
  );
}
