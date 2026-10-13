import React, { useState, useEffect } from 'react';
import Section, { Img } from './section';
import { useDb } from '../data/store';
import { byOrder } from '../data/portfolio';
export default function Projects() {
  const { project, project_media } = useDb().db;
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const [main, setMain] = useState(null);
  useEffect(() => { const k = (e) => e.key === 'Escape' && setOpen(null); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  const cats = ['All', ...new Set(project.map((p) => p.category).filter(Boolean))];
  const list = byOrder(project).filter((p) => cat === 'All' || p.category === cat);
  const media = open ? byOrder(project_media.filter((m) => m.project_id === open.project_id)) : [];
  const show = (p) => { setOpen(p); setMain(p.media_url); };
  return (
    <Section id="projects" title="Projects" alt>
      <div className="tabs">{cats.map((c) => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="grid">
        {list.map((p) => (
          <article key={p.project_id} className="card proj" tabIndex={0} onClick={() => show(p)} onKeyDown={(e) => e.key === 'Enter' && show(p)}>
            <Img className="cover" src={p.media_url} alt={p.title} />
            <h3>{p.title}{p.is_featured && <span className="badge">Featured</span>}</h3>
            <small>{p.category}</small>
          </article>
        ))}
      </div>
      {open && (
        <div className="modal" onClick={() => setOpen(null)}>
          <div className="card dialog" role="dialog" aria-label={open.title} onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <Img className="cover big" src={main} alt={open.title} />
            <div className="thumbs">
              {[open.media_url, ...media.map((m) => m.media_url)].filter(Boolean).map((u) => (
                <button key={u} className="thumbbtn" onClick={() => setMain(u)}><Img className="thumb" src={u} alt={open.title} /></button>
              ))}
            </div>
            <h3>{open.title}</h3>
            <p>{open.description}</p>
            {open.demo_url && <a href={open.demo_url} target="_blank" rel="noreferrer">Live demo</a>}{' '}
            {open.github_url && <a href={open.github_url} target="_blank" rel="noreferrer">View project</a>}
          </div>
        </div>
      )}
    </Section>
  );
}
