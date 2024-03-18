export function getFirstFocusableElement(
  node: HTMLElement | null
): HTMLElement | null {
  if (!node) return null;
  const elements = node.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return elements[0] || null;
}
