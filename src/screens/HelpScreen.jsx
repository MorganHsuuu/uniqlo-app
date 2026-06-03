import { useState, useRef, useEffect } from "react";

const QUICK_REPLIES = [
  "如何退換貨？",
  "查詢訂單狀態",
  "尺寸怎麼選？",
  "運費說明",
];

const BOT_ANSWERS = {
  "如何退換貨？": "您可在收到商品後 30 天內，攜帶商品及收據至任一門市辦理退換貨，或透過官網申請宅配退貨服務，全程免運費。",
  "查詢訂單狀態": "請登入官網「我的帳戶」→「訂單查詢」，或致電客服 0800-00-3839 查詢最新訂單狀態。",
  "尺寸怎麼選？": "建議參考商品頁面的「尺寸表」，依照胸圍、腰圍、臀圍等實際尺寸對照選擇。如有疑問歡迎至門市試穿！",
  "運費說明": "訂單滿 NT$490 免運費；未滿 NT$490 運費為 NT$60。超商取貨及宅配皆適用。",
};

const OPENING_MSG = {
  id: "bot-0",
  role: "bot",
  text: "您好！我是 UNIQLO 智能客服 UQ Bot\n請問有什麼可以協助您的嗎？",
};

export default function HelpScreen({ onBack }) {
  const [messages, setMessages] = useState([OPENING_MSG]);
  const [inputText, setInputText] = useState("");
  const [usedReplies, setUsedReplies] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = { id: `user-${Date.now()}`, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Bot reply
    setTimeout(() => {
      const answer = BOT_ANSWERS[trimmed] ||
        "感謝您的詢問！我們的客服人員將盡快為您服務，您也可以撥打客服專線 0800-00-3839（週一至週日 09:00-21:00）。";
      const botMsg = { id: `bot-${Date.now()}`, role: "bot", text: answer };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleQuickReply = (q) => {
    setUsedReplies((prev) => [...prev, q]);
    sendMessage(q);
  };

  const showQuickReplies = usedReplies.length < QUICK_REPLIES.length;
  const availableReplies = QUICK_REPLIES.filter((q) => !usedReplies.includes(q));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "white" }}>
      {/* Header */}
      <div className="detail-header">
        <button className="detail-back" onClick={onBack}>‹</button>
        <div className="detail-header-title">智能客服</div>
        <div style={{ width: 36 }} />
      </div>

      {/* Chat Messages */}
      <div className="help-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`help-bubble-row ${msg.role}`}>
            {msg.role === "bot" && (
              <div className="help-avatar">UQ</div>
            )}
            <div className={`help-bubble ${msg.role}`} style={{ whiteSpace: "pre-line" }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Quick replies after opening message */}
        {showQuickReplies && availableReplies.length > 0 && (
          <div style={{ paddingLeft: 38 }}>
            <div className="help-quick-replies">
              {availableReplies.map((q) => (
                <button
                  key={q}
                  className="help-quick-btn"
                  onClick={() => handleQuickReply(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Row */}
      <div className="help-input-row">
        <input
          className="help-input"
          type="text"
          placeholder="輸入問題..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(inputText)}
        />
        <button
          className="help-send-btn"
          onClick={() => sendMessage(inputText)}
        >
          送出
        </button>
      </div>
    </div>
  );
}
