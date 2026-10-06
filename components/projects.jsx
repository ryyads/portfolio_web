import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context';
import Reveal from './Reveal';
import ProjectCard from './projectCard';

// Home-page preview: featured projects only (is_featured = true).
function Projects() {
  const { projects } = usePortfolio();
  const featured = projects.filter((p) => p.is_featured).slice(0, 3);
  const list = featured.length ? featured : projects.slice(0, 3);

  return (
    <section className="projects" id="projects">
      <Reveal><h2 className="section-title">Projects</h2></Reveal>
      <div className="project-grid">
        {list.map((p, i) => (
          <Reveal key={p.project_id} delay={i * 100}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <Link to="/projects" className="btn">View all projects</Link>
      </Reveal>
    </section>
  );
}

export default Projects;
