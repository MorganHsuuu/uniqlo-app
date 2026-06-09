import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { RESEARCH_ENABLED } from "./config.js";
import { isWhiteColor } from "./isWhiteColor.js";
import { clearResearchProgress, loadResearchProgress, saveResearchProgress } from "./researchSession.js";
import { TASKS, EMPTY_PROFILE } from "./taskDefinitions.js";
import { submitResults } from "./submitResults.js";

const ResearchContext = createContext(null);
const CELEBRATE_MS = 2600;

function newSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function initialState() {
  const saved = loadResearchProgress();
  if (saved) {
    return {
      sessionId: saved.sessionId,
      phase: saved.phase || "intro",
      currentTaskIndex: saved.currentTaskIndex ?? 0,
      taskTimings: saved.taskTimings || {},
      profileAnswers: saved.profileAnswers || { ...EMPTY_PROFILE },
      susAnswers: saved.susAnswers || Array(10).fill(null),
      feedback: saved.feedback || "",
      email: saved.email || "",
      resumed: true,
      timerReset: !!saved.timerReset,
    };
  }
  return {
    sessionId: newSessionId(),
    phase: "intro",
    currentTaskIndex: 0,
    taskTimings: {},
    profileAnswers: { ...EMPTY_PROFILE },
    susAnswers: Array(10).fill(null),
    feedback: "",
    email: "",
    resumed: false,
    timerReset: false,
  };
}

export function ResearchProvider({ children }) {
  const completedKey = "uq_research_completed";
  const [dismissed, setDismissed] = useState(false);
  const [researchActive] = useState(() => {
    if (!RESEARCH_ENABLED) return false;
    try {
      return !localStorage.getItem(completedKey);
    } catch {
      return true;
    }
  });
  const showResearch = researchActive && !dismissed;

  const init = useRef(initialState()).current;

  const [phase, setPhase] = useState(init.phase);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(init.currentTaskIndex);
  const [taskRunning, setTaskRunning] = useState(false);
  const [celebratingTask, setCelebratingTask] = useState(null);
  const [taskTimings, setTaskTimings] = useState(init.taskTimings);
  const [profileAnswers, setProfileAnswers] = useState(init.profileAnswers);
  const [susAnswers, setSusAnswers] = useState(init.susAnswers);
  const [feedback, setFeedback] = useState(init.feedback);
  const [email, setEmail] = useState(init.email);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [resumed, setResumed] = useState(init.resumed);
  const [timerReset, setTimerReset] = useState(init.timerReset);

  const sessionId = useRef(init.sessionId);
  const taskStartRef = useRef(null);
  const resetToHomeRef = useRef(null);
  const resetToMenuRef = useRef(null);
  const taskStateRef = useRef({
    task2Search: false,
    task3SizeM: false,
    task3PriceAsc: false,
    task3Context: false,
    task4AddedBright: false,
  });

  const currentTask = TASKS[currentTaskIndex] || null;

  const persist = useCallback(() => {
    if (!showResearch) return;
    saveResearchProgress({
      sessionId: sessionId.current,
      phase,
      currentTaskIndex,
      taskRunning,
      taskTimings,
      profileAnswers,
      susAnswers,
      feedback,
      email,
    });
  }, [showResearch, phase, currentTaskIndex, taskRunning, taskTimings, profileAnswers, susAnswers, feedback, email]);

  useEffect(() => {
    persist();
  }, [persist]);

  const abortCurrentTask = useCallback(() => {
    if (!taskRunning) return;
    setTaskRunning(false);
    taskStartRef.current = null;
    taskStateRef.current = {
      task2Search: false,
      task3SizeM: false,
      task3PriceAsc: false,
      task3Context: false,
      task4AddedBright: false,
    };
    setPhase("task");
    setTimerReset(true);
  }, [taskRunning]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") abortCurrentTask();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [abortCurrentTask]);

  const registerResetToHome = useCallback((fn) => {
    resetToHomeRef.current = fn;
  }, []);

  const registerResetToMenu = useCallback((fn) => {
    resetToMenuRef.current = fn;
  }, []);

  const advanceAfterCelebrate = useCallback((finishedIndex) => {
    setCelebratingTask(null);

    if (finishedIndex <= 1 || finishedIndex === 3) {
      resetToHomeRef.current?.();
    }

    if (finishedIndex >= TASKS.length - 1) {
      setPhase("sus");
    } else {
      setCurrentTaskIndex(finishedIndex + 1);
      setPhase("task");
    }
    setTimerReset(false);
  }, []);

  const finishTask = useCallback((taskId) => {
    if (!taskRunning || !taskStartRef.current) return;

    const finishedIndex = currentTaskIndex;
    const durationSec = Math.round(((Date.now() - taskStartRef.current) / 1000) * 10) / 10;

    setTaskTimings((prev) => ({
      ...prev,
      [taskId]: { durationSec, completed: true },
    }));
    setTaskRunning(false);
    taskStartRef.current = null;
    taskStateRef.current = {
      task2Search: false,
      task3SizeM: false,
      task3PriceAsc: false,
      task3Context: false,
      task4AddedBright: false,
    };

    setCelebratingTask(TASKS[finishedIndex]);
    setPhase("celebrate");

    window.setTimeout(() => advanceAfterCelebrate(finishedIndex), CELEBRATE_MS);
  }, [taskRunning, currentTaskIndex, advanceAfterCelebrate]);

  const startCurrentTask = useCallback(() => {
    if (TASKS[currentTaskIndex]?.id === "task5") {
      resetToHomeRef.current?.();
    }
    taskStartRef.current = Date.now();
    setTaskRunning(true);
    setPhase("running");
    setTimerReset(false);
    setResumed(false);
  }, [currentTaskIndex]);

  const reportEvent = useCallback((event, payload = {}) => {
    if (!showResearch || !taskRunning || !currentTask) return;

    const s = taskStateRef.current;

    if (currentTask.id === "task1") {
      if (
        event === "category_open" &&
        payload.nav === "KIDS" &&
        (payload.category === "外套類" || payload.category?.includes("外套"))
      ) {
        finishTask("task1");
      }
    }

    if (currentTask.id === "task2") {
      if (event === "search" && payload.query?.includes("黑色長褲")) {
        s.task2Search = true;
      }
      if (event === "product_open") {
        const fromBlackPants = s.task2Search || payload.searchQuery?.includes("黑色長褲");
        if (fromBlackPants) finishTask("task2");
      }
    }

    if (currentTask.id === "task3") {
      if (event === "women_tshirt_view") s.task3Context = true;
      if (event === "filter_update" && (payload.context === "women_tshirt" || s.task3Context)) {
        if (payload.size === "M") s.task3SizeM = true;
        if (payload.sort === "price_asc") s.task3PriceAsc = true;
      }
      if (s.task3SizeM && s.task3PriceAsc && (s.task3Context || event === "women_tshirt_view")) {
        finishTask("task3");
      }
    }

    if (currentTask.id === "task4") {
      if (event === "cart_add" && payload.color && isWhiteColor(payload.color)) {
        s.task4AddedBright = true;
      }
      if (event === "cart_remove" && s.task4AddedBright) {
        finishTask("task4");
      }
    }

    if (currentTask.id === "task5" && event === "help_open") {
      finishTask("task5");
    }
  }, [showResearch, taskRunning, currentTask, finishTask]);

  const completeIntro = useCallback(() => {
    setPhase("profile");
    setResumed(false);
  }, []);

  const submitProfile = useCallback((answers) => {
    setProfileAnswers(answers);
    setPhase("task");
    setResumed(false);
  }, []);

  const dismissStudy = useCallback(() => {
    clearResearchProgress();
    resetToMenuRef.current?.();
    setDismissed(true);
  }, []);

  const submitSus = useCallback((answers) => {
    setSusAnswers(answers);
    setPhase("feedback");
  }, []);

  const submitFeedback = useCallback(async () => {
    if (!feedback.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitResults({
        sessionId: sessionId.current,
        taskTimings,
        profileAnswers,
        susAnswers,
        feedback,
        email,
      });
      try {
        localStorage.setItem(completedKey, sessionId.current);
      } catch {}
      clearResearchProgress();
      setPhase("done");
    } catch {
      setSubmitError("送出失敗，請稍後再試。");
    } finally {
      setSubmitting(false);
    }
  }, [taskTimings, profileAnswers, susAnswers, feedback, email]);

  const value = useMemo(() => ({
    researchActive: showResearch,
    phase,
    currentTask,
    currentTaskIndex,
    taskRunning,
    celebratingTask,
    taskTimings,
    profileAnswers,
    totalTasks: TASKS.length,
    susAnswers,
    feedback,
    email,
    submitting,
    submitError,
    resumed,
    timerReset,
    setFeedback,
    setEmail,
    startCurrentTask,
    completeIntro,
    submitProfile,
    submitSus,
    submitFeedback,
    reportEvent,
    registerResetToHome,
    registerResetToMenu,
    dismissStudy,
  }), [
    showResearch, phase, currentTask, currentTaskIndex, taskRunning, celebratingTask, taskTimings,
    profileAnswers, susAnswers, feedback, email, submitting, submitError, resumed, timerReset,
    startCurrentTask, completeIntro, submitProfile, submitSus, submitFeedback, reportEvent, registerResetToHome, registerResetToMenu, dismissStudy,
  ]);

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearch() {
  const ctx = useContext(ResearchContext);
  if (!ctx) throw new Error("useResearch must be used within ResearchProvider");
  return ctx;
}

export function useResearchOptional() {
  return useContext(ResearchContext);
}
