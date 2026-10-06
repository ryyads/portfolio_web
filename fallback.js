// Shown when the API/database is unreachable. Same shape as /api/portfolio.
// Once your database is seeded, this is never used.
const fallback = {
  profile: {
    profile_id: 1,
    firstname: 'Raeven',
    middlename: '',
    lastname: 'Maranan',
    bio: "Hello, I'm Raeven! I am 22 years old and my hobbies are drawing, singing, eating and sleeping~",
  },
  skills: [
    { skill_id: 1, skill_name: 'ibispaint', category: 'Digital Art' },
    { skill_id: 2, skill_name: 'figma', category: 'Design' },
    { skill_id: 3, skill_name: 'photoshop', category: 'Digital Art' },
  ],
  education: [
    {
      education_id: 1,
      school_name: 'Dalubhasaan ng Lungsod ng Lucena',
      degree: 'Bachelor of Science',
      field_of_study: 'Information Technology',
      start_year: null,
      end_year: null,
      description: 'Ongoing',
    },
  ],
  experience: [
    {
      experience_id: 1,
      company_name: 'Freelance',
      position: 'Digital Artist',
      description:
        'I create digital artworks for various commissions locally and internationally, specializing in visually appealing pieces for personal projects.',
      is_current: true,
    },
  ],
  certifications: [],
  services: [],
  social_links: [
    { social_id: 1, platform: 'Email', url: 'mailto:raevenladine@gmail.com' },
    { social_id: 2, platform: 'GitHub', url: 'https://ryyads.github.io/Portfolio/' },
    { social_id: 3, platform: 'Facebook', url: 'https://www.facebook.com/raeven.ladine' },
  ],
  projects: [
    {
      project_id: 1,
      title: 'Character Portrait Commission',
      description: 'digital portrait made in ibispaint.',
      category: 'Digital Art',
      is_featured: true,
      media_url: '/ME.png',
      demo_url: '',
      github_url: '',
      media: [],
    },
    {
      project_id: 2,
      title: 'sticker pack',
      description: 'A set of illustrated stickers.',
      category: 'Digital Art',
      is_featured: true,
      media_url: '/ME.png',
      demo_url: '',
      github_url: '',
      media: [],
    },
    {
      project_id: 3,
      title: 'portfolio website',
      description: 'this site, built with React.',
      category: 'Web Development',
      is_featured: true,
      media_url: '/ME.png',
      demo_url: '',
      github_url: 'https://ryyads.github.io/Portfolio/',
      media: [],
    },
    {
      project_id: 4,
      title: 'valentine project',
      description: 'this site, built with React.',
      category: 'Web Development',
      is_featured: true,
      media_url: '/ME.png',
      demo_url: '',
      github_url: 'https://ryyads.github.io/vday_invite/',
      media: [],
    },
    {
      project_id: 5,
      title: 'enrollment form',
      description: 'this site, built with React.',
      category: 'Web Development',
      is_featured: true,
      media_url: '/ME.png',
      demo_url: '',
      github_url: 'https://ryyads.github.io/enrollment-form/',
      media: [],
    },
    

  ],
  visits: 0,
};
export default fallback;
