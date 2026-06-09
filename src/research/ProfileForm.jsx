import { useState } from "react";
import { EMPTY_PROFILE, PROFILE_QUESTIONS } from "./taskDefinitions.js";

export default function ProfileForm({ onSubmit, resumed, initialProfile }) {
  const [answers, setAnswers] = useState(() => ({
    ...EMPTY_PROFILE,
    ...(initialProfile || {}),
  }));

  const allAnswered = PROFILE_QUESTIONS.every((q) => answers[q.id] != null);

  return (
    <>
      {resumed && <div className="research-resume-banner">已恢復您先前的研究進度。</div>}
      <h2 className="research-title">基本資料</h2>
      <p className="research-body">請先回答以下問題，再開始操作任務（此部分不計時）。</p>
      <div className="research-profile-list">
        {PROFILE_QUESTIONS.map((q) => (
          <div key={q.id} className="research-profile-item">
            <div className="research-profile-q">{q.label}</div>
            <div className="research-profile-options">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`research-profile-btn ${answers[q.id] === opt ? "active" : ""}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                >
                  {opt}
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
        開始任務
      </button>
    </>
  );
}
