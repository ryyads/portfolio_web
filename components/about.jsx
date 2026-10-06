import React from 'react';
import { usePortfolio } from '../context';
import Reveal from './Reveal';

const year = (d) => (d ? new Date(d).getFullYear() : '');

function About() {
  const { profile, education, experience } = usePortfolio();

  return (
    <section className="about" id="about">
      <Reveal><h2 className="section-title">About Me</h2></Reveal>
      <Reveal delay={80}><p className="lead">{profile.bio}</p></Reveal>

      <div className="cards">
        {education.map((e, i) => (
          <Reveal key={e.education_id} delay={i * 100}>
            <div className="card">
              <h3>Education</h3>
              <p><strong>{e.school_name}</strong></p>
              <p>{[e.degree, e.field_of_study].filter(Boolean).join(' in ')}</p>
              {(e.start_year || e.end_year) && (
                <p className="muted">{e.start_year} – {e.end_year || 'Present'}</p>
              )}
              {e.description && <p className="muted">({e.description})</p>}
            </div>
          </Reveal>
        ))}

        {experience.map((x, i) => (
          <Reveal key={x.experience_id} delay={(i + education.length) * 100}>
            <div className="card">
              <h3>Work Experience</h3>
              <p><strong>{x.position}</strong>{x.company_name ? ` · ${x.company_name}` : ''}</p>
              {(x.start_date || x.end_date || x.is_current) && (
                <p className="muted">
                  {year(x.start_date)} – {x.is_current ? 'Present' : year(x.end_date)}
                </p>
              )}
              <p>{x.description}</p>
            </div>
          </Reveal>
        ))}

        <Reveal delay={300}>
          <div className="card">
            <h3>Inspiration in Life</h3>
            <p>
              My biggest inspiration is my family. They motivate me to work hard, chase my dreams,
              and build the future I've always envisioned — living as a successful graphic designer.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;
