import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDb, nextId } from '../data/store';
import { byOrder } from '../data/portfolio';
import { DatabaseTables } from './database';
const when = (d) => new Date(d).toLocaleString('en', { dateStyle: 'medium', timeStyle: 'short' });
export default function Admin() {
  const { db, add, patch, del, save, reset } = useDb();
  const [ok, setOk] = useState(() => sessionStorage.getItem('admin') === '1');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState('Inbox');
  const login = (e) => {
    e.preventDefault();
    const f = new FormData(e.target), u = db.user[0];
    if (f.get('email') === u.email && f.get('password') === u.password) { sessionStorage.setItem('admin', '1'); setOk(true); } else setErr('Wrong email or password.');
  };
  if (!ok) return (
    <div className="admin"><form className="card login" onSubmit={login}>
      <h2>Admin login</h2>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button className="btn">Log in</button>
      {err && <p className="err" role="alert">{err}</p>}
      <Link to="/">Back to site</Link>
    </form></div>
  );
  const unread = db.contact_messages.filter((m) => m.status === 'unread').length;
  const views = db.analytic.reduce((n, a) => n + a.viewers_count, 0);
  const max = Math.max(1, ...db.analytic.map((a) => a.viewers_count));
  const p = db.profile[0];
  const addProject = (e) => {
    e.preventDefault();
    const f = new FormData(e.target), id = nextId(db.project, 'project_id');
    add('project', { project_id: id, title: f.get('title'), description: f.get('description'), demo_url: f.get('demo_url') || null, github_url: null, category: f.get('category') || null, is_featured: false, media_url: f.get('media_url') || null, display_order: id, created_at: new Date().toISOString() });
    e.target.reset();
  };
  const delProject = (id) => save((d) => ({ ...d, project: d.project.filter((x) => x.project_id !== id), project_media: d.project_media.filter((m) => m.project_id !== id) }));
  return (
    <div className="admin">
      <div className="bar"><h2>Dashboard</h2><Link to="/" className="pill">View site</Link>
        <button className="pill" onClick={() => { sessionStorage.removeItem('admin'); setOk(false); }}>Log out</button></div>
      <div className="tabs">
        {['Inbox', 'Analytics', 'Projects', 'Site content', 'Database'].map((t) => <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>{t === 'Inbox' ? `Inbox (${unread})` : t}</button>)}
      </div>

      {tab === 'Inbox' && (db.contact_messages.length === 0 ? <p className="card">No messages yet. Messages from your contact form appear here.</p> :
        [...db.contact_messages].reverse().map((m) => (
          <div key={m.message_id} className={`card msg ${m.status}`}>
            <b>{m.subject || '(no subject)'}</b> <span className="badge">{m.status}</span>
            <p>{m.message}</p>
            <small>{m.sender_name} · <a href={`mailto:${m.sender_email}`}>{m.sender_email}</a> · {when(m.created_at)}</small>
            <div className="row">
              <button className="btn" onClick={() => patch('contact_messages', 'message_id', m.message_id, { status: m.status === 'unread' ? 'read' : 'unread' })}>Mark {m.status === 'unread' ? 'read' : 'unread'}</button>
              <button className="btn ghost" onClick={() => del('contact_messages', 'message_id', m.message_id)}>Delete</button>
            </div>
          </div>
        )))}

      {tab === 'Analytics' && (
        <div className="card">
          <h3>{views} total views</h3>
          {db.analytic.map((a) => (
            <div key={a.analytic_id} className="barrow"><small>{when(a.visited_time)}</small>
              <div className="track"><div className="fill" style={{ width: `${(a.viewers_count / max) * 100}%` }} /></div><b>{a.viewers_count}</b></div>
          ))}
        </div>
      )}

      {tab === 'Projects' && (<>
        <form className="card admin-form" onSubmit={addProject}>
          <h3>Add a project</h3>
          <input name="title" placeholder="Title*" required />
          <input name="category" placeholder="Category (e.g. Digital art)" />
          <input name="media_url" placeholder="Image path (e.g. /projects/art1.png)" />
          <input name="demo_url" placeholder="Demo link" />
          <textarea name="description" placeholder="Description" />
          <button className="btn">Add project</button>
        </form>
        {byOrder(db.project).map((x) => (
          <div key={x.project_id} className="card row between">
            <span><b>{x.title}</b> <small>{x.category}</small></span>
            <span className="row">
              <button className="btn" onClick={() => patch('project', 'project_id', x.project_id, { is_featured: !x.is_featured })}>{x.is_featured ? 'Unfeature' : 'Feature'}</button>
              <button className="btn ghost" onClick={() => delProject(x.project_id)}>Delete</button>
            </span>
          </div>
        ))}
      </>)}

      {tab === 'Database' && <DatabaseTables />}

      {tab === 'Site content' && (<>
        <div className="card admin-form">
          <h3>Profile</h3>
          <textarea value={p.bio || ''} onChange={(e) => patch('profile', 'profile_id', p.profile_id, { bio: e.target.value })} />
          <label><input type="checkbox" checked={p.is_public} onChange={(e) => patch('profile', 'profile_id', p.profile_id, { is_public: e.target.checked })} /> Portfolio is public</label>
        </div>
        <div className="card">
          <h3>Services</h3>
          {db.services.map((s) => <label key={s.service_id} className="check"><input type="checkbox" checked={s.is_available} onChange={(e) => patch('services', 'service_id', s.service_id, { is_available: e.target.checked })} /> {s.service_name} is available</label>)}
        </div>
        <div className="card">
          <h3>Social links</h3>
          {db.social_links.map((s) => <label key={s.social_id} className="check"><input type="checkbox" checked={s.is_visible} onChange={(e) => patch('social_links', 'social_id', s.social_id, { is_visible: e.target.checked })} /> Show {s.platform}</label>)}
        </div>
        <button className="btn ghost" onClick={() => window.confirm('Reset all data back to portfolio.js?') && reset()}>Reset all data</button>
      </>)}
    </div>
  );
}
