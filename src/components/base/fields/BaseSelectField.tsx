import { FC, ForwardedRef, ReactElement, forwardRef } from 'react';
import { BaseSelect, BaseSelectProps } from '..';
import { FieldProps, Field } from '../inputs/Field';
import { Option } from '@/components/types';

export type BaseSelectFieldProps<O extends Option> = FieldProps &
  Omit<BaseSelectProps<O>, 'ref' | 'error'> & {
    fieldClassName?: string;
  };

export const BaseSelectField = forwardRef(
  <O extends Option>(
    {
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
    }: BaseSelectFieldProps<O>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
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
        <BaseSelect<O>
          id={id ?? name}
          name={name}
          ref={ref}
          error={Boolean(error)}
          {...rest}
        />
      </Field>
    );
  },
) as <O extends Option>(
  p: BaseSelectFieldProps<O> & { ref?: ForwardedRef<HTMLInputElement> },
) => ReactElement;
