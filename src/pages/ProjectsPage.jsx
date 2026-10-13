import React, { useState } from 'react';
import { usePortfolio } from '../context';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/projectCard';

export default function ProjectsPage() {
  const { projects } = usePortfolio();
  const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const shown = cat === 'All' ? projects : projects.filter((p) => p.category === cat);

  return (
    <section className="page projects">
      <h2 className="section-title">All Projects</h2>
      <div className="filters">
        {cats.map((c) => (
          <button key={c} className={`chip-btn ${c === cat ? 'active' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {shown.map((p, i) => (
          <Reveal key={p.project_id} delay={i * 70}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
