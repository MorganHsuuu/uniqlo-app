/** 任務說明（含粗體標示） */
export default function TaskInstruction({ taskId, className }) {
  const Tag = className ? "div" : "span";
  const cls = className || undefined;

  switch (taskId) {
    case "task1":
      return (
        <Tag className={cls}>
          請從 App 首頁出發，<strong>從主選單</strong>找到並進入「童裝」分類頁面，並點擊「外套類」。
        </Tag>
      );
    case "task2":
      return (
        <Tag className={cls}>
          使用 App 的<strong>搜尋</strong>功能，搜尋「黑色長褲」，並點入任一商品頁面。
        </Tag>
      );
    case "task3":
      return (
        <Tag className={cls}>
          找到分類<strong>「女裝 T 恤」</strong>，使用<strong>篩選</strong>功能設定：尺寸「M」、排序「價格由低至高」。
        </Tag>
      );
    case "task4":
      return (
        <Tag className={cls}>
          從篩選結果中選一件<strong>白色女性 T 恤</strong>加入購物車，並到購物車中移除該商品。
        </Tag>
      );
    case "task5":
      return (
        <Tag className={cls}>
          在 App 中找到<strong>「客服中心」</strong>或<strong>「智能客服／幫助中心」</strong>頁面。
        </Tag>
      );
    default:
      return null;
  }
}
