import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context';

function Header() {
  const { profile } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = `${profile.firstname?.[0] || ''}${profile.lastname?.[0] || ''}`;

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">{initials}</Link>
      <nav className="nav">
        <Link to="/#about">About me</Link>
        <Link to="/#skills">Skills</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/#contact" className="contact-button">Contact Me</Link>
      </nav>
    </header>
  );
}

export default Header;
