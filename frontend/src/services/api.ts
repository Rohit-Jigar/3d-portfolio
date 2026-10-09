/**
 * Centralized API configuration for local development and cloud deployments.
 * If VITE_API_URL is configured (e.g. Render / Railway / Fly.io backend URL),
 * requests will route to the cloud API.
 * Otherwise, requests fall back to relative `/api` (local proxy or reverse-proxy).
 */
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const API_ENDPOINTS = {
  health: `${API_BASE}/api/health`,
  contact: `${API_BASE}/api/contact`,
  projects: `${API_BASE}/api/projects`,
  simulationsMcp: `${API_BASE}/api/simulations/mcp`,
  simulationsRouter: `${API_BASE}/api/simulations/router`,
};
