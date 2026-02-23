/**
 * react-scheme-aware — public API types (source of truth for docs).
 * @packageDocumentation
 */

import type { EditorProps } from '@monaco-editor/react';

/**
 * A single validation error produced by the JSON schema validator (Monaco).
 * Each item in the array passed to `onValidationErrors` has this shape.
 */
export interface ValidationError {
  /** Human-readable error message */
  message: string;
  /** JSON path where the error occurred (e.g. `"/items/0/name"`) */
  path?: string;
  /** 1-based line number in the editor */
  line?: number;
  /** 1-based column number in the editor */
  column?: number;
  /** Severity: `"error"` (Monaco 8) or `"warning"` (Monaco 4) */
  severity?: 'error' | 'warning';
  /** Optional Monaco marker code for grouping */
  code?: string;
}

/**
 * JSON Schema object used for validation and editor IntelliSense.
 * Draft-07 or compatible. See https://json-schema.org/
 */
export type JSONSchema = Record<string, unknown>;

/**
 * Props for `<JsonSchemaEditor />`. Extends `EditorProps` from `@monaco-editor/react`; overrides `value`, `onChange`, `language`.
 */
export interface JsonSchemaEditorProps
  extends Omit<EditorProps, 'value' | 'onChange' | 'language'> {
  value: string;
  onChange: (value: string) => void;
  schema?: JSONSchema;
  onValidationErrors?: (errors: ValidationError[]) => void;
  /** Ignored when passed; use return value of `useSchemaEditor` for `errors` in your UI. */
  errors?: ValidationError[];
  minHeight?: string;
  'aria-label'?: string;
}

/**
 * Options for `useSchemaEditor`. Callbacks are optional; the hook updates internal state and then calls them.
 */
export interface UseSchemaEditorOptions {
  /** Initial JSON; when it changes (e.g. preset switch), the hook syncs. */
  initialValue: string;
  /** JSON Schema for validation and IntelliSense. */
  schema?: JSONSchema;
  /** Called after internal state update when content changes. */
  onChange?: (value: string) => void;
  /** Called after internal state update when validation errors change. */
  onValidationErrors?: (errors: ValidationError[]) => void;
}

/**
 * Return type of `useSchemaEditor`.
 * Spread onto `<JsonSchemaEditor />`; add props like `height` as needed. Use `errors` for a validation list.
 */
export type UseSchemaEditorReturn = Omit<JsonSchemaEditorProps, 'errors'> & {
  errors: ValidationError[];
};
