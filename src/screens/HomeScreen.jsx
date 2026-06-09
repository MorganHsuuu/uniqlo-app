export default function HomeScreen() {
  return (
    <div>
      {/* Feature badges */}
      <div className="badge-row">
        <div className="badge">新品上市</div>
        <div className="badge">設計師聯名</div>
        <div className="badge">限定商品</div>
        <div className="badge">熱銷補貨</div>
      </div>

      {/* Home feed */}
      <div>
        {[
          "https://www.uniqlo.com/tw/cms/a62f7837a18bdb43f985f870859a5aea.jpg",
          "https://www.uniqlo.com/tw/public/uqtw/l3/2026/women_bottoms_jeans/260227_L3_Subcategory_w_03_pc.jpg",
          "https://www.uniqlo.com/tw/cms/bcc4c0cbfc499b80258521de975f6dba.jpg",
        ].map((src, i) => (
          <img key={i} src={src} alt="" style={{ width: "100%", display: "block" }} />
        ))}
      </div>
    </div>
  );
}
