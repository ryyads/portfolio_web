import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.project_id}`} className="project-card">
      <div className="project-thumb">
        {project.media_url ? (
          <img src={project.media_url} alt={project.title} loading="lazy" />
        ) : (
          <div className="project-placeholder">{project.title[0]}</div>
        )}
      </div>
      <div className="project-info">
        {project.category && <span className="chip">{project.category}</span>}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </Link>
  );
}
