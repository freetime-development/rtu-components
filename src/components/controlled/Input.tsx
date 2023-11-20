import { Controller } from 'react-hook-form';
import { Validation, BaseInputProps, FieldProps, BaseInput } from '..';
import { useFormError } from '@/utils';

export type InputProps = Omit<
  BaseInputProps,
  'defaultValue' | 'ref' | 'className' | 'onChange'
> &
  FieldProps & {
    name: string;
    validation?: Validation;
    defaultValue?: string | number | null;
    inputClassName?: string;
    errorBorder?: boolean;
  };

export const Input = ({
  inputClassName,
  type = 'text',
  name,
  validation,
  defaultValue,
  errorBorder,
  ...rest
}: InputProps) => {
  const rules = validation?.rules;
  const error = useFormError(name);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <BaseInput
            name={name}
            error={Boolean(error)}
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

Input.displayName = 'Input';
