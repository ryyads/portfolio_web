import React, { useState } from 'react';
import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Skills from './components/skills';
import Projects from './components/projects';
import Services from './components/services';
import Contact from './components/contact';
import Database from './components/database';
import Footer from './components/footer';
import { tables } from './data/portfolio';
import './App.css';

const KEY = 'contact_messages';
function App() {
  const [msgs, setMsgs] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } });
  const send = (m) => {
    const next = [...msgs, { message_id: msgs.length + 1, profile_id: 1, ...m, status: 'unread', created_at: new Date().toISOString() }];
    setMsgs(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact onSend={send} />
      <Database tables={{ ...tables, contact_messages: msgs }} />
      <Footer />
    </div>
  );
}
export default App;
