import React from 'react';
export default function Header() {
  return (
    <header className="header">
      <a href="#top" className="logo">RM</a>
      <nav className="nav">
        <a href="#about">About me</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#services">Services</a>
        <a href="#database">Database</a>
        <a href="#contact" className="pill">Contact Me</a>
      </nav>
    </header>
  );
}
