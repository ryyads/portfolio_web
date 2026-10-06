import React from 'react';
import Section from './section';
import { profile, education, experience, certifications, byOrder } from '../data/portfolio';
const date = (d) => (d ? new Date(d).toLocaleDateString('en', { month: 'short', year: 'numeric' }) : '');
export default function About() {
  return (
    <Section id="about" title="About Me" alt>
      <p className="lead">{profile[0].bio}</p>
      <div className="grid">
        <div className="card">
          <h3>Education</h3>
          {byOrder(education).map((e) => (
            <p key={e.education_id}><b>{e.school_name}</b><br />{e.degree} in {e.field_of_study}<br />
              {e.start_year || ''}{e.start_year ? ' – ' : ''}{e.end_year || 'Ongoing'}</p>
          ))}
        </div>
        <div className="card">
          <h3>Work Experience</h3>
          {byOrder(experience).map((e) => (
            <p key={e.experience_id}><b>{e.position}</b>{e.company_name && ` · ${e.company_name}`}<br />
              {e.description}<br />{date(e.start_date)}{e.start_date ? ' – ' : ''}{e.is_current ? 'Present' : date(e.end_date)}</p>
          ))}
        </div>
        <div className="card">
          <h3>Certifications</h3>
          {byOrder(certifications).map((c) => (
            <p key={c.certification_id}><b>{c.certificate_name}</b><br />{c.issuing_organization}{c.issue_date && ` · ${date(c.issue_date)}`}
              {c.credential_url && <><br /><a href={c.credential_url} target="_blank" rel="noreferrer">View credential</a></>}</p>
          ))}
        </div>
        <div className="card">
          <h3>Inspiration in Life</h3>
          <p>My biggest inspiration is my family. They motivate me to work hard, chase my dreams, and build the future I've always envisioned: living as a successful graphic designer.</p>
        </div>
      </div>
    </Section>
  );
}
