import { FC, forwardRef } from 'react';
import { BaseTextArea, BaseTextAreaProps } from '..';
import { FieldProps } from '../../composed';
import { Field } from '../inputs/Field';

export type BaseTextAreaFieldProps = FieldProps &
  Omit<BaseTextAreaProps, 'ref' | 'error' | 'className'> & {
    fieldClassName?: string;
  };

export const BaseTextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseTextAreaFieldProps
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
        <BaseTextArea
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
