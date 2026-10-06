// One array per database table. Column names match your schema.
// Rows marked SAMPLE are placeholders: replace them with your real content.
// Demo admin login (front-end only, NOT real security). Change the password here.
export const user = [{ user_id: 1, email: 'raevenladine@gmail.com', password: 'admin123', role: 'owner', created_at: '2026-10-06T00:00:00Z' }];
export const profile = [{ profile_id: 1, user_id: 1, lastname: 'Maranan', firstname: 'Raeven', middlename: null, bio: "Hello, I'm Raeven! I'm 22 years old and my hobbies are drawing, singing, eating and sleeping~", is_public: true }];
export const project = [ // SAMPLE
  { project_id: 1, title: 'Character Portrait Commission', description: 'Digital portrait made in ibispaint.', demo_url: null, github_url: null, category: 'Digital art', is_featured: true, media_url: '/projects/portrait.png', display_order: 1, created_at: '2026-10-06T00:00:00Z' },
  { project_id: 2, title: 'Sticker Pack', description: 'A set of illustrated stickers.', demo_url: null, github_url: null, category: 'Illustration', is_featured: false, media_url: '/projects/stickers.png', display_order: 2, created_at: '2026-10-06T00:00:00Z' },
  { project_id: 3, title: 'Portfolio Website', description: 'This site, built with React.', demo_url: 'https://ryyads.github.io/Portfolio/', github_url: null, category: 'Web', is_featured: false, media_url: null, display_order: 3, created_at: '2026-10-06T00:00:00Z' },
  { project_id: 4, title: 'Valentine project', description: 'This site, built with React.', demo_url: 'https://ryyads.github.io/vday_invite/', github_url: null, category: 'Web', is_featured: false, media_url: null, display_order: 4, created_at: '2026-10-06T00:00:00Z' },
  { project_id: 5, title: 'Enrollment Form', description: 'This site, built with React.', demo_url: 'https://ryyads.github.io/enrollment-form/', github_url: null, category: 'Web', is_featured: false, media_url: null, display_order: 5, created_at: '2026-10-06T00:00:00Z' },
];
export const project_media = [ // SAMPLE
  { project_media_id: 1, project_id: 1, media_url: '/projects/portrait-sketch.png', media_type: 'image', display_order: 1 },
  { project_media_id: 2, project_id: 1, media_url: '/projects/portrait-lineart.png', media_type: 'image', display_order: 2 },
];
export const analytic = [
  { analytic_id: 1, profile_id: 1, viewers_count: 24, visited_time: '2026-10-04T10:00:00Z' },
  { analytic_id: 2, profile_id: 1, viewers_count: 31, visited_time: '2026-10-05T10:00:00Z' },
];
export const skills = [
  { skill_id: 1, profile_id: 1, skill_name: 'ibispaint', category: 'Digital art', year_acquired: null, certificate_taken: null, display_order: 1 },
  { skill_id: 2, profile_id: 1, skill_name: 'figma', category: 'Design', year_acquired: null, certificate_taken: null, display_order: 2 },
  { skill_id: 3, profile_id: 1, skill_name: 'photoshop', category: 'Design', year_acquired: null, certificate_taken: null, display_order: 3 },
];
export const education = [{ education_id: 1, profile_id: 1, school_name: 'Dalubhasaan ng Lungsod ng Lucena', degree: 'Bachelor of Science', field_of_study: 'Information Technology', start_year: null, end_year: null, description: null, display_order: 1 }];
export const experience = [{ experience_id: 1, profile_id: 1, company_name: 'Freelance', position: 'Digital Artist', description: 'Creating digital artworks for commissions locally and internationally, specializing in visually appealing pieces for personal projects.', start_date: null, end_date: null, is_current: true, display_order: 1 }];
export const certifications = [{ certification_id: 1, profile_id: 1, certificate_name: 'Sample certificate', issuing_organization: 'Replace me', issue_date: null, expiration_date: null, credential_url: null, description: null, display_order: 1 }]; // SAMPLE
export const services = [
  { service_id: 1, profile_id: 1, service_name: 'Digital art commissions', description: 'Custom illustrations and portraits.', starting_price: null, is_available: true, display_order: 1 },
  { service_id: 2, profile_id: 1, service_name: 'Graphic design', description: 'Layouts, logos and social media graphics.', starting_price: null, is_available: true, display_order: 2 },
];
export const social_links = [
  { social_id: 1, profile_id: 1, platform: 'Email', username: 'raevenladine@gmail.com', url: 'mailto:raevenladine@gmail.com', display_order: 1, is_visible: true },
  { social_id: 2, profile_id: 1, platform: 'GitHub', username: 'ryyads', url: 'https://ryyads.github.io/Portfolio/', display_order: 2, is_visible: true },
  { social_id: 3, profile_id: 1, platform: 'Facebook', username: 'raeven.ladine', url: 'https://www.facebook.com/raeven.ladine', display_order: 3, is_visible: true },
];
export const contact_messages = []; // filled by the contact form

export const tables = { user, profile, project, project_media, analytic, skills, education, experience, certifications, services, social_links, contact_messages };
export const columns = {
  user: 'user_id email password role created_at',
  profile: 'profile_id user_id lastname firstname middlename bio is_public',
  project: 'project_id title description demo_url github_url category is_featured media_url display_order created_at',
  project_media: 'project_media_id project_id media_url media_type display_order',
  analytic: 'analytic_id profile_id viewers_count visited_time',
  skills: 'skill_id profile_id skill_name category year_acquired certificate_taken display_order',
  education: 'education_id profile_id school_name degree field_of_study start_year end_year description display_order',
  experience: 'experience_id profile_id company_name position description start_date end_date is_current display_order',
  certifications: 'certification_id profile_id certificate_name issuing_organization issue_date expiration_date credential_url description display_order',
  services: 'service_id profile_id service_name description starting_price is_available display_order',
  social_links: 'social_id profile_id platform username url display_order is_visible',
  contact_messages: 'message_id profile_id sender_name sender_email subject message status created_at',
};
export const byOrder = (a) => [...a].sort((x, y) => x.display_order - y.display_order);
