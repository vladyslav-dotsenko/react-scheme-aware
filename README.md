# react-scheme-aware

A reusable React **JSON** editor with **JSON Schema** validation and code intelligence, built on [Monaco Editor](https://microsoft.github.io/monaco-editor/).

## Features

- **Schema-driven validation** — JSON is validated against a [JSON Schema](https://json-schema.org/) (draft-07 compatible); errors are reported via callback and can be shown inline or in a list.
- **Code intelligence** — Autocomplete and hover documentation from the schema (Monaco).
- **Controlled or hook-based** — Use `<JsonSchemaEditor />` with your own state, or `useSchemaEditor` to manage value and validation errors.
- **Dual use** — This repo is both an npm-ready library and a demo app with an API reference.

## Demo

```bash
npm install
npm run dev
```

Open the URL (e.g. `http://localhost:5173`). The demo includes example presets, a validation panel, and an **API Reference** section. The canonical API documentation lives in **`src/components/JsonSchemaEditor/types.ts`** (JSDoc); the demo refers to that file as the source of truth.

## Install

```bash
npm install react-scheme-aware react react-dom monaco-editor @monaco-editor/react
```

**Peer dependencies:** `react`, `react-dom`, `monaco-editor`, `@monaco-editor/react`.

## Usage

**With `useSchemaEditor` (recommended)** — the hook holds value and errors; its return is spreadable onto the editor. Optional `onChange` and `onValidationErrors` are called in addition to internal updates. When `initialValue` changes (e.g. preset switch), the hook syncs.

```tsx
import { JsonSchemaEditor, useSchemaEditor } from 'react-scheme-aware';

const schema = {
  type: 'object',
  properties: { name: { type: 'string' }, count: { type: 'integer', minimum: 0 } },
  required: ['name'],
};

function MyForm() {
  const schemaEditor = useSchemaEditor({
    initialValue: '{}',
    schema,
    onChange: (value) => { /* optional */ },
    onValidationErrors: (errors) => { /* optional */ },
  });

  return (
    <>
      <JsonSchemaEditor {...schemaEditor} height="300px" />
      {schemaEditor.errors.length > 0 && (
        <ul>{schemaEditor.errors.map((e, i) => <li key={i}>{e.message}</li>)}</ul>
      )}
    </>
  );
}
```

**Controlled (no hook)** — manage `value` and `onValidationErrors` state yourself and pass them as props to `<JsonSchemaEditor />`.

## API reference (source of truth)

API docs: **`src/components/JsonSchemaEditor/types.ts`** (JSDoc). Demo API Reference summarizes it.

Summary:

- **`<JsonSchemaEditor />`** — Extends `EditorProps` from `@monaco-editor/react`; required: `value`, `onChange`. Optional: `schema`, `onValidationErrors`, `minHeight`, `aria-label`, and any upstream Editor props (e.g. `height`, `className`, `options`, `onMount`). See `JsonSchemaEditorProps` in `types.ts`.
- **`useSchemaEditor(options)`** — Options: `initialValue` (required), `schema`, `onChange`, `onValidationErrors`. Returns props spreadable onto the editor plus `errors: ValidationError[]`. See `UseSchemaEditorOptions` and `UseSchemaEditorReturn` in `types.ts`.
- **`ValidationError`** — `message`, `path?`, `line?`, `column?`, `severity?`, `code?`. See `types.ts`.

## Building

- **Library (npm):** `npm run build:lib` → output in `dist/`. Only the library entry and `JsonSchemaEditor` components are built; demo code and app assets are excluded. The published package includes only `dist/` (and `README.md`).
- **Demo app:** `npm run build`.
- **Publishing:** Run `npm publish`; `prepublishOnly` runs `build:lib` so the tarball always contains an up-to-date `dist/`.

## License

MIT
