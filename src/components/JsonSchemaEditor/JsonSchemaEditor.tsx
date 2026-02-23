import { useCallback, useEffect, useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import type { JsonSchemaEditorProps, JSONSchema, ValidationError } from './types';

const MODEL_URI = 'inmemory://model.json';

function markersToErrors(
  markers: Monaco.editor.IMarker[]
): ValidationError[] {
  return markers.map((m) => ({
    message: m.message ?? 'Unknown error',
    line: m.startLineNumber,
    column: m.startColumn,
    severity: m.severity === 8 ? 'error' : 'warning',
    code: m.code as string | undefined,
  }));
}

function setSchemaForModel(
  monaco: typeof Monaco,
  modelUri: string,
  schema: JSONSchema | undefined
): void {
  monaco.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas:
      schema != null
        ? [{ uri: MODEL_URI, fileMatch: [modelUri], schema }]
        : [],
  });
}

const DEFAULT_EDITOR_OPTIONS: Monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  automaticLayout: true,
  tabSize: 2,
  insertSpaces: true,
  formatOnPaste: true,
  formatOnType: true,
  suggest: { showWords: false },
};

export function JsonSchemaEditor({
  value,
  onChange,
  schema,
  onValidationErrors,
  errors: _errors,
  minHeight,
  'aria-label': ariaLabel = 'JSON editor',
  ...editorRest
}: JsonSchemaEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const subscriptionRef = useRef<Monaco.IDisposable | null>(null);

  const handleEditorMount: OnMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;
      const model = editor.getModel();
      if (model) {
        const uri = model.uri.toString();
        setSchemaForModel(monaco, uri, schema);
      }

      subscriptionRef.current = monaco.editor.onDidChangeMarkers(
        (uris: readonly { toString(): string }[]) => {
          if (!onValidationErrors || !model) return;
          const modelUri = model.uri.toString();
          if (!uris.some((u) => u.toString() === modelUri)) return;
          const markers = monaco.editor.getModelMarkers({ resource: model.uri });
          onValidationErrors(markersToErrors(markers));
        }
      );

      if (onValidationErrors && model) {
        const markers = monaco.editor.getModelMarkers({ resource: model.uri });
        onValidationErrors(markersToErrors(markers));
      }
      editorRest.onMount?.(editor, monaco);
    },
    [schema, onValidationErrors, editorRest.onMount]
  );

  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (!monaco || !editor || schema == null) return;
    const model = editor.getModel();
    if (!model) return;
    setSchemaForModel(monaco, model.uri.toString(), schema);
  }, [schema]);

  useEffect(() => {
    return () => {
      subscriptionRef.current?.dispose();
    };
  }, []);

  const mergedOptions: Monaco.editor.IStandaloneEditorConstructionOptions = {
    ...DEFAULT_EDITOR_OPTIONS,
    ...editorRest.options,
    readOnly: editorRest.options?.readOnly ?? false,
  };

  return (
    <div
      className={editorRest.className}
      style={{ minHeight }}
      role="application"
      aria-label={ariaLabel}
    >
      <Editor
        {...editorRest}
        defaultLanguage="json"
        language="json"
        value={value}
        onChange={(raw) => onChange(raw ?? '')}
        onMount={handleEditorMount}
        height={editorRest.height ?? '400px'}
        options={mergedOptions}
        loading={editorRest.loading}
      />
    </div>
  );
}
