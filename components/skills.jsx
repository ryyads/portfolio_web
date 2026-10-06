import React from 'react';
import { usePortfolio, SKILL_ICONS } from '../context';
import Reveal from './Reveal';

function Skills() {
  const { skills } = usePortfolio();
  return (
    <section className="skills" id="skills">
      <Reveal><h2 className="section-title">Skills</h2></Reveal>
      <div className="skills-icons">
        {skills.map((s, i) => {
          const icon = SKILL_ICONS[s.skill_name.toLowerCase()];
          return (
            <Reveal key={s.skill_id} delay={i * 90}>
              <div className="skill">
                {icon ? <img src={icon} alt={s.skill_name} /> : <span className="skill-dot">{s.skill_name[0]}</span>}
                <p>{s.skill_name}</p>
                {s.category && <small>{s.category}</small>}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
