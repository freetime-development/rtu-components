import { Controller } from 'react-hook-form';
import {
  Field,
  Validation,
  FieldProps,
  BaseFileInput,
  BaseFileInputProps,
} from '..';
import { useFormError } from '@/utils';

type FileInputProps = Omit<BaseFileInputProps, 'ref'> &
  FieldProps & {
    name: string;
    validation?: Validation;
    tooltip?: string | null;
    fieldClassName?: string;
    inputClassName?: string;
    errorBorder?: boolean;
  };

export const FileInput = ({
  placeholder,
  tooltip,
  fieldClassName,
  inputClassName,
  disabled,
  type = 'text',
  name,
  validation,
  defaultValue,
  label,
  errorBorder,
  onFocus,
  Error,
  hint,
  Hint,
  ...rest
}: FileInputProps) => {
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
            error={error}
            Error={Error}
            hint={hint}
            Hint={Hint}
            tooltip={tooltip}
            className={fieldClassName}
          >
            <BaseFileInput
              //   ref={field.ref}
              error={errorBorder ? Boolean(error) : false}
              id={name}
              type={type}
              name={name}
              className={inputClassName}
              value={field.value}
              disabled={disabled}
              placeholder={placeholder}
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

FileInput.displayName = 'Input';
