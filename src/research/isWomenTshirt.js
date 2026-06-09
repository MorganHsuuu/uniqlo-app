/** 任務四：女性 T 恤商品 */
export function isWomenTshirtProduct(product) {
  if (!product) return false;
  const fit = String(product.fit || "");
  const name = String(product.name || "");
  if (!fit.includes("女裝")) return false;
  const n = name.replace(/\s/g, "").toLowerCase();
  return n.includes("t恤") || n.includes("tshirt");
}
