import { Bot } from "lucide-react";
import { useResearchOptional } from "../research/ResearchContext.jsx";

export default function AccountScreen({ onOpenHelp }) {
  const research = useResearchOptional();

  const openHelpEntry = (source) => {
    research?.reportEvent?.("help_open", { source });
    onOpenHelp?.();
  };
  const MEMBER_NO = "7107077042025";

  const ACCOUNT_ITEMS = [
    "個人資料",
    "收件地址一覽",
    "變更 Email 帳號",
    "影片播放設定",
  ];

  const ORDER_ITEMS = [
    "網路商店購買紀錄",
    "近年退款紀錄",
    "集貨倉庫訂單",
  ];

  const POINT_ITEMS = [
    "點數查詢",
    "優惠券一覽",
  ];

  const HELP_ITEMS = [
    "客服中心",
    "常見問題 FAQ",
    "App 設定",
    "關於 UNIQLO",
  ];

  const Section = ({ title, items, onItemClick }) => (
    <div style={{ marginBottom: 0 }}>
      <div style={{
        background: "#f5f5f5", padding: "10px 16px",
        fontSize: 13, fontWeight: 700, color: "#111",
        borderTop: "0.5px solid #e0e0e0", borderBottom: "0.5px solid #e0e0e0",
      }}>
        {title}
      </div>
      {items.map((item, i) => (
        <div key={i}
          onClick={() => onItemClick?.(item)}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 16px", borderBottom: "0.5px solid #efefef",
            cursor: "pointer", background: "white", fontSize: 14, color: "#111",
          }}>
          <span>{item}</span>
          <span style={{ color: "#bbb", fontSize: 16 }}>›</span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100%" }}>

      {/* Page sub-header */}
      <div style={{
        display: "flex", justifyContent: "flex-end", alignItems: "center",
        padding: "10px 16px", background: "white", borderBottom: "0.5px solid #e0e0e0",
      }}>
        <button
          onClick={() => openHelpEntry("account_smart_cs")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 600, color: "#111",
            border: "1.5px solid #111", borderRadius: 20,
            padding: "7px 16px", background: "white",
          }}
        >
          <Bot size={16} strokeWidth={1.5} /> <span>智能客服</span>
        </button>
      </div>

      {/* Barcode Section */}
      <div style={{
        background: "white", padding: "28px 24px 24px",
        display: "flex", flexDirection: "column", alignItems: "center",
        borderBottom: "0.5px solid #e0e0e0",
      }}>
        {/* Barcode SVG */}
        <svg width="240" height="72" viewBox="0 0 240 72" style={{ display: "block", marginBottom: 8 }}>
          {(() => {
            const pattern = [3,1,2,1,3,2,1,2,1,3,1,1,2,3,1,2,1,1,3,1,2,2,1,3,1,1,2,1,3,2,
                             1,2,3,1,1,2,1,3,1,2,1,1,3,2,1,2,1,3,1,1,2,3,1,1,2,1,3,2,1,2];
            let x = 0;
            return pattern.map((w, i) => {
              const bar = i % 2 === 0 ? (
                <rect key={i} x={x} y={0} width={w * 3} height={72} fill="#111" />
              ) : null;
              x += w * 3;
              return bar;
            });
          })()}
        </svg>
        <div style={{ fontSize: 12, color: "#555", letterSpacing: 2, marginBottom: 8 }}>
          {MEMBER_NO}
        </div>
        <div style={{ fontSize: 11, color: "#888" }}>
          請在結帳前出示您的會員條碼
        </div>
      </div>

      {/* Account sections */}
      <Section title="我的帳戶" items={ACCOUNT_ITEMS} />
      <Section title="訂單中心" items={ORDER_ITEMS} />
      <Section title="點數與優惠" items={POINT_ITEMS} />
      <Section
        title="說明與設定"
        items={HELP_ITEMS}
        onItemClick={(item) => {
          if (item === "客服中心") openHelpEntry("account_help_center");
        }}
      />

      <div style={{ height: 32 }} />
    </div>
  );
}
