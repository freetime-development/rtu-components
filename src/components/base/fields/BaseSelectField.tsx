import { FC, forwardRef } from 'react';
import { BaseSelect, BaseSelectProps } from '..';
import { FieldProps, Field } from '../inputs/Field';

export type BaseSelectFieldProps = FieldProps &
  Omit<BaseSelectProps, 'ref' | 'error'> & {
    fieldClassName?: string;
  };

export const BaseSelectField = forwardRef<
  HTMLSelectElement,
  BaseSelectFieldProps
>(
  ({
    id,
    name,
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
        <BaseSelect
          id={id ?? name}
          name={name}
          error={Boolean(error)}
          {...rest}
        />
      </Field>
    );
  },
);
