import type { JSONSchema } from '../components/JsonSchemaEditor';

export const personSchema: JSONSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Person',
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      description: 'Full name',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'Email address',
    },
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 150,
      description: 'Age in years',
    },
    role: {
      type: 'string',
      enum: ['admin', 'editor', 'viewer'],
      default: 'viewer',
      description: 'User role',
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
      description: 'Optional tags',
    },
  },
  additionalProperties: false,
};

export const configSchema: JSONSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'App configuration',
  type: 'object',
  properties: {
    appName: { type: 'string', default: 'My App' },
    debug: { type: 'boolean', default: false },
    port: { type: 'integer', minimum: 1, maximum: 65535, default: 3000 },
    features: {
      type: 'object',
      properties: {
        darkMode: { type: 'boolean' },
        analytics: { type: 'boolean' },
      },
    },
  },
};

export const samplePersonJson = `{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 28,
  "role": "editor",
  "tags": ["demo", "user"]
}`;

export const invalidPersonJson = `{
  "name": "",
  "email": "not-an-email",
  "age": -5,
  "role": "superuser",
  "unknownField": true
}`;

export const sampleConfigJson = `{
  "appName": "Demo App",
  "debug": true,
  "port": 8080,
  "features": {
    "darkMode": true,
    "analytics": false
  }
}`;
