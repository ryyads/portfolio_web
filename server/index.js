require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const ssl = process.env.PG_CA_PATH && fs.existsSync(process.env.PG_CA_PATH)
  ? { ca: fs.readFileSync(process.env.PG_CA_PATH).toString() }
  : { rejectUnauthorized: false };

// strip ?sslmode=... so the explicit ssl object above is used
const pool = new Pool({
  connectionString: (process.env.DATABASE_URL || '').replace(/\?sslmode=[^&]*/, ''),
  ssl,
});

const app = express();
app.use(cors({ origin: (process.env.CORS_ORIGIN || '*').split(',') }));
app.use(express.json());

const PROFILE_ID = Number(process.env.PROFILE_ID || 1);
const q = (text, params) => pool.query(text, params).then((r) => r.rows);
const wrap = (fn) => (req, res) => fn(req, res).catch((e) => {
  console.error(e);
  res.status(500).json({ error: 'Server error' });
});

// Everything the home page needs, in one request.
app.get('/api/portfolio', wrap(async (req, res) => {
  const [profile] = await q('SELECT * FROM "profile" WHERE profile_id=$1 AND is_public=TRUE', [PROFILE_ID]);
  if (!profile) return res.status(404).json({ error: 'Profile not found or not public' });

  const byProfile = (table) =>
    q(`SELECT * FROM "${table}" WHERE profile_id=$1 ORDER BY display_order, 1`, [PROFILE_ID]);

  const [skills, education, experience, certifications, services, social_links, projects, visits] =
    await Promise.all([
      byProfile('skills'),
      byProfile('education'),
      byProfile('experience'),
      byProfile('certifications'),
      byProfile('services'),
      q('SELECT * FROM "social_links" WHERE profile_id=$1 AND is_visible=TRUE ORDER BY display_order, social_id', [PROFILE_ID]),
      q('SELECT * FROM "project" ORDER BY display_order, project_id'),
      q('SELECT COALESCE(SUM(viewers_count),0)::int AS n FROM "analytic" WHERE profile_id=$1', [PROFILE_ID]),
    ]);

  res.json({ profile, skills, education, experience, certifications, services, social_links, projects, visits: visits[0].n });
}));

app.get('/api/projects', wrap(async (req, res) => {
  res.json(await q('SELECT * FROM "project" ORDER BY display_order, project_id'));
}));

app.get('/api/projects/:id', wrap(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Bad id' });
  const [project] = await q('SELECT * FROM "project" WHERE project_id=$1', [id]);
  if (!project) return res.status(404).json({ error: 'Not found' });
  project.media = await q('SELECT * FROM "project_media" WHERE project_id=$1 ORDER BY display_order, project_media_id', [id]);
  res.json(project);
}));

app.post('/api/contact', wrap(async (req, res) => {
  const { sender_name, sender_email, subject, message } = req.body || {};
  if (!sender_name || !sender_email || !message) return res.status(400).json({ error: 'Missing fields' });
  await q(
    'INSERT INTO "contact_messages"(profile_id, sender_name, sender_email, subject, message) VALUES ($1,$2,$3,$4,$5)',
    [PROFILE_ID, String(sender_name).slice(0, 255), String(sender_email).slice(0, 255), String(subject || '').slice(0, 255), String(message)]
  );
  res.json({ ok: true });
}));

// One row per visit; total = SUM(viewers_count).
app.post('/api/analytics/visit', wrap(async (req, res) => {
  await q('INSERT INTO "analytic"(profile_id, viewers_count) VALUES ($1, 1)', [PROFILE_ID]);
  const [r] = await q('SELECT COALESCE(SUM(viewers_count),0)::int AS n FROM "analytic" WHERE profile_id=$1', [PROFILE_ID]);
  res.json({ visits: r.n });
}));

app.listen(process.env.PORT || 5000, () => console.log('API running on port', process.env.PORT || 5000));
