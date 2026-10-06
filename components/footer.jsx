import React from 'react';
import { usePortfolio, SOCIAL_ICONS } from '../context';

function Footer() {
  const { profile, social_links, visits } = usePortfolio();
  return (
    <footer className="footer">
      <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        Back to Top
      </a>
      <div className="social-footer">
        {social_links
          .filter((s) => s.is_visible !== false)
          .map((s) => {
            const icon = SOCIAL_ICONS[s.platform.toLowerCase()];
            return (
              <a key={s.social_id} href={s.url} target="_blank" rel="noreferrer" title={s.platform}>
                {icon ? <img src={icon} alt={s.platform} /> : s.platform}
              </a>
            );
          })}
      </div>
      <p>© {new Date().getFullYear()} {profile.firstname} {profile.lastname}. All Rights Reserved.</p>
      {visits > 0 && <p className="visits">{visits} visits</p>}
    </footer>
  );
}

export default Footer;
