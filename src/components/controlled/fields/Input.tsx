import { Controller } from 'react-hook-form';
import { useFormError } from '@/utils';
import { FieldProps } from '@/components/composed';
import { BaseInputFieldProps, BaseInputField } from '@/components/base/fields';
import { Validation } from '@/components/types';

export type InputFieldProps = Omit<
  BaseInputFieldProps,
  'defaultValue' | 'ref' | 'className' | 'onChange'
> &
  FieldProps & {
    name: string;
    validation?: Validation;
    defaultValue?: string | number | null;
    tooltip?: string | null;
    fieldClassName?: string;
    inputClassName?: string;
    errorBorder?: boolean;
  };

export const InputField = ({
  fieldClassName,
  inputClassName,
  type = 'text',
  name,
  validation,
  defaultValue,
  errorBorder,
  ...rest
}: InputFieldProps) => {
  const rules = validation?.rules;
  const error = useFormError(name);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <BaseInputField
            name={name}
            error={error}
            fieldClassName={fieldClassName}
            ref={field.ref}
            id={name}
            type={type}
            className={inputClassName}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...rest}
          />
        );
      }}
    />
  );
};

InputField.displayName = 'InputField';
