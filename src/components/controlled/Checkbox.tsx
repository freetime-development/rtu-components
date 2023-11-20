import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { BaseCheckbox, BaseCheckboxProps } from '../base';
import { Validation } from '../types';
import { useFormError } from '@/utils';

export type CheckboxProps = Omit<
  BaseCheckboxProps,
  'defaultValue' | 'ref' | 'onChange' | 'checked'
> & {
  name: string;
  validation?: Validation;
  defaultValue?: boolean | null;
  inputClassName?: string;
  errorBorder?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({
  name,
  validation,
  defaultValue,
  fieldClassName = '',
  inputClassName = '',
  errorBorder,
  ...rest
}) => {
  const rules = validation?.rules;
  const error = useFormError(name);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <BaseCheckbox
            ref={field.ref}
            id={name}
            name={name}
            className={inputClassName}
            checked={field.value}
            error={Boolean(error)}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...rest}
          />
        );
      }}
    />
  );
};

Checkbox.displayName = 'Checkbox';
