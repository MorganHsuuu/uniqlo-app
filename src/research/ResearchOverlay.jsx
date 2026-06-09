import { useState, useEffect } from "react";
import { SUS_QUESTIONS } from "./taskDefinitions.js";
import { useResearch } from "./ResearchContext.jsx";
import TaskInstruction from "./TaskInstruction.jsx";
import { TASK_HINTS } from "./taskHints.js";

const STUCK_MS = 20000;

const LIKERT = [
  { value: 1, label: "非常不同意" },
  { value: 2, label: "不同意" },
  { value: 3, label: "普通" },
  { value: 4, label: "同意" },
  { value: 5, label: "非常同意" },
];

export default function ResearchOverlay() {
  const {
    researchActive,
    phase,
    currentTask,
    currentTaskIndex,
    totalTasks,
    taskRunning,
    celebratingTask,
    feedback,
    email,
    submitting,
    submitError,
    setFeedback,
    setEmail,
    startCurrentTask,
    completeIntro,
    submitSus,
    submitFeedback,
    dismissStudy,
    resumed,
    timerReset,
    susAnswers,
  } = useResearch();

  const [showStuckHint, setShowStuckHint] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    if (phase !== "running" || !taskRunning) {
      setShowStuckHint(false);
      setHintOpen(false);
      return;
    }
    const t = window.setTimeout(() => setShowStuckHint(true), STUCK_MS);
    return () => window.clearTimeout(t);
  }, [phase, taskRunning, currentTaskIndex]);

  if (!researchActive) return null;

  return (
    <>
      {phase === "running" && taskRunning && currentTask && (
        <>
          <div className="research-task-hint" aria-live="polite">
            <div className="research-task-hint-header">
              <span className="research-task-hint-badge">任務 {currentTaskIndex + 1}/{totalTasks}</span>
              <span className="research-task-hint-title">{currentTask.title}</span>
            </div>
            <div className="research-task-hint-text">
              <TaskInstruction taskId={currentTask.id} />
            </div>
          </div>

          {showStuckHint && (
            <button
              type="button"
              className="research-stuck-btn"
              onClick={() => setHintOpen((v) => !v)}
            >
              {hintOpen ? "收起提示" : "需要提示？"}
            </button>
          )}

          {hintOpen && TASK_HINTS[currentTask.id] && (
            <div className="research-stuck-panel">
              <div className="research-stuck-panel-title">操作提示</div>
              <ol className="research-stuck-list">
                {TASK_HINTS[currentTask.id].map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </>
      )}

      {phase === "celebrate" && celebratingTask && (
        <div className="research-celebrate" aria-live="polite">
          <div className="research-celebrate-content">
            <div className="research-check-icon">✓</div>
            <p className="research-celebrate-text">任務 {celebratingTask.number} 完成</p>
          </div>
        </div>
      )}

      {["intro", "task", "sus", "feedback", "done"].includes(phase) && (
        <div className="research-overlay">
          <div className="research-card">
            {phase === "intro" && <Intro onStart={completeIntro} resumed={resumed} />}
            {phase === "task" && currentTask && (
              <TaskPrompt
                task={currentTask}
                index={currentTaskIndex}
                total={totalTasks}
                timerReset={timerReset}
                resumed={resumed}
                onStart={startCurrentTask}
              />
            )}
            {phase === "sus" && <SusForm onSubmit={submitSus} resumed={resumed} initialAnswers={susAnswers} />}
            {phase === "feedback" && (
              <FeedbackForm
                feedback={feedback}
                email={email}
                submitting={submitting}
                submitError={submitError}
                resumed={resumed}
                onFeedbackChange={setFeedback}
                onEmailChange={setEmail}
                onSubmit={submitFeedback}
              />
            )}
            {phase === "done" && <ThankYou onDismiss={dismissStudy} />}
          </div>
        </div>
      )}
    </>
  );
}

function Intro({ onStart, resumed }) {
  return (
    <>
      <div className="research-badge">UI/UX 易用性研究</div>
      {resumed && (
        <div className="research-resume-banner">已恢復您先前的研究進度，可從上次位置繼續。</div>
      )}
      <h1 className="research-title">歡迎參與 UNIQLO App 介面測試</h1>
      <p className="research-body">
        我們正在進行 App 介面的易用性研究。請依照指示完成 5 個操作任務，
        全部完成後填寫簡短問卷。整個過程約需 5–10 分鐘。
      </p>
      <ul className="research-list">
        <li>請依自己的真實感受操作，沒有對錯答案</li>
        <li>請盡量獨立完成，不需詢問旁人</li>
        <li>操作時畫面下方會顯示任務說明，方便隨時查看</li>
      </ul>
      <div className="research-raffle-callout">
        <div className="research-raffle-label">完成問卷抽獎</div>
        <p className="research-raffle-text">
          完成全部任務並<strong>填寫 Email</strong>，即可參加
          <strong> 星巴克禮券 </strong>
          抽獎！
        </p>
      </div>
      <p className="research-note">
        點選「開始研究」即表示您同意參與本研究，資料僅用於學術／設計改善用途。
      </p>
      <button type="button" className="research-primary" onClick={onStart}>
        開始研究
      </button>
    </>
  );
}

function TaskPrompt({ task, index, total, timerReset, resumed, onStart }) {
  return (
    <>
      <div className="research-step">任務 {index + 1} / {total}</div>
      {resumed && !timerReset && (
        <div className="research-resume-banner">已恢復您先前的研究進度。</div>
      )}
      {timerReset && (
        <div className="research-resume-banner">
          您離開時計時已暫停，請重新按「開始計時」完成此任務。
        </div>
      )}
      <div className="research-task-label">{task.title}</div>
      <p className="research-task-action">
        <TaskInstruction taskId={task.id} />
      </p>
      <p className="research-note">準備好後請按「開始計時」。操作時可在畫面下方查看題目。</p>
      <button type="button" className="research-primary" onClick={onStart}>
        開始計時
      </button>
    </>
  );
}

function SusForm({ onSubmit, resumed, initialAnswers }) {
  const [answers, setAnswers] = useState(() => initialAnswers || Array(10).fill(null));
  const allAnswered = answers.every((a) => a !== null);

  return (
    <>
      {resumed && <div className="research-resume-banner">已恢復您先前的研究進度。</div>}
      <h2 className="research-title">系統易用性問卷（SUS）</h2>
      <p className="research-body">
        請根據剛才的操作體驗，對以下陳述選擇 1（非常不同意）至 5（非常同意）。
      </p>
      <div className="research-sus-list">
        {SUS_QUESTIONS.map((q, i) => (
          <div key={i} className="research-sus-item">
            <div className="research-sus-q">{i + 1}. {q}</div>
            <div className="research-likert">
              {LIKERT.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`research-likert-btn ${answers[i] === value ? "active" : ""}`}
                  onClick={() => {
                    const next = [...answers];
                    next[i] = value;
                    setAnswers(next);
                  }}
                  title={label}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="research-primary"
        disabled={!allAnswered}
        onClick={() => onSubmit(answers)}
      >
        下一步
      </button>
    </>
  );
}

function FeedbackForm({ feedback, email, submitting, submitError, resumed, onFeedbackChange, onEmailChange, onSubmit }) {
  const feedbackOk = feedback.trim().length > 0;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <>
      {resumed && <div className="research-resume-banner">已恢復您先前的研究進度。</div>}
      <h2 className="research-title">您的回饋</h2>
      <p className="research-body">
        歡迎分享您對 App 的使用感受——喜歡的地方、順手之處，或任何想改進的想法都可以。
      </p>
      <label className="research-label">
        使用心得與建議
        <textarea
          className="research-textarea"
          rows={4}
          placeholder="例如：分類很清楚、操作很順暢；或希望搜尋能更快找到商品…"
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
        />
      </label>
      <div className={`research-raffle-callout research-raffle-callout--compact ${!feedbackOk ? "research-raffle-callout--locked" : ""}`}>
        <div className="research-raffle-label">星巴克禮券抽獎</div>
        <p className="research-raffle-text">
          {feedbackOk ? "填寫 Email 即可參加抽獎" : "請先填寫上方回饋，即可填寫 Email 參加抽獎"}
        </p>
      </div>
      <label className={`research-label ${!feedbackOk ? "research-label--disabled" : ""}`}>
        Email
        <input
          type="email"
          className="research-input research-input--highlight"
          placeholder={feedbackOk ? "請輸入您的 Email" : "請先填寫上方回饋"}
          value={email}
          disabled={!feedbackOk}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </label>
      {submitError && <p className="research-error">{submitError}</p>}
      <button
        type="button"
        className="research-primary"
        disabled={!feedbackOk || !emailOk || submitting}
        onClick={onSubmit}
      >
        {submitting ? "送出中…" : "提交並完成"}
      </button>
    </>
  );
}

function ThankYou({ onDismiss }) {
  return (
    <>
      <div className="research-done-icon">✓</div>
      <h2 className="research-title">感謝您的參與！</h2>
      <p className="research-body">
        您的回饋已成功送出。抽獎結果將以 Email 通知，祝您好運！
      </p>
      <button type="button" className="research-primary" onClick={onDismiss}>
        結束測驗
      </button>
    </>
  );
}
