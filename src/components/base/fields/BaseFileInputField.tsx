import { FC, forwardRef } from 'react';
import { BaseFileInput, BaseFileInputProps } from '..';
import { FieldProps, Field } from '../inputs/Field';

export type BaseFileInputFieldProps = FieldProps &
  Omit<BaseFileInputProps, 'ref' | 'error'> & {
    fieldClassName?: string;
  };

export const BaseFileInputField = forwardRef<
  HTMLInputElement,
  BaseFileInputFieldProps
>(
  ({
    id,
    name,
    className = '',
    fieldClassName = '',
    label,
    renderLabel,
    hint,
    renderHint,
    error,
    renderError,
    tooltip,
    ...rest
  }) => {
    return (
      <Field
        id={id ?? name}
        name={name}
        className={fieldClassName}
        label={label}
        renderLabel={renderLabel}
        error={error}
        renderError={renderError}
        hint={hint}
        renderHint={renderHint}
        tooltip={tooltip}
      >
        <BaseFileInput
          id={id ?? name}
          name={name}
          className={className}
          error={Boolean(error)}
          {...rest}
        />
      </Field>
    );
  },
);
