import { useState, useRef, useMemo } from "react";
import { Heart, Search } from "lucide-react";

const FILTER_CHIPS = ["尺寸", "顏色", "價格"];

const SORT_OPTIONS = [
  { id: "default", label: "綜合" },
  { id: "newest", label: "最新上架" },
  { id: "price_asc", label: "價格：由低到高" },
  { id: "price_desc", label: "價格：由高到低" },
  { id: "rating", label: "商品評分最高" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const KIDS_SIZES = ["110cm", "120cm", "130cm", "140cm", "150cm", "160cm"];

const BASE = "https://www.uniqlo.com/tw/hmall/test";

const WOMEN_TSHIRT_PRODUCTS = [
  {
    id: "53518",
    name: "Uniqlo U 圓領T恤",
    code: "53518",
    fit: "女裝, XS-3XL",
    price: 790,
    colors: ["#f5f5f5", "#222222", "#5a7890", "#a8b890", "#c89878"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.9, reviews: 64,
    img: `${BASE}/u0000000053518/main/first/561/1.jpg`,
  },
  {
    id: "53811",
    name: "印花短袖T恤",
    code: "53811",
    fit: "女裝, XS-3XL",
    price: 690,
    colors: ["#f0e8e0", "#d8e0e8", "#e8d8c8", "#c8d8c0"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.4, reviews: 28,
    img: `${BASE}/u0000000053811/main/first/561/1.jpg`,
  },
  {
    id: "54101",
    name: "棉質混紡寬版T恤",
    code: "54101",
    fit: "女裝, XS-3XL",
    price: 590,
    colors: ["#f5f5f5", "#222222", "#8a9870", "#c8b090", "#5a6880"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.5, reviews: 47,
    img: `${BASE}/u0000000054101/main/first/561/1.jpg`,
  },
  {
    id: "52705",
    name: "短版T恤（短袖）",
    code: "465760 / 474410 / 483455",
    fit: "女裝, XS-3XL",
    price: 490,
    badge: "熱銷補貨",
    colors: ["#d8d8d8", "#222222", "#c83030", "#8a3a20", "#b8cc60", "#5a8ab0", "#c8a8c0"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.7, reviews: 203,
    img: `${BASE}/u0000000052705/main/first/561/1.jpg`,
  },
  {
    id: "53653",
    name: "AIRism 無縫短袖T恤",
    code: "53653",
    fit: "女裝, XS-3XL",
    price: 490,
    colors: ["#f5f5f5", "#222222", "#c0b8d8", "#d8c0b8", "#a8c8b0"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.8, reviews: 92,
    img: `${BASE}/u0000000053653/main/first/561/1.jpg`,
  },
  {
    id: "52833",
    name: "圓領T恤（短袖）",
    code: "474404 / 483456",
    fit: "女裝, XS-3XL",
    price: 390,
    colors: ["#f5f5f5", "#222222", "#e8e0cc", "#8b2020", "#5a3a28", "#4a7a60", "#3a8ab0", "#e8d0a8"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.9, reviews: 85,
    img: `${BASE}/u0000000052833/main/first/561/1.jpg`,
  },
  {
    id: "53248",
    name: "粗紡V領T恤（短袖）",
    code: "483460",
    fit: "女裝, XS-3XL",
    price: 390,
    colors: ["#f0e8c0", "#b8d0e8", "#222222", "#e8b0c0", "#e8e8c0", "#7a8a50", "#90b8d0", "#2a3a60"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.6, reviews: 33,
    img: `${BASE}/u0000000053248/main/first/561/1.jpg`,
  },
  {
    id: "52707",
    name: "AIRism 棉質T恤（短袖）",
    code: "474405 / 483457",
    fit: "女裝, XS-3XL",
    price: 290, originalPrice: 390,
    saleLabel: "期間限定",
    deadline: "截至 06/15 限定價格",
    colors: ["#f0ece8", "#e0dcd0", "#222222", "#e8b0b8", "#c83030", "#c8a878", "#7a2030", "#3a8a60"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.8, reviews: 156,
    img: `${BASE}/u0000000052707/main/first/561/1.jpg`,
  },
];

const MEN_TSHIRT_PRODUCTS = [
  {
    id: "53128",
    name: "華夫格亨利領短袖T恤",
    code: "53128",
    fit: "男裝, XS-3XL",
    price: 590,
    colors: ["#222222", "#e8e8e8", "#8b7355", "#3a3a5c"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.8, reviews: 42,
    img: `${BASE}/u0000000053128/main/first/561/1.jpg`,
  },
  {
    id: "53125",
    name: "華夫格圓領短袖T恤",
    code: "53125",
    fit: "男裝, XS-3XL",
    price: 590,
    colors: ["#e8e8e8", "#222222", "#4a6080", "#8b4a4a"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.7, reviews: 28,
    img: `${BASE}/u0000000053125/main/first/561/1.jpg`,
  },
  {
    id: "54043",
    name: "AIRism 棉質混紡短袖T恤",
    code: "54043",
    fit: "男裝, XS-3XL",
    price: 490,
    // colors[0] = white matches COL00 image
    colors: ["#f0f0f0", "#222222", "#2a4a6a", "#4a6a4a"],
    colorImages: [
      `${BASE}/u0000000054043/sku/561/COL00.jpg`,
      `${BASE}/u0000000054043/sku/561/COL09.jpg`,
      `${BASE}/u0000000054043/sku/561/COL17.jpg`,
      `${BASE}/u0000000054043/sku/561/COL38.jpg`,
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.9, reviews: 87,
    img: `${BASE}/u0000000054043/sku/561/COL00.jpg`,
  },
  {
    id: "53974",
    name: "超輕量涼感短袖T恤",
    code: "53974",
    fit: "男裝, XS-3XL",
    price: 490,
    badge: "特價商品",
    // colors[0] = light blue matches the displayed image
    colors: ["#c0c8d8", "#222222", "#e8e8e8", "#8b8b6a"],
    colorImages: [
      `${BASE}/u0000000053974/main/first/561/1.jpg`,
      `${BASE}/u0000000053974/sku/561/COL09.jpg`,
      `${BASE}/u0000000053974/sku/561/COL00.jpg`,
      `${BASE}/u0000000053974/sku/561/COL38.jpg`,
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.8, reviews: 63,
    img: `${BASE}/u0000000053974/main/first/561/1.jpg`,
  },
  {
    id: "51974",
    name: "棉質圓領短袖T恤",
    code: "51974",
    fit: "男裝, XS-3XL",
    price: 1190,
    colors: ["#e8e8e8", "#222222", "#4a6a8a", "#7a5a4a"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.7, reviews: 118,
    img: `${BASE}/u0000000053989/main/first/561/1.jpg`,
  },
  {
    id: "51571",
    name: "DRY-EX 快乾短袖T恤",
    code: "51571",
    fit: "男裝, XS-3XL",
    price: 890,
    colors: ["#222222", "#3a6a4a", "#4a5a7a", "#8a4a4a"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.9, reviews: 204,
    img: `${BASE}/u0000000051571/main/first/561/1.jpg`,
  },
];

const KIDS_OUTER_PRODUCTS = [
  {
    id: "483716",
    name: "AIRism 防曬網眼連帽外套（長袖）",
    code: "483716",
    fit: "童裝, 110cm-160cm",
    price: 590,
    colors: ["#222222", "#5b8ab0", "#c8e0f0"],
    sizes: ["110cm", "120cm", "130cm", "140cm", "150cm", "160cm"],
    rating: 5.0, reviews: 12,
    img: `${BASE}/u0000000052681/main/first/561/1.jpg`,
  },
  {
    id: "483404",
    name: "防曬可攜式連帽外套（拼色）",
    code: "483404",
    fit: "童裝, 110cm-160cm",
    price: 790,
    badge: "特價商品",
    colors: ["#e8e0d0", "#3a5c7a", "#c0c8d8"],
    sizes: ["110cm", "120cm", "130cm", "140cm", "150cm", "160cm"],
    rating: 5.0, reviews: 7,
    img: `${BASE}/u0000000052085/main/first/561/1.jpg`,
  },
  {
    id: "483717",
    name: "AIRism 防曬網眼連帽外套（長袖）拼色",
    code: "483717",
    fit: "童裝, 110cm-160cm",
    price: 590,
    colors: ["#222222", "#5b8ab0"],
    sizes: ["110cm", "120cm", "130cm", "140cm", "150cm", "160cm"],
    rating: 5.0, reviews: 9,
    img: `${BASE}/u0000000052259/main/first/561/1.jpg`,
  },
  {
    id: "488841",
    name: "AIRism 防曬網眼連帽外套（長袖）",
    code: "488841",
    fit: "童裝, 110cm-160cm",
    price: 590,
    colors: ["#e8e8e8", "#5b8ab0", "#c8d8c0"],
    sizes: ["110cm", "120cm", "130cm", "140cm", "150cm", "160cm"],
    rating: 5.0, reviews: 5,
    img: `${BASE}/u0000000052881/main/first/561/1.jpg`,
  },
];

const PRODUCTS = [
  {
    id: "469930",
    name: "休閒長褲",
    code: "469930 / 475382 / 479801 482313",
    fit: "男裝 / 男女適穿, XS-4XL",
    price: 990,
    colors: ["#e8e8e8", "#4a4a4a", "#222222", "#3a3a5c"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.8, reviews: 33,
    img: `${BASE}/u0000000052712/main/first/561/1.jpg`,
  },
  {
    id: "484662",
    name: "打褶寬版錐形褲",
    code: "484662",
    fit: "男裝 / 男女適穿, XS-3XL",
    price: 990,
    badge: "特價商品",
    colors: ["#7a8a9c", "#4a4a4a", "#8b7355", "#3a3a5c"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8, reviews: 16,
    img: `${BASE}/u0000000053204/main/first/561/1.jpg`,
  },
  {
    id: "483722",
    name: "廓型褲",
    code: "483722 / 475344 482287",
    fit: "女裝 / 男女適穿, XS-3XL",
    price: 990, originalPrice: 1290,
    saleLabel: "期間限定",
    deadline: "截至 05/28 限定價格",
    colors: ["#e8e0cc", "#444444", "#333333", "#d4b896"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.9, reviews: 172,
    img: `${BASE}/u0000000052761/main/first/561/1.jpg`,
  },
  {
    id: "482920",
    name: "亞麻混紡休閒長褲",
    code: "482920",
    fit: "男裝, XS-3XL",
    price: 890, originalPrice: 1290,
    saleLabel: "期間限定",
    deadline: "截至 05/28 限定價格",
    colors: ["#222222", "#e8e8e8", "#c8b8a8", "#5c5c4c"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9, reviews: 12,
    img: `${BASE}/u0000000052771/main/first/561/1.jpg`,
  },
  {
    id: "476221",
    name: "AIRism 超細纖維直筒褲",
    code: "476221",
    fit: "男裝 / 男女適穿, XS-3XL",
    price: 790,
    colors: ["#222222", "#e8e8e8", "#c0c8d8"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.6, reviews: 54,
    img: `${BASE}/u0000000054253/main/first/561/1.jpg`,
  },
  {
    id: "478900",
    name: "HEATTECH 保暖長褲",
    code: "478900",
    fit: "男裝, XS-3XL",
    price: 690,
    colors: ["#222222", "#444444", "#e8e0cc"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7, reviews: 89,
    img: `${BASE}/u0000000053923/main/first/561/1.jpg`,
  },
];

export default function SearchResultsScreen({ query, navContext, onBack, onProductClick }) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(null); // null | { min, max, label }
  const [sortPos, setSortPos] = useState({ top: 0, right: 0 });
  const [sizePos, setSizePos] = useState({ top: 0, left: 0 });
  const [pricePos, setPricePos] = useState({ top: 0, left: 0 });
  const sortBtnRef = useRef(null);
  const sizeBtnRef = useRef(null);
  const priceBtnRef = useRef(null);

  const activeSortLabel = SORT_OPTIONS.find((s) => s.id === sortBy)?.label;

  const closeAll = () => { setSortOpen(false); setSizeOpen(false); setPriceOpen(false); };

  const openSort = () => {
    if (sortBtnRef.current) {
      const r = sortBtnRef.current.getBoundingClientRect();
      setSortPos({ top: r.bottom + 2, right: window.innerWidth - r.right });
    }
    setSortOpen(true); setSizeOpen(false); setPriceOpen(false);
  };

  const openSizeDropdown = () => {
    if (sizeBtnRef.current) {
      const r = sizeBtnRef.current.getBoundingClientRect();
      setSizePos({ top: r.bottom + 2, left: r.left });
    }
    setSizeOpen(true); setSortOpen(false); setPriceOpen(false);
  };

  const openPriceDropdown = () => {
    if (priceBtnRef.current) {
      const r = priceBtnRef.current.getBoundingClientRect();
      setPricePos({ top: r.bottom + 2, left: r.left });
    }
    setPriceOpen(true); setSortOpen(false); setSizeOpen(false);
  };

  const PRICE_RANGES = [
    { label: "全部價格", min: 0, max: Infinity },
    { label: "NT$500 以下", min: 0, max: 499 },
    { label: "NT$500 – NT$800", min: 500, max: 800 },
    { label: "NT$800 以上", min: 801, max: Infinity },
  ];
  const PRICE_SORTS = [
    { id: "price_asc", label: "價格：低到高" },
    { id: "price_desc", label: "價格：高到低" },
  ];

  const isKidsOuter = query === "外套類" && navContext === "KIDS";
  const isMenTshirt = query === "T恤" && navContext === "MEN";
  const isWomenTshirt = (query === "T恤" || query === "T") && navContext !== "MEN";
  const sizeOptions = isKidsOuter ? KIDS_SIZES : ALL_SIZES;

  const filteredAndSorted = useMemo(() => {
    let list = isKidsOuter   ? [...KIDS_OUTER_PRODUCTS]
             : isMenTshirt   ? [...MEN_TSHIRT_PRODUCTS]
             : isWomenTshirt ? [...WOMEN_TSHIRT_PRODUCTS]
             : [...PRODUCTS];

    // Filter by size
    if (selectedSize) {
      list = list.filter((p) => p.sizes && p.sizes.includes(selectedSize));
    }

    // Filter by price range
    if (priceRange && priceRange.max !== Infinity) {
      list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    } else if (priceRange && priceRange.min > 0) {
      list = list.filter((p) => p.price >= priceRange.min);
    }

    // Sort
    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [sortBy, selectedSize, priceRange, query, navContext]);

  return (
    <div style={{ background: "white", minHeight: "100%", position: "relative" }}>

      {/* ── Sort Dropdown ── */}
      {sortOpen && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 200 }}
            onClick={() => setSortOpen(false)}
          />
          <div
            className="sort-dropdown"
            style={{ position: "fixed", top: sortPos.top, right: sortPos.right, zIndex: 201 }}
          >
            {SORT_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className={`sort-dropdown-item ${sortBy === opt.id ? "active" : ""}`}
                onClick={() => { setSortBy(opt.id); setSortOpen(false); }}
              >
                <span>{opt.label}</span>
                {sortBy === opt.id && <span className="sort-check-mark">✓</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Size Dropdown ── */}
      {sizeOpen && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 200 }}
            onClick={() => setSizeOpen(false)}
          />
          <div
            className="sort-dropdown"
            style={{ position: "fixed", top: sizePos.top, left: sizePos.left, zIndex: 201, minWidth: 120 }}
          >
            <div
              className={`sort-dropdown-item ${!selectedSize ? "active" : ""}`}
              onClick={() => { setSelectedSize(null); setSizeOpen(false); }}
            >
              <span>全部尺寸</span>
              {!selectedSize && <span className="sort-check-mark">✓</span>}
            </div>
            {sizeOptions.map((s) => (
              <div
                key={s}
                className={`sort-dropdown-item ${selectedSize === s ? "active" : ""}`}
                onClick={() => { setSelectedSize(selectedSize === s ? null : s); setSizeOpen(false); }}
              >
                <span>{s}</span>
                {selectedSize === s && <span className="sort-check-mark">✓</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Price Dropdown ── */}
      {priceOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 200 }} onClick={() => setPriceOpen(false)} />
          <div className="sort-dropdown" style={{ position: "fixed", top: pricePos.top, left: pricePos.left, zIndex: 201, minWidth: 180 }}>
            {/* Price range section */}
            <div style={{ padding: "8px 16px 4px", fontSize: 10, fontWeight: 700, color: "#aaa", letterSpacing: 0.5 }}>價格區間</div>
            {PRICE_RANGES.map((r) => {
              const isActive = r.label === "全部價格" ? !priceRange : priceRange?.label === r.label;
              return (
                <div
                  key={r.label}
                  className={`sort-dropdown-item ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setPriceRange(r.label === "全部價格" ? null : r);
                    setPriceOpen(false);
                  }}
                >
                  <span>{r.label}</span>
                  {isActive && <span className="sort-check-mark">✓</span>}
                </div>
              );
            })}
            {/* Price sort section */}
            <div style={{ padding: "8px 16px 4px", fontSize: 10, fontWeight: 700, color: "#aaa", letterSpacing: 0.5, borderTop: "0.5px solid #f0f0f0" }}>排序</div>
            {PRICE_SORTS.map((s) => (
              <div
                key={s.id}
                className={`sort-dropdown-item ${sortBy === s.id ? "active" : ""}`}
                onClick={() => { setSortBy(s.id); setPriceOpen(false); }}
              >
                <span>{s.label}</span>
                {sortBy === s.id && <span className="sort-check-mark">✓</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Sticky Header ── */}
      <div className="results-sticky-header">

        {/* Search Bar */}
        <div className="search-bar-row" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <button className="search-back" onClick={onBack}>‹</button>
          <div style={{
            flex: 1, height: 38,
            border: "0.5px solid #aaa", borderRadius: 20,
            padding: "0 16px", display: "flex", alignItems: "center",
            background: "white", fontSize: 13, color: "#222",
            justifyContent: "space-between",
          }}>
            <span>{query}</span>
            <span style={{ color: "#bbb", fontSize: 16, cursor: "pointer" }} onClick={onBack}>✕</span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="result-filter-row">
          <button className="result-filter-all">
            <span style={{ fontSize: 14 }}>⊞</span>
          </button>
          {FILTER_CHIPS.map((chip) => {
            const isPriceActive = chip === "價格" && (priceRange || sortBy === "price_asc" || sortBy === "price_desc");
            const priceLabel = chip === "價格" && priceRange ? priceRange.label.replace("NT$", "").replace(" – ", "-").replace(" 以下", "↓").replace(" 以上", "↑") : chip;
            return (
              <button
                key={chip}
                ref={chip === "尺寸" ? sizeBtnRef : chip === "價格" ? priceBtnRef : null}
                className={`result-chip ${(chip === "尺寸" && selectedSize) || isPriceActive ? "active" : ""}`}
                onClick={() => {
                  if (chip === "尺寸") openSizeDropdown();
                  else if (chip === "價格") openPriceDropdown();
                }}
              >
                {chip === "尺寸" && selectedSize ? `尺寸: ${selectedSize}` : priceLabel} <span style={{ fontSize: 10 }}>▾</span>
              </button>
            );
          })}
        </div>

        {/* Count + Sort */}
        <div className="result-meta-row">
          <span className="result-count">{filteredAndSorted.length} 件</span>
          <button
            ref={sortBtnRef}
            className={`result-sort-btn ${sortBy !== "default" ? "active" : ""}`}
            onClick={openSort}
          >
            ↓↑ 排序{sortBy !== "default" ? `：${activeSortLabel}` : ""}
          </button>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="product-grid">
        {filteredAndSorted.map((p) => (
          <div
            key={p.id}
            className="product-card"
            onClick={() => onProductClick && onProductClick(p)}
          >
            <div className="product-img-wrap">
              {p.img ? (
                <img src={p.img} alt={p.name} className="product-img" />
              ) : (
                <div className="product-img-placeholder">
                  <div style={{
                    width: 48, height: 64,
                    background: "linear-gradient(180deg, #d8d8d8 0%, #c0c0c0 100%)",
                    borderRadius: 4, opacity: 0.5,
                  }} />
                </div>
              )}
              <button className="product-heart" onClick={(e) => e.stopPropagation()}><Heart size={14} strokeWidth={1.5} /></button>
            </div>

            <div className="product-colors">
              {p.colors.map((c, i) => (
                <div key={i} className="product-color-dot" style={{ background: c }} />
              ))}
              {p.colors.length > 3 && <span style={{ fontSize: 10, color: "#888" }}>+</span>}
            </div>

            <div className="product-info">
              <div className="product-fit">{p.fit}</div>
              <div className="product-name">{p.name}</div>
              {p.code && <div className="product-code">{p.code}</div>}

              <div className="product-price-row">
                {p.originalPrice ? (
                  <>
                    <span className="product-price sale">NT${p.price.toLocaleString()}</span>
                    <span className="product-orig-price">原價: NT${p.originalPrice.toLocaleString()}</span>
                  </>
                ) : (
                  <span className="product-price">NT${p.price.toLocaleString()}</span>
                )}
              </div>

              {p.badge && <div className="product-badge">{p.badge}</div>}
              {p.saleLabel && (
                <div className="product-sale-info">
                  <div className="product-sale-label">{p.saleLabel}</div>
                  <div className="product-deadline">{p.deadline}</div>
                </div>
              )}

              <div className="product-rating">
                <span className="rating-star">★</span>
                <span className="rating-score">{p.rating}</span>
                <span className="rating-count">({p.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
