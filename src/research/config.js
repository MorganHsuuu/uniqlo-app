/** Google Apps Script Web App URL — set in .env as VITE_GOOGLE_SCRIPT_URL */
export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

/** Set to false to bypass research flow (dev only) */
export const RESEARCH_ENABLED = import.meta.env.VITE_RESEARCH_ENABLED !== "false";

/** 實驗已結束時顯示得獎公告（設 VITE_RESEARCH_CLOSED=false 可關閉） */
export const RESEARCH_CLOSED = import.meta.env.VITE_RESEARCH_CLOSED !== "false";

export const WINNER_EMAIL = "daniel1515051@gmail.com";
