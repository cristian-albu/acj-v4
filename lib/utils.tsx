export function getFirstFocusableElement(
  node: HTMLElement | null
): HTMLElement | null {
  if (!node) return null;
  const elements = node.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return elements[0] || null;
}

export function getLastFocusableElement(
  node: HTMLElement | null
): HTMLElement | null {
  if (!node) return null;
  const elements = node.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return elements[elements.length - 1] || null;
}

export function generateDateList(month: number, from?: number, to?: number) {
  const dates = [];
  const baseDate = new Date(new Date().getFullYear(), month, 1);
  const currDate = new Date(baseDate);

  let i = from || 0;

  currDate.setDate(baseDate.getDate() + i);
  while (currDate.getMonth() === month && i < (to || 32)) {
    i++;
    dates.push(new Date(currDate));
    currDate.setDate(baseDate.getDate() + i);
  }

  return dates;
}
