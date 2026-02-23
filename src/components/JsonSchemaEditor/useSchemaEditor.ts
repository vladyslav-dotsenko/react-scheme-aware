import { useCallback, useEffect, useState } from 'react';
import type { UseSchemaEditorOptions, UseSchemaEditorReturn, ValidationError } from './types';

/**
 * Encapsulates state for the JSON schema editor: value and validation errors.
 * Invokes optional onChange and onValidationErrors when provided.
 * Reacts to initialValue changes (e.g. when switching presets).
 * Return value is spreadable onto JsonSchemaEditor.
 */
export function useSchemaEditor(options: UseSchemaEditorOptions): UseSchemaEditorReturn {
  const {
    initialValue,
    schema,
    onChange: onChangeCallback,
    onValidationErrors: onValidationErrorsCallback,
  } = options;

  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      onChangeCallback?.(nextValue);
    },
    [onChangeCallback]
  );

  const onValidationErrors = useCallback(
    (nextErrors: ValidationError[]) => {
      setErrors(nextErrors);
      onValidationErrorsCallback?.(nextErrors);
    },
    [onValidationErrorsCallback]
  );

  return {
    value,
    onChange,
    onValidationErrors,
    schema,
    errors,
  };
}
