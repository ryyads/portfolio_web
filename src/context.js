import { createContext, useContext } from 'react';
import fallback from './fallback';

export const PortfolioContext = createContext(fallback);
export const usePortfolio = () => useContext(PortfolioContext);

// Icon files already in /public. Add more here when you add skills/links.
export const SKILL_ICONS = {
  ibispaint: '/IBS.PNG',
  figma: '/FIGMA.jfif',
  photoshop: '/PTSHP.PNG',
};
export const SOCIAL_ICONS = {
  email: '/EMAIL.jpg',
  gmail: '/EMAIL.jpg',
  github: '/GITHUB.jpg',
  facebook: '/FB.png',
};
