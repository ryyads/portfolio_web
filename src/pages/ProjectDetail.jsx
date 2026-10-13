import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJSON } from '../api';
import { usePortfolio } from '../context';

// Route: /projects/:id  -> project row + its project_media rows.
// Customize the layout below however you like.
export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = usePortfolio();
  const local = projects.find((p) => String(p.project_id) === id);
  const [project, setProject] = useState(local || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getJSON(`/api/projects/${id}`, local || null).then((p) => {
      if (alive) {
        setProject(p);
        setLoading(false);
      }
    });
    return () => { alive = false; };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading && !project) return <section className="page"><p className="lead">Loading…</p></section>;
  if (!project)
    return (
      <section className="page">
        <h2 className="section-title">Project not found</h2>
        <div style={{ textAlign: 'center' }}><Link to="/projects" className="btn">Back to projects</Link></div>
      </section>
    );

  return (
    <section className="page project-detail">
      <Link to="/projects" className="back">← All projects</Link>
      <h1 className="gradient-text">{project.title}</h1>
      <div className="detail-meta">
        {project.category && <span className="chip">{project.category}</span>}
        {project.created_at && <span className="muted">{new Date(project.created_at).toLocaleDateString()}</span>}
      </div>

      {project.media_url && <img className="detail-cover" src={project.media_url} alt={project.title} />}

      <p className="detail-desc">{project.description}</p>

      <div className="detail-actions">
        {project.demo_url && <a className="btn" href={project.demo_url} target="_blank" rel="noreferrer">Live demo</a>}
        {project.github_url && <a className="btn ghost" href={project.github_url} target="_blank" rel="noreferrer">GitHub</a>}
      </div>

      {project.media?.length > 0 && (
        <div className="gallery">
          {project.media.map((m) =>
            m.media_type === 'video' ? (
              <video key={m.project_media_id} src={m.media_url} controls />
            ) : (
              <img key={m.project_media_id} src={m.media_url} alt="" loading="lazy" />
            )
          )}
        </div>
      )}
    </section>
  );
}
