/** Google Apps Script Web App URL — set in .env as VITE_GOOGLE_SCRIPT_URL */
export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

/** Set to false to bypass research flow (dev only) */
export const RESEARCH_ENABLED = import.meta.env.VITE_RESEARCH_ENABLED !== "false";
