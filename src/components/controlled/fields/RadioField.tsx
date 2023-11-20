import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useFormError } from '@/utils';
import { BaseRadioFieldProps, BaseRadioField } from '@/components/base/fields';
import { Validation } from '@/components/types';

export type RadioFieldProps = Omit<
  BaseRadioFieldProps,
  'defaultValue' | 'ref' | 'onChange' | 'checked' | 'value'
> & {
  name: string;
  label?: string;
  validation?: Validation;
  defaultValue?: boolean | null;
  fieldClassName?: string;
  inputClassName?: string;
  errorBorder?: boolean;
};

export const RadioField: FC<RadioFieldProps> = ({
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
          <BaseRadioField
            ref={field.ref}
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

RadioField.displayName = 'RadioField';
