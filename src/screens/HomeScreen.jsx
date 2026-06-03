import { useState } from "react";

const NAV_CATEGORIES = {
  KIDS: [
    { name: "外套類", bg: "#e8e0d4", color: "#c5b8a0" },
    { name: "T 恤", bg: "#e8f0e4", color: "#8fba78" },
    { name: "長褲", bg: "#eaeef8", color: "#9aaed0" },
    { name: "短褲", bg: "#ebf4e8", color: "#88b878" },
    { name: "連身服", bg: "#fceae4", color: "#e8a090" },
    { name: "帽子／配件", bg: "#f5f5f5", color: "#d0d0d0" },
  ],
  WOMEN: [
    { name: "外套類", bg: "#fceae4", color: "#e8a090" },
    { name: "上衣／T 恤", bg: "#f5ede8", color: "#c09080" },
    { name: "連身裙／裙子", bg: "#f0ebe4", color: "#c8a890" },
    { name: "長褲／短褲", bg: "#eaeef8", color: "#9aaed0" },
    { name: "針織衫", bg: "#e8f0e4", color: "#8fba78" },
    { name: "配件類", bg: "#f5f5f5", color: "#aaa" },
  ],
  BABY: [
    { name: "外套類", bg: "#e8f0fa", color: "#9ab8e0" },
    { name: "上衣／T 恤", bg: "#eef4f8", color: "#9ecce0" },
    { name: "長褲／短褲", bg: "#ebf4e8", color: "#88b878" },
    { name: "連身服", bg: "#fceae4", color: "#e8a090" },
    { name: "睡衣", bg: "#f2f0f8", color: "#b0a8d0" },
    { name: "配件類", bg: "#f5f5f5", color: "#d0d0d0" },
  ],
};


const NAV_LABELS = { WOMEN: "女裝", MEN: "男裝", KIDS: "童裝", BABY: "嬰兒" };

export default function HomeScreen({ activeNav, navTabs, onCategoryClick, onNavClick }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div>
      {/* Feature badges */}
      <div className="badge-row">
        <div className="badge">新品上市</div>
        <div className="badge active">設計師聯名</div>
        <div className="badge">限定商品</div>
        <div className="badge">熱銷補貨</div>
      </div>

      {/* WOMEN Image Cards */}
      {activeNav === "WOMEN" && (
        <div>
          {[
            "https://www.uniqlo.com/tw/cms/a62f7837a18bdb43f985f870859a5aea.jpg",
            "https://www.uniqlo.com/tw/public/uqtw/l3/2026/women_bottoms_jeans/260227_L3_Subcategory_w_03_pc.jpg",
            "https://www.uniqlo.com/tw/cms/bcc4c0cbfc499b80258521de975f6dba.jpg",
          ].map((src, i) => (
            <img key={i} src={src} alt="" style={{ width: "100%", display: "block" }} />
          ))}
        </div>
      )}

      {/* KIDS Promo Banner */}
      {activeNav === "KIDS" && (
        <div style={{
          margin: "0", overflow: "hidden", position: "relative",
        }}>
          <img
            src="https://www.uniqlo.com/tw/hmall/test/u0000000052881/main/first/561/1.jpg"
            alt="童裝新品"
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.45))",
            padding: "24px 16px 14px",
            color: "white",
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>童裝新品</div>
            <div style={{ fontSize: 12, marginTop: 2, opacity: 0.9 }}>舒適輕盈，陪伴每個探索時刻</div>
          </div>
        </div>
      )}

      {/* Category Grid — KIDS and BABY only */}
      {(activeNav === "KIDS" || activeNav === "BABY") && NAV_CATEGORIES[activeNav] && (
        <>
          <div style={{ padding: "14px 16px 6px", fontSize: 13, fontWeight: 700, color: "#111" }}>
            分類瀏覽
          </div>
          <div className="category-grid">
            {NAV_CATEGORIES[activeNav].map((cat) => (
              <div
                key={cat.name}
                className="cat-item"
                onClick={() => onCategoryClick && onCategoryClick(cat.name)}
              >
                <div className="cat-thumb" style={{ background: cat.bg }}>
                  <div style={{ width: 24, height: 24, borderRadius: 3, background: cat.color, opacity: 0.85 }} />
                </div>
                <span className="cat-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
