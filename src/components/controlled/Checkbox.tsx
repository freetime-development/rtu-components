import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { BaseCheckbox, BaseCheckboxProps } from '../base';
import { Validation } from '../types';
import { Field } from '../composed';
import { useFormError } from '@/utils';

interface Props
  extends Omit<
    BaseCheckboxProps,
    'defaultValue' | 'ref' | 'onChange' | 'checked'
  > {
  name: string;
  label?: string;
  validation?: Validation;
  defaultValue?: boolean | null;
  fieldClassName?: string;
  inputClassName?: string;
  errorBorder?: boolean;
}

export const Checkbox: FC<Props> = ({
  name,
  label,
  validation,
  defaultValue,
  fieldClassName,
  inputClassName,
  errorBorder,
  disabled,
  onFocus,
  ...rest
}) => {
  const rules = validation?.rules;
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <Field name={name} label={label} className={fieldClassName}>
            <BaseCheckbox
              ref={field.ref}
              id={name}
              name={name}
              label={label}
              className={inputClassName}
              checked={field.value}
              disabled={disabled}
              error={errorBorder ? Boolean(error) : false}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onFocus={onFocus}
              {...rest}
            />
          </Field>
        );
      }}
    />
  );
};
