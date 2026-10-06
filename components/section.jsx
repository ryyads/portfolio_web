import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
export function Img({ src, alt, className }) {
  const [bad, setBad] = useState(!src);
  return bad ? <div className={`${className} ph`}>{alt[0]}</div> : <img className={className} src={src} alt={alt} onError={() => setBad(true)} />;
}
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
