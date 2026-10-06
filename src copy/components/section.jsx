import React from 'react';
import useReveal from '../hooks/useReveal';
export default function Section({ id, title, alt, children }) {
  const ref = useReveal();
  return (
    <section id={id} className={alt ? 'alt' : ''}>
      <div className="wrap reveal" ref={ref}>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
