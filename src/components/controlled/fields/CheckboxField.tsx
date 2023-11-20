import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  BaseCheckboxField,
  BaseCheckboxFieldProps,
} from '@/components/base/fields';
import { Validation } from '@/components/types';

export type CheckboxFieldProps = Omit<
  BaseCheckboxFieldProps,
  'defaultValue' | 'ref' | 'onChange' | 'checked'
> & {
  name: string;
  validation?: Validation;
  defaultValue?: boolean | null;
  fieldClassName?: string;
  inputClassName?: string;
  errorBorder?: boolean;
};

export const CheckboxField: FC<CheckboxFieldProps> = ({
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
          <BaseCheckboxField
            ref={field.ref}
            id={name}
            name={name}
            className={inputClassName}
            checked={field.value}
            error={error}
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

CheckboxField.displayName = 'CheckboxField';
