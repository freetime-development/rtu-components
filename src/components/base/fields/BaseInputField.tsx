import { forwardRef } from 'react';
import { BaseInput, BaseInputProps } from '..';
import { FieldProps } from '../../composed';
import { Field } from '../inputs/Field';

export type BaseInputFieldProps = FieldProps &
  Omit<BaseInputProps, 'ref' | 'error'> & {
    fieldClassName?: string;
  };

export const BaseInputField = forwardRef<HTMLInputElement, BaseInputFieldProps>(
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
        <BaseInput
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
