import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { name: "外套類", bg: "#e8e0d4", color: "#c5b8a0", img: "https://www.uniqlo.com/tw/cms/50a91f4082eb58dd9be487d7becaa859.jpg" },
  { name: "T恤", bg: "#e8f0e4", color: "#8fba78", img: "https://www.uniqlo.com/tw/cms/7da8882fe118c74a3b7b6309209ab03c.jpg" },
  { name: "短袖／背心", bg: "#fceae4", color: "#e8a090", img: "https://www.uniqlo.com/tw/cms/0aa66f33facb7545f66be77cadedbd79.jpg" },
  { name: "襯衫／POLO衫", bg: "#eaeef8", color: "#9aaed0", img: "https://www.uniqlo.com/tw/cms/2e4e283778a31096bfae64830a85eb94.jpg" },
  { name: "針織衫／開襟外套", bg: "#f0ebe4", color: "#a08870", img: "https://www.uniqlo.com/tw/cms/35157a9fd3c13ef70681b9f6835be8e9.jpg" },
  { name: "下身類（褲子）", bg: "#eef4f8", color: "#9ecce0", img: "https://www.uniqlo.com/tw/cms/7e866c6301b7862e7749887cebde1b26.jpg" },
  { name: "短褲", bg: "#ebf4e8", color: "#88b878", img: "https://www.uniqlo.com/tw/cms/c767629c015bb6bcf3a894f9a5f3fd8b.jpg" },
  { name: "內衣／內褲／襪子", bg: "#f5f5f5", color: "#d0d0d0", img: "https://www.uniqlo.com/tw/cms/9bfa4e401d8f17c37d849e024ba13228.jpg" },
  { name: "家居類", bg: "#f2f0f8", color: "#b0a8d0", img: "https://www.uniqlo.com/tw/cms/47459b62c4e38683b3af10390ae3e460.jpg" },
  { name: "配件類", bg: "#fafafa", color: "#888", img: "https://www.uniqlo.com/tw/cms/9e4e251eb44f19c2f82c4a99a6d3b745.jpg" },
];

const SERIES_BADGES = [
  "LINEN 亞麻系列", "抗UV／防曬系列", "運動機能系列",
  "AIRism 系列", "HEATTECH", "2026 春夏系列", "設計師聯名系列", "Uniqlo U",
];

const NAV_TABS = ["WOMEN", "MEN", "KIDS", "BABY"];
const NAV_LABELS = { WOMEN: "女裝", MEN: "男裝", KIDS: "童裝", BABY: "嬰兒" };

const TAB_BANNERS = {
  WOMEN: {
    img: "https://www.uniqlo.com/tw/public/uqtw/l3/2026/women_bottoms_jeans/260227_L3_Subcategory_w_04_pc.jpg",
    title: "女裝下身系列",
    sub: "2026 春夏新品，優雅日常",
    link: "https://www.uniqlo.com/tw/zh_TW/c/all_women-airism.html",
  },
  MEN: {
    img: "https://www.uniqlo.com/tw/public/uqtw/l3/2026/men_outer_casual/260417_Paris10-largebanner-w-pc.jpg",
    title: "男裝外套系列",
    sub: "2026 春夏 — 俐落剪裁，日常自在",
    link: "https://www.uniqlo.com/tw/zh_TW/c/all_men-outer-casual.html",
  },
  KIDS: {
    img: "https://www.uniqlo.com/tw/cms/eb6d36f5ddede8e4843526eee5340364.jpg",
    title: "童裝新品",
    sub: "輕盈舒適，陪伴每個探索時刻",
    link: "https://www.uniqlo.com/tw/zh_TW/c/all_kids.html",
  },
  BABY: {
    img: "https://www.uniqlo.com/tw/cms/fcdfad41605cfcaeb926d9fae24e82ac.jpg",
    title: "嬰兒系列",
    sub: "柔軟親膚，呵護寶寶每一刻",
    link: "https://www.uniqlo.com/tw/zh_TW/c/all_baby.html",
  },
};

const SORT_OPTIONS = [
  { id: "default", label: "預設排序" },
  { id: "price_asc", label: "價格：低到高" },
  { id: "price_desc", label: "價格：高到低" },
  { id: "newest", label: "最新上架" },
  { id: "popular", label: "熱門程度" },
];

const FILTER_OPTIONS = {
  材質: ["棉質", "亞麻", "AIRism", "HEATTECH", "羊毛"],
  顏色: ["黑色", "白色", "藍色", "米色", "綠色", "紅色"],
  尺寸: ["XS", "S", "M", "L", "XL", "XXL"],
};

export default function CategoryScreen({ activeNav = "MEN", onCategoryClick }) {
  const prevNavRef = useRef(activeNav);

  useEffect(() => {
    if (prevNavRef.current !== activeNav) {
      prevNavRef.current = activeNav;
      document.querySelector(".screen-content")?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeNav]);
  const [activeBadge, setActiveBadge] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [activeFilters, setActiveFilters] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const totalFilters =
    Object.values(activeFilters).flat().length + (sortBy !== "default" ? 1 : 0);

  const toggleFilter = (category, value) => {
    setActiveFilters((prev) => {
      const current = prev[category] || [];
      const exists = current.includes(value);
      return {
        ...prev,
        [category]: exists ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    if (totalFilters > 0) {
      setToastMsg(`已套用 ${totalFilters} 個篩選條件`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const resetFilters = () => {
    setActiveFilters({});
    setSortBy("default");
  };

  const activeSortLabel = SORT_OPTIONS.find((s) => s.id === sortBy)?.label;

  return (
    <div style={{ position: "relative" }}>

      {/* Toast */}
      {showToast && (
        <div className="filter-toast">
          <span className="toast-check">✓</span>
          {toastMsg}
        </div>
      )}

      <div key={activeNav} className="category-nav-content">

      {/* Tab Banner */}
      {(() => {
        const b = TAB_BANNERS[activeNav] || TAB_BANNERS.WOMEN;
        if (b.img) {
          return (
            <div
              style={{ position: "relative", overflow: "hidden" }}
            >
              <img src={b.img} alt={b.title} style={{ width: "100%", display: "block", objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                padding: "28px 16px 14px", color: "white",
              }}>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{b.title}</div>
                <div style={{ fontSize: 12, marginTop: 2, opacity: 0.88 }}>{b.sub}</div>
              </div>
            </div>
          );
        }
        return (
          <div
            className="airism-banner"
            style={{ background: b.bg }}
          >
            <div className="airism-circle" style={{ width: 200, height: 200, top: -60, right: -40, background: b.circles[0] }} />
            <div className="airism-circle" style={{ width: 140, height: 140, bottom: 40, right: 20, background: b.circles[1] }} />
            <div className="airism-circle" style={{ width: 80, height: 80, top: 60, left: 30, background: b.circles[2] }} />
            <div className="banner-dots" style={{ top: "50%" }}>
              <div className="dot active" style={{ background: "#1a73a7" }} />
              <div className="dot" style={{ background: "#aac8dc" }} />
              <div className="dot" style={{ background: "#aac8dc" }} />
              <div className="dot" style={{ background: "#aac8dc" }} />
            </div>
            <div className="airism-logo-text" style={{ color: b.logoColor }}>{b.logo}</div>
            <div className="airism-tagline" style={{ color: b.logoColor, opacity: 0.75 }}>{b.tagline}</div>
            <div className="airism-title">{b.title}</div>
            <div className="airism-sub">{b.sub}</div>
          </div>
        );
      })()}

      {/* Filter Bar — sticky, won't be covered by ads */}
      <div className="filter-bar">
        <button
          className={`filter-bar-btn ${showFilterPanel ? "active" : ""}`}
          onClick={() => setShowFilterPanel(true)}
        >
          <span className="filter-bar-icon">⊞</span>
          篩選{totalFilters > 0 ? ` (${totalFilters})` : ""}
          {totalFilters > 0 && <span className="filter-dot" />}
        </button>
        <div className="filter-bar-divider" />
        <button
          className={`filter-bar-btn ${sortBy !== "default" ? "active" : ""}`}
          onClick={() => setShowFilterPanel(true)}
        >
          <span className="filter-bar-icon">↕</span>
          {sortBy !== "default" ? activeSortLabel : "排序"}
        </button>
      </div>

      {/* Category Grid */}
      <div className="category-grid">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="cat-item"
            onClick={() => onCategoryClick && onCategoryClick(cat.name, activeNav)}
          >
            <div className="cat-thumb" style={{ background: cat.bg }}>
              {cat.img ? (
                <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} />
              ) : (
                <div style={{ width: 24, height: 24, borderRadius: 3, background: cat.color, opacity: 0.85 }} />
              )}
            </div>
            <span className="cat-name">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Series Badges */}
      <div className="badge-row">
        {SERIES_BADGES.map((b) => (
          <div
            key={b}
            className={`badge ${activeBadge === b ? "active" : ""}`}
            onClick={() => setActiveBadge(activeBadge === b ? null : b)}
          >
            {b}
          </div>
        ))}
      </div>

      </div>

      {/* Filter Bottom Sheet */}
      {showFilterPanel && (
        <>
          <div className="sheet-overlay" onClick={() => setShowFilterPanel(false)} />
          <div className="filter-sheet">
            <div className="sheet-handle" />
            <div className="sheet-header">
              <span className="sheet-title">篩選與排序</span>
              <button className="sheet-reset" onClick={resetFilters}>重置</button>
            </div>

            <div className="sheet-body">
              {/* Sort */}
              <div className="sheet-section">
                <div className="sheet-section-title">排序方式</div>
                <div className="sort-options">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      className={`sort-option ${sortBy === opt.id ? "active" : ""}`}
                      onClick={() => setSortBy(opt.id)}
                    >
                      {sortBy === opt.id && <span className="sort-check">✓ </span>}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter groups */}
              {Object.entries(FILTER_OPTIONS).map(([cat, values]) => (
                <div key={cat} className="sheet-section">
                  <div className="sheet-section-title">{cat}</div>
                  <div className="filter-chips">
                    {values.map((val) => {
                      const isActive = (activeFilters[cat] || []).includes(val);
                      return (
                        <button
                          key={val}
                          className={`filter-chip ${isActive ? "active" : ""}`}
                          onClick={() => toggleFilter(cat, val)}
                        >
                          {isActive && <span>✓ </span>}{val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="sheet-footer">
              <button className="apply-btn" onClick={applyFilters}>
                套用篩選條件{totalFilters > 0 ? ` (${totalFilters})` : ""}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
