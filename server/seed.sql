-- Run AFTER creating your 12 tables. Fill in every "CHANGE_ME" / blank before running.
-- password must be a bcrypt hash (e.g. node -e "console.log(require('bcryptjs').hashSync('yourpass',10))")
-- This assumes a fresh database so profile_id = 1 and project_id = 1.

INSERT INTO "user"(email, password, role)
VALUES ('raevenladine@gmail.com', 'CHANGE_ME_BCRYPT_HASH', 'admin');

INSERT INTO "profile"(user_id, lastname, firstname, middlename, bio, is_public)
VALUES (
  (SELECT user_id FROM "user" WHERE email='raevenladine@gmail.com'),
  'Maranan', 'Raeven', '',   -- <- put your middle name
  'Hello, I''m Raeven! I am 20 years old and my hobbies are drawing, singing, eating and sleeping~',
  TRUE
);

INSERT INTO "skills"(profile_id, skill_name, category, year_acquired, display_order) VALUES
(1, 'ibispaint', 'Digital Art', NULL, 1),
(1, 'figma',     'Design',      NULL, 2),
(1, 'photoshop', 'Digital Art', NULL, 3);

INSERT INTO "education"(profile_id, school_name, degree, field_of_study, start_year, end_year, description, display_order)
VALUES (1, 'Dalubhasaan ng Lungsod ng Lucena', 'Bachelor of Science', 'Information Technology', NULL, NULL, 'Ongoing', 1);

INSERT INTO "experience"(profile_id, company_name, position, description, is_current, display_order)
VALUES (1, 'Freelance', 'Digital Artist',
 'I create digital artworks for various commissions locally and internationally, specializing in visually appealing pieces for personal projects.',
 TRUE, 1);

INSERT INTO "social_links"(profile_id, platform, url, display_order) VALUES
(1, 'Email',    'mailto:raevenladine@gmail.com',          1),
(1, 'GitHub',   'https://ryyads.github.io/Portfolio/',    2),
(1, 'Facebook', 'https://www.facebook.com/raeven.ladine', 3);

-- Example project (edit freely). media_url can be /file.png (from public/) or a full image URL.
INSERT INTO "project"(title, description, category, is_featured, media_url, demo_url, github_url, display_order)
VALUES ('My First Project', 'Describe your project here.', 'Digital Art', TRUE, '/ME.png', '', '', 1);

INSERT INTO "project_media"(project_id, media_url, media_type, display_order)
VALUES (1, '/ME.png', 'image', 1);
