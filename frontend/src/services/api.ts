/**
 * Centralized API configuration for local development and cloud deployments.
 * - In local development: routes through Vite proxy ('') to http://localhost:8000
 * - In production (GitHub Pages): routes to https://threed-portfolio-pnmq.onrender.com
 *   (or custom VITE_API_URL environment variable if overridden)
 */
const API_BASE = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? 'https://threed-portfolio-pnmq.onrender.com' : '')
).replace(/\/$/, '');

export const API_ENDPOINTS = {
  health: `${API_BASE}/api/health`,
  contact: `${API_BASE}/api/contact`,
  inquiries: `${API_BASE}/api/inquiries`,
  projects: `${API_BASE}/api/projects`,
  simulationsMcp: `${API_BASE}/api/simulations/mcp`,
  simulationsRouter: `${API_BASE}/api/simulations/router`,
};
