import { TASKS } from "./taskDefinitions.js";

const PROGRESS_KEY = "uq_research_progress";

export function loadResearchProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.sessionId) return null;

    // 計時中離開 → 回到任務說明，重新計時
    if (data.wasTiming || data.phase === "running") {
      data.phase = "task";
      data.taskRunning = false;
      data.timerReset = true;
    } else if (data.phase === "celebrate") {
      // 完成動畫中斷 → 依已完成任務數前進
      const done = Object.keys(data.taskTimings || {}).length;
      if (done >= TASKS.length) {
        data.phase = "sus";
      } else {
        data.currentTaskIndex = done;
        data.phase = "task";
      }
      data.timerReset = false;
    }

    return data;
  } catch {
    return null;
  }
}

export function saveResearchProgress(state) {
  try {
    const payload = {
      sessionId: state.sessionId,
      phase: state.taskRunning ? "task" : state.phase,
      currentTaskIndex: state.currentTaskIndex,
      taskTimings: state.taskTimings,
      susAnswers: state.susAnswers,
      feedback: state.feedback,
      email: state.email,
      wasTiming: state.taskRunning,
      timerReset: false,
      savedAt: Date.now(),
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(payload));
  } catch {}
}

export function clearResearchProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {}
}
