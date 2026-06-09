import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetailScreen({ product, onBack, onAddToCart }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  const sizes = product.sizes || SIZES;
  const colors = product.colors || [];
  // colorImages[i] overrides the main img for that colour; falls back to product.img
  const displayImg = (product.colorImages?.[selectedIdx]) || product.img;

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart({
      ...product,
      selectedColor: colors[selectedIdx],
      selectedSize,
    });
    setAdded(true);
    setTimeout(() => { onBack(); }, 1100);
  };

  return (
    <div style={{ background: "white", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="detail-header">
        <button className="detail-back" onClick={onBack}>‹</button>
        <div className="detail-header-title">{product.name}</div>
        <div style={{ width: 36 }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Product Image */}
        <div className="detail-img-wrap">
          {displayImg ? (
            <img src={displayImg} alt={product.name} className="detail-img" />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(160deg, #f0f0f0 0%, #e4e4e4 100%)",
            }}>
              <div style={{ width: 80, height: 110, background: "#ddd", borderRadius: 4 }} />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="detail-info">
          <div className="detail-fit">{product.fit}</div>
          <div className="detail-name">{product.name}</div>
          <div className="detail-price-row">
            {product.originalPrice ? (
              <>
                <div className="detail-price sale">NT${product.price.toLocaleString()}</div>
                <div className="detail-orig-price">原價: NT${product.originalPrice.toLocaleString()}</div>
              </>
            ) : (
              <div className="detail-price">NT${product.price.toLocaleString()}</div>
            )}
          </div>

          {/* Color Selection */}
          <div className="detail-section">
            <div className="detail-section-title">顏色選擇</div>
            <div className="detail-colors">
              {colors.map((c, i) => (
                <div
                  key={i}
                  className={`detail-color-circle ${selectedIdx === i ? "selected" : ""}`}
                  style={{ background: c }}
                  onClick={() => setSelectedIdx(i)}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="detail-section">
            <div className="detail-section-title">尺寸選擇</div>
            {!selectedSize && (
              <div className="detail-size-hint">請先選擇尺寸</div>
            )}
            <div className="detail-sizes">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`detail-size-btn ${selectedSize === s ? "selected" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="detail-footer">
        <button
          className={`detail-cart-btn ${added ? "added" : ""} ${!selectedSize ? "disabled" : ""}`}
          onClick={handleAdd}
          disabled={!selectedSize}
        >
          {added ? "✓ 已加入" : "加入購物車"}
        </button>
      </div>
    </div>
  );
}
