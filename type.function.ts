export function isDiv(element: Element | null): element is HTMLDivElement {
  return element?.tagName == 'div';
}

export function isSpan(element: Element | null): element is HTMLSpanElement {
  return element?.tagName == 'span';
}

export function isButton(element: Element | null): element is HTMLButtonElement {
  return element?.tagName == 'button';
}

export function isInput(element: Element | null): element is HTMLInputElement {
  return element?.tagName == 'input';
}