import { useState } from 'react';
import { JsonSchemaEditor, useSchemaEditor } from './components/JsonSchemaEditor';
import type { JSONSchema } from './components/JsonSchemaEditor';
import {
  personSchema,
  configSchema,
  samplePersonJson,
  invalidPersonJson,
  sampleConfigJson,
} from './demo/schemas';
import { THEME_OPTIONS, registerCustomThemes } from './demo/editorThemes';
import { ApiReference } from './demo/ApiReference';
import './App.css';

type DemoPreset = 'person-valid' | 'person-invalid' | 'config';

const presets: { id: DemoPreset; label: string; schema?: JSONSchema; json: string }[] = [
  { id: 'person-valid', label: 'Person (valid)', schema: personSchema, json: samplePersonJson },
  { id: 'person-invalid', label: 'Person (with errors)', schema: personSchema, json: invalidPersonJson },
  { id: 'config', label: 'App config', schema: configSchema, json: sampleConfigJson },
];

function App() {
  const [preset, setPreset] = useState<DemoPreset>('person-valid');
  const [theme, setTheme] = useState(THEME_OPTIONS[0].id);
  const current = presets.find((p) => p.id === preset)!;

  const switchPreset = (id: DemoPreset) => {
    setPreset(id);
  };

  const schemaEditorProps = useSchemaEditor({
    initialValue: current.json,
    schema: current.schema,
  });

  const { errors } = schemaEditorProps;

  return (
    <div className="app">
      <header className="app-header">
        <h1>react-scheme-aware</h1>
        <p className="tagline">JSON editor with schema validation</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <div className="demo-controls">
            <label htmlFor="preset">Example:</label>
            <select
              id="preset"
              value={preset}
              onChange={(e) => switchPreset(e.target.value as DemoPreset)}
              aria-label="Select example"
            >
              {presets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <label htmlFor="theme">Theme:</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              aria-label="Select editor theme"
            >
              {THEME_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="editor-row">
            <div className="editor-cell">
              <h3>Editor</h3>
              <JsonSchemaEditor
                {...schemaEditorProps}
                theme={theme}
                beforeMount={registerCustomThemes}
                height="360px"
                minHeight="200px"
                aria-label="JSON editor with schema validation"
              />
            </div>
            <div className="errors-cell">
              <h3>Validation {errors.length > 0 ? `(${errors.length})` : ''}</h3>
              {errors.length === 0 ? (
                <p className="errors-empty">No validation errors.</p>
              ) : (
                <ul className="errors-list" role="list">
                  {errors.map((err, i) => (
                    <li key={i} className={`errors-item errors-item--${err.severity ?? 'error'}`}>
                      <span className="errors-loc">
                        {err.line != null ? `Line ${err.line}` : ''}
                        {err.column != null ? `:${err.column}` : ''}
                      </span>
                      &nbsp;
                      <span className="errors-msg">{err.message}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <ApiReference />
      </main>

      <footer className="app-footer">
        <p>Built with React, Monaco Editor, and JSON Schema.</p>
      </footer>
    </div>
  );
}

export default App;
