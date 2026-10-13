import React from 'react';
import Section from './section';
import { useDb } from '../data/store';
import { asset } from '../data/assets';
import { byOrder } from '../data/portfolio';
const icons = { ibispaint: '/IBS.PNG', figma: '/FIGMA.jfif', photoshop: '/PTSHP.PNG' };
export default function Skills() {
  const { skills } = useDb().db;
  return (
    <Section id="skills" title="Skills">
      <div className="skills-icons">
        {byOrder(skills).map((s) => (
          <div key={s.skill_id} className="skill">
            {icons[s.skill_name.toLowerCase()] && <img src={asset(icons[s.skill_name.toLowerCase()])} alt="" />}
            <p>{s.skill_name}</p>
            <small>{s.category}{s.year_acquired && ` · since ${s.year_acquired}`}</small>
          </div>
        ))}
      </div>
    </Section>
  );
}
