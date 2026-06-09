#!/usr/bin/env bash
# 測試 Google Apps Script 端點是否可連線
set -euo pipefail

if [ ! -f .env ]; then
  echo "❌ 找不到 .env，請先建立並設定 VITE_GOOGLE_SCRIPT_URL"
  exit 1
fi

URL=$(grep VITE_GOOGLE_SCRIPT_URL .env | cut -d= -f2- | tr -d '"' | tr -d "'")

if [ -z "$URL" ]; then
  echo "❌ VITE_GOOGLE_SCRIPT_URL 尚未設定"
  exit 1
fi

echo "🔍 測試 GET $URL"
curl -sL "$URL" | head -c 200
echo ""
echo ""
echo "📤 測試 POST（假資料）"
curl -sL -X POST "$URL" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"sessionId":"test-'$(date +%s)'","submittedAt":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","email":"test@example.com","feedback":"連線測試","susScore":80,"task1Sec":12.5,"task1Done":true}'
echo ""
echo "✅ 若試算表 Responses 出現新列，代表連線成功"
