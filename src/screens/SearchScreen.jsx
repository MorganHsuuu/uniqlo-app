import { useState } from "react";
import { Store, ScanLine, HelpCircle, Bot, Search, Trash2 } from "lucide-react";

const HOT_TAGS = ["熱銷補貨", "快乾", "防曬", "抗UV", "短袖"];

const INITIAL_RECENT = [
  "黑色長褲", "長褲", "T 恤", "Tshirt", "上衣", "短版 T 恤", "童裝 外套",
];

const QUICK_ICONS = [
  { Icon: Store, label: "實體店鋪" },
  { Icon: ScanLine, label: "掃碼購" },
  { Icon: HelpCircle, label: "常見問題" },
  { Icon: Bot, label: "智能客服" },
];

const PRODUCT_POOL = [
  "黑色長褲", "黑色上衣", "黑色外套", "黑色T恤", "黑色牛仔褲", "黑色短褲", "黑色針織衫",
  "白色T恤", "白色上衣", "白色長褲", "白色外套", "白色短袖",
  "藍色牛仔褲", "藍色外套", "藍色短褲",
  "長褲", "短褲", "外套", "T恤", "上衣", "針織衫", "背心", "連身裙",
  "AIRism 短袖", "AIRism 背心", "AIRism 長褲", "AIRism 內褲",
  "HEATTECH 長褲", "HEATTECH 上衣", "HEATTECH 發熱衣",
  "防曬外套", "抗UV外套", "快乾短褲", "快乾長褲",
  "聯名系列", "Uniqlo U", "Cecilie Bahnsen",
  "童裝外套", "童裝T恤", "童裝長褲",
  "男裝外套", "男裝長褲", "男裝T恤",
  "女裝外套", "女裝長褲", "女裝上衣",
];

export default function SearchScreen({ onBack, onSearch, onOpenHelp }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(INITIAL_RECENT);
  const [focused, setFocused] = useState(false);

  const suggestions = query.length > 0
    ? PRODUCT_POOL.filter((p) => p.includes(query)).slice(0, 6)
    : [];

  const showSuggestions = focused && suggestions.length > 0;

  const removeRecent = (item) => setRecent(recent.filter((r) => r !== item));
  const clearAll = () => setRecent([]);

  const submitSearch = (term) => {
    const q = term || query;
    if (!q.trim()) return;
    setFocused(false);
    onSearch(q.trim());
  };

  const selectSuggestion = (s) => {
    setQuery(s);
    submitSearch(s);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar-row">
        <button className="search-back" onClick={onBack}>‹</button>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            placeholder="請輸入關鍵字"
            style={{
              width: "100%", height: 38,
              border: `0.5px solid ${focused ? "#888" : "#ccc"}`,
              borderRadius: showSuggestions ? "10px 10px 0 0" : 20,
              padding: "0 36px 0 16px",
              fontSize: 13, background: "#fafafa",
              outline: "none", fontFamily: "inherit",
              transition: "border-color 0.15s",
            }}
          />
          {query.length > 0 && (
            <button
              onClick={() => submitSearch()}
              style={{
                position: "absolute", right: 10, top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16, color: "#555", lineHeight: 1,
              }}
            >
              <Search size={16} strokeWidth={2} color="#555" />
            </button>
          )}
          {showSuggestions && (
            <div className="suggestions-dropdown">
              {suggestions.map((s) => (
                <div
                  key={s}
                  className="suggestion-item"
                  onMouseDown={() => selectSuggestion(s)}
                >
                  <Search size={13} strokeWidth={1.5} color="#aaa" className="suggestion-icon" />
                  <span className="suggestion-text">{s}</span>
                  <span className="suggestion-arrow">↗</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Icons */}
      <div className="quick-icons">
        {QUICK_ICONS.map(({ Icon, label }) => (
          <div
            key={label}
            className="quick-icon"
            onClick={() => {
              if (label === "智能客服" && onOpenHelp) onOpenHelp();
            }}
          >
            <div className="quick-icon-box">
              <Icon size={22} strokeWidth={1.5} color="#444" />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Hot Tags */}
      <div className="hot-section">
        <div className="hot-title">熱門搜尋</div>
        <div className="hot-tags">
          {HOT_TAGS.map((tag) => (
            <div key={tag} className="hot-tag" onClick={() => setQuery(tag)}>
              <Search size={12} strokeWidth={1.5} color="#888" /> {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="recent-section">
        <div className="recent-header">
          <span>最近搜尋</span>
          <Trash2 size={18} strokeWidth={1.5} color="#aaa" style={{ cursor: "pointer" }} onClick={clearAll} />
        </div>
        {recent.length === 0 && (
          <div style={{ padding: "20px 0", color: "#aaa", fontSize: 13, textAlign: "center" }}>
            無搜尋紀錄
          </div>
        )}
        {recent.map((item) => (
          <div key={item} className="recent-item">
            <span>{item}</span>
            <span className="remove" onClick={() => removeRecent(item)}>✕</span>
          </div>
        ))}
      </div>
    </div>
  );
}
