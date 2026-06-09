/** Standard SUS score: average of (score-1) for odd items + (5-score) for even items, × 2.5 */
export function calculateSusScore(answers) {
  if (!answers || answers.length !== 10) return null;
  let sum = 0;
  answers.forEach((score, i) => {
    const adjusted = i % 2 === 0 ? score - 1 : 5 - score;
    sum += adjusted;
  });
  return Math.round((sum / 10) * 25 * 10) / 10;
}
