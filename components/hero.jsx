import React from 'react';
import { usePortfolio, SOCIAL_ICONS } from '../context';

// The profile table has no "title" column, so edit this line (or add one later).
const TAGLINE = 'student / artist';

function Hero() {
  const { profile, social_links } = usePortfolio();
  const fullName = [profile.firstname, profile.middlename, profile.lastname]
    .filter(Boolean)
    .join(' ');

  return (
    <section className="hero">
      <div className="hero-text">
        <h2>Hello, I am</h2>
        <h1 className="gradient-text">{fullName}</h1>
        <p>{TAGLINE}</p>
        <div className="social-links">
          {social_links
            .filter((s) => SOCIAL_ICONS[s.platform.toLowerCase()])
            .map((s) => (
              <a key={s.social_id} href={s.url} target="_blank" rel="noreferrer" title={s.platform}>
                <img src={SOCIAL_ICONS[s.platform.toLowerCase()]} alt={s.platform} />
              </a>
            ))}
        </div>
      </div>
      <div className="hero-image">
        <div className="glow" />
        <img src="/ME.png" alt={`${profile.firstname} ${profile.lastname}`} />
      </div>
    </section>
  );
}

export default Hero;
