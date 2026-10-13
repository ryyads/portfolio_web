import React from 'react';
export const go = (id) => (e) => { e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
export default function Header() {
  const L = ({ id, children, ...p }) => <a href={`#${id}`} onClick={go(id)} {...p}>{children}</a>;
  return (
    <header className="header">
      <L id="top" className="logo">RM</L>
      <nav className="nav">
        <L id="about">About me</L>
        <L id="skills">Skills</L>
        <L id="projects">Projects</L>
        <L id="services">Services</L>
        <L id="contact" className="pill">Contact Me</L>
      </nav>
    </header>
  );
}
