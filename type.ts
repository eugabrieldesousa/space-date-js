export interface Language {
  tooltip: string;
  title: string;
  startPlaceholder: string;
  endPlaceholder: string;
  apply: string;
  cancel: string;
  clear: string;
  days7: string;
  days30: string;
  days90: string;
  weekdays: string[]
  months: string[]
}

export type LanguageKey = 'pt' | 'en' | 'es';

export type QuerySelector = keyof HTMLElementTagNameMap | `#${string}` | `.${string}`;

export type StartEnd = 'start' | 'end';

export interface Option {
  format: string;
  separator: string;

  language?: LanguageKey;

  currentStartDate?: Date;
  currentEndDate?: Date;
}