// Makes image paths like '/ME.png' work even if the site is hosted in a sub-folder.
export const asset = (p) => (p && p.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p);
