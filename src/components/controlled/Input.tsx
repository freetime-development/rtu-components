import { Controller } from 'react-hook-form';
import { BaseInput, Field, Validation, BaseInputProps, FieldProps } from '..';
import { useFormError } from '@/utils';

export type InputProps = Omit<
  BaseInputProps,
  'defaultValue' | 'ref' | 'className' | 'onChange'
> &
  FieldProps & {
    name: string;
    validation?: Validation;
    defaultValue?: string | number | null;
    tooltip?: string | null;
    Icon?: () => JSX.Element;
    fieldClassName?: string;
    containerClassName?: string;
    inputClassName?: string;
    errorBorder?: boolean;
  };

export const Input = ({
  placeholder,
  Icon,
  tooltip,
  fieldClassName,
  containerClassName,
  inputClassName,
  disabled,
  type = 'text',
  name,
  validation,
  defaultValue,
  label,
  errorBorder,
  onFocus,
  renderError,
  hint,
  renderHint,
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
            label={label}
            tooltip={tooltip}
            error={error}
            renderError={renderError}
            hint={hint}
            renderHint={renderHint}
            className={fieldClassName}
          >
            <BaseInput
              ref={field.ref}
              error={errorBorder ? Boolean(error) : false}
              id={name}
              type={type}
              name={name}
              containerClassName={containerClassName}
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
