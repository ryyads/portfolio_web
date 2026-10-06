import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import { PortfolioContext } from './context';
import { getJSON, postJSON } from './api';
import fallback from './fallback';

import './App.css';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    getJSON('/api/portfolio', fallback).then(async (d) => {
      setData(d);
      // log one visit per browser session into the analytic table
      if (d !== fallback && !sessionStorage.getItem('visited')) {
        sessionStorage.setItem('visited', '1');
        try {
          const r = await postJSON('/api/analytics/visit', { profile_id: d.profile.profile_id });
          setData((prev) => ({ ...prev, visits: r.visits }));
        } catch {}
      }
    });
  }, []);

  return (
    <PortfolioContext.Provider value={data}>
      <div id="top">
        <ScrollManager />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PortfolioContext.Provider>
  );
}

export default App;
