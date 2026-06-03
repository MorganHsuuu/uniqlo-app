import { Trash2, ShoppingCart } from "lucide-react";

export default function CartScreen({ cart, onBack, onRemoveItem }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ background: "white", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="detail-header">
        <button className="detail-back" onClick={onBack}>‹</button>
        <div className="detail-header-title">購物車</div>
        <div style={{ width: 36 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: cart.length > 0 ? 120 : 0 }}>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={48} strokeWidth={1} color="#ccc" style={{ marginBottom: 12 }} />
            <div style={{ fontSize: 14, color: "#999" }}>購物車目前沒有商品</div>
          </div>
        ) : (
          <>
            {cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <div className="cart-item-img-wrap">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#e0e0e0" }} />
                  )}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-fit">{item.fit}</div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">
                    {item.selectedColor && (
                      <div
                        style={{
                          width: 12, height: 12, borderRadius: "50%",
                          background: item.selectedColor,
                          border: "0.5px solid rgba(0,0,0,0.2)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {item.selectedSize && (
                      <span className="cart-item-size">尺寸: {item.selectedSize}</span>
                    )}
                  </div>
                  <div className="cart-item-price">NT${item.price.toLocaleString()}</div>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => onRemoveItem(idx)}
                  aria-label="移除"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
                >
                  <Trash2 size={18} strokeWidth={1.5} color="#bbb" />
                  <span style={{ fontSize: 10, color: "#aaa" }}>移除</span>
                </button>
              </div>
            ))}

            {/* Totals */}
            <div className="cart-total-section">
              <div className="cart-total-row">
                <span>商品小計</span>
                <span>NT${total.toLocaleString()}</span>
              </div>
              <div className="cart-total-row">
                <span>運費</span>
                <span>免費</span>
              </div>
              <div className="cart-total-row total">
                <span>合計</span>
                <span>NT${total.toLocaleString()}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky Footer */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <button className="checkout-btn">前往結帳</button>
        </div>
      )}
    </div>
  );
}
