function parseHex(hex) {
  const h = (hex || "").replace("#", "");
  if (h.length !== 6) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** 接近白色／淺灰的商品色（任務四） */
export function isWhiteColor(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  const [r, g, b] = rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const maxDiff = Math.max(r, g, b) - Math.min(r, g, b);
  return luminance >= 0.82 && maxDiff < 40;
}
