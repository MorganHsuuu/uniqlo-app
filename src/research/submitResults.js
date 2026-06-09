import { GOOGLE_SCRIPT_URL } from "./config.js";
import { calculateSusScore } from "./calculateSusScore.js";

function buildPayload(session) {
  const susAnswers = session.susAnswers || [];
  return {
    sessionId: session.sessionId,
    submittedAt: new Date().toISOString(),
    profileQ1: session.profileAnswers?.gender ?? "",
    profileQ2: session.profileAnswers?.age ?? "",
    profileQ3: session.profileAnswers?.appUsedBefore ?? "",
    profileQ4: session.profileAnswers?.onlineShopFreq ?? "",
    email: session.email || "",
    feedback: session.feedback || "",
    susScore: calculateSusScore(susAnswers),
    susQ1: susAnswers[0] ?? "",
    susQ2: susAnswers[1] ?? "",
    susQ3: susAnswers[2] ?? "",
    susQ4: susAnswers[3] ?? "",
    susQ5: susAnswers[4] ?? "",
    susQ6: susAnswers[5] ?? "",
    susQ7: susAnswers[6] ?? "",
    susQ8: susAnswers[7] ?? "",
    susQ9: susAnswers[8] ?? "",
    susQ10: susAnswers[9] ?? "",
    task1Sec: session.taskTimings?.task1?.durationSec ?? "",
    task2Sec: session.taskTimings?.task2?.durationSec ?? "",
    task3Sec: session.taskTimings?.task3?.durationSec ?? "",
    task4Sec: session.taskTimings?.task4?.durationSec ?? "",
    task5Sec: session.taskTimings?.task5?.durationSec ?? "",
    task1Done: session.taskTimings?.task1?.completed ?? false,
    task2Done: session.taskTimings?.task2?.completed ?? false,
    task3Done: session.taskTimings?.task3?.completed ?? false,
    task4Done: session.taskTimings?.task4?.completed ?? false,
    task5Done: session.taskTimings?.task5?.completed ?? false,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };
}

export async function submitResults(session) {
  const payload = buildPayload(session);

  try {
    localStorage.setItem(`uq_research_${session.sessionId}`, JSON.stringify(payload));
  } catch {}

  if (!GOOGLE_SCRIPT_URL) {
    console.warn("[Research] VITE_GOOGLE_SCRIPT_URL not set — saved locally only.", payload);
    return { ok: true, localOnly: true, payload };
  }

  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return { ok: true, localOnly: false, payload };
}
