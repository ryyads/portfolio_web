import React, { useState } from 'react';
import Section from './section';
import { project, project_media, byOrder } from '../data/portfolio';
function Img({ src, alt, className }) {
  const [bad, setBad] = useState(!src);
  return bad ? <div className={`${className} ph`}>{alt[0]}</div> : <img className={className} src={src} alt={alt} onError={() => setBad(true)} />;
}
export default function Projects() {
  return (
    <Section id="projects" title="Projects" alt>
      <div className="grid">
        {byOrder(project).map((p) => (
          <article key={p.project_id} className="card proj">
            <Img className="cover" src={p.media_url} alt={p.title} />
            <h3>{p.title}{p.is_featured && <span className="badge">Featured</span>}</h3>
            <small>{p.category}</small>
            <p>{p.description}</p>
            <div className="thumbs">
              {byOrder(project_media.filter((m) => m.project_id === p.project_id)).map((m) => (
                <Img key={m.project_media_id} className="thumb" src={m.media_url} alt={p.title} />
              ))}
            </div>
            {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer">Live demo</a>}{' '}
            {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer">Source code</a>}
          </article>
        ))}
      </div>
    </Section>
  );
}
