export function isWithinLineLimit(text: string, maxLines = 900) {
  const lineCount = text.split('\n').length;
  return lineCount <= maxLines;
}
