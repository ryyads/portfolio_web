import React, { useEffect, useState } from 'react';
import Header from './header';
import Hero from './hero';
import About from './about';
import Skills from './skills';
import Projects from './projects';
import Services from './services';
import Contact from './contact';
import Database from './database';
import Footer from './footer';
import { useDb, nextId } from '../data/store';
export default function Home() {
  const { db, add } = useDb();
  const [subject, setSubject] = useState('');
  useEffect(() => {
    if (sessionStorage.getItem('visited')) return;
    sessionStorage.setItem('visited', '1');
    add('analytic', { analytic_id: nextId(db.analytic, 'analytic_id'), profile_id: 1, viewers_count: 1, visited_time: new Date().toISOString() });
    // eslint-disable-next-line
  }, []);
  if (!db.profile[0].is_public) return <div className="private"><h1>This portfolio is private</h1><p>Check back later.</p></div>;
  return (
    <div>
      <Header /><Hero /><About /><Skills /><Projects />
      <Services onRequest={setSubject} />
      <Contact subject={subject} />
      <Database />
      <Footer />
    </div>
  );
}
