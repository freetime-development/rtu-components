import { Controller } from 'react-hook-form';
import { BaseInput, Field, Validation, BaseInputProps } from '..';
import { useFormError } from '@/utils';

interface InputProps
  extends Omit<BaseInputProps, 'defaultValue' | 'ref' | 'className'> {
  name: string;
  validation?: Validation;
  defaultValue?: string | number | null;
  tooltip?: string | null;
  Icon?: () => JSX.Element;
  containerClassName?: string;
  inputClassName?: string;
}

export const Input = ({
  placeholder,
  Icon,
  tooltip,
  containerClassName,
  inputClassName,
  disabled,
  type = 'text',
  name,
  validation,
  defaultValue,
  label,
  onFocus,
  ...rest
}: InputProps) => {
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
          <Field
            name={name}
            label={label ?? name}
            error={error}
            tooltip={tooltip}
            className={containerClassName}
          >
            <BaseInput
              ref={field.ref}
              id={name}
              type={type}
              name={name}
              className={inputClassName}
              value={field.value}
              disabled={disabled}
              placeholder={placeholder}
              Icon={Icon}
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

Input.displayName = 'Input';
