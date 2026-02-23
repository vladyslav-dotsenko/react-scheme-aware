import type * as Monaco from 'monaco-editor';

export const THEME_OPTIONS: { id: string; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'vs-dark', label: 'Dark' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'forest', label: 'Forest' },
];

/**
 * Registers custom Monaco themes (Midnight, Forest). Call from Editor beforeMount so themes exist when theme prop is set.
 */
export function registerCustomThemes(monaco: typeof Monaco): void {
  monaco.editor.defineTheme('midnight', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0f1419',
      'editor.foreground': '#e6edf3',
      'editor.selectionBackground': '#264f78',
      'editor.lineHighlightBackground': '#161b22',
    },
  });

  monaco.editor.defineTheme('forest', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'string.key.json', foreground: '#7ee787' },
      { token: 'string.value.json', foreground: '#a5d6ff' },
      { token: 'number', foreground: '#d2a8ff' },
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#c9d1d9',
      'editor.selectionBackground': '#1a3d2e',
      'editor.lineHighlightBackground': '#0d1612',
    },
  });
}
