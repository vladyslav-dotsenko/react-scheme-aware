const apiSections = [
  {
    title: 'JsonSchemaEditor',
    description: 'A JSON editor with schema-driven validation and code intelligence (Monaco).',
    props: [
      { name: 'value', type: 'string', required: true, desc: 'JSON content (string).' },
      { name: 'onChange', type: '(value: string) => void', required: true, desc: 'Called on edit.' },
      { name: 'schema', type: 'JSONSchema', required: false, desc: 'Schema for validation and IntelliSense.' },
      { name: 'onValidationErrors', type: '(errors: ValidationError[]) => void', required: false, desc: 'Called when validation result changes.' },
      { name: 'minHeight', type: 'string', required: false, desc: 'Wrapper min height (CSS).' },
      { name: '"aria-label"', type: 'string', required: false, desc: 'Wrapper aria-label.' },
      { name: '…EditorProps', type: '—', required: false, desc: 'Any @monaco-editor/react Editor props; value, onChange, language are fixed.' },
    ],
  },
  {
    title: 'ValidationError',
    description: 'Shape of each item in the onValidationErrors array.',
    props: [
      { name: 'message', type: 'string', required: false, desc: 'Human-readable error message.' },
      { name: 'path', type: 'string', required: false, desc: 'JSON path (e.g. "/items/0/name").' },
      { name: 'line', type: 'number', required: false, desc: '1-based line number.' },
      { name: 'column', type: 'number', required: false, desc: '1-based column number.' },
      { name: 'severity', type: '"error" | "warning"', required: false, desc: 'Severity level.' },
      { name: 'code', type: 'string', required: false, desc: 'Optional error code.' },
    ],
  },
  {
    title: 'JSONSchema',
    description: 'JSON Schema (draft-07 or compatible).',
    props: [],
  },
  {
    title: 'useSchemaEditor',
    description: 'Manages value and validation errors. Return is spreadable onto JsonSchemaEditor.',
    props: [
      { name: 'initialValue', type: 'string', required: true, desc: 'Initial JSON; hook syncs when it changes.' },
      { name: 'schema', type: 'JSONSchema', required: false, desc: 'Schema for validation and IntelliSense.' },
      { name: 'onChange', type: '(value: string) => void', required: false, desc: 'Called after internal update on edit.' },
      { name: 'onValidationErrors', type: '(errors: ValidationError[]) => void', required: false, desc: 'Called after internal update when errors change.' },
    ],
  },
];

const API_SOURCE_OF_TRUTH = 'src/components/JsonSchemaEditor/types.ts';

export function ApiReference() {
  return (
    <section className="api-reference" aria-labelledby="api-heading">
      <h2 id="api-heading">API Reference</h2>
      <p className="api-source-note">
        Full JSDoc in <code>{API_SOURCE_OF_TRUTH}</code>. Summary below.
      </p>
      {apiSections.map((section) => (
        <div key={section.title} className="api-section">
          <h3>{section.title}</h3>
          <p className="api-desc">{section.description}</p>
          {section.props.length > 0 && (
            <table className="api-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {section.props.map((p) => (
                  <tr key={p.name}>
                    <td><code>{p.name}</code></td>
                    <td><code>{p.type}</code></td>
                    <td>{p.required ? 'Yes' : 'No'}</td>
                    <td>{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
      <div className="api-section">
        <h3>Usage with useSchemaEditor (spreadable)</h3>
        <pre className="api-code">{`import { JsonSchemaEditor, useSchemaEditor } from 'react-scheme-aware';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    count: { type: 'integer', minimum: 0 }
  },
  required: ['name']
};

function MyForm() {
  const schemaEditor = useSchemaEditor({
    initialValue: '{}',
    schema,
    onChange: (value) => console.log('Changed', value),
    onValidationErrors: (errors) => { /* optional */ },
  });

  return (
    <>
      <JsonSchemaEditor {...schemaEditor} height="300px" />
      {schemaEditor.errors.length > 0 && (
        <ul>
          {schemaEditor.errors.map((e, i) => (
            <li key={i}>{e.message} (line {e.line})</li>
          ))}
        </ul>
      )}
    </>
  );
}`}</pre>
      </div>
      <div className="api-section">
        <h3>Usage without hook (controlled)</h3>
        <pre className="api-code">{`import { useState } from 'react';
import { JsonSchemaEditor } from 'react-scheme-aware';

function MyForm() {
  const [json, setJson] = useState('{}');
  const [errors, setErrors] = useState([]);
  return (
    <JsonSchemaEditor
      value={json}
      onChange={setJson}
      schema={schema}
      onValidationErrors={setErrors}
      height="300px"
    />
  );
}`}</pre>
      </div>
    </section>
  );
}
