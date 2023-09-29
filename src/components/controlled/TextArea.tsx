import { Controller } from 'react-hook-form';
import {
  Field,
  Validation,
  FieldProps,
  BaseTextAreaProps,
  BaseTextArea,
} from '..';
import { useFormError } from '@/utils';

type BaseAreaProps = Omit<
  BaseTextAreaProps,
  'defaultValue' | 'ref' | 'className'
> &
  FieldProps & {
    name: string;
    validation?: Validation;
    defaultValue?: string | null;
    tooltip?: string | null;
    fieldClassName?: string;
    containerClassName?: string;
    inputClassName?: string;
    errorBorder?: boolean;
  };

export const TextArea = ({
  placeholder,
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
  Error,
  hint,
  Hint,
  ...rest
}: BaseAreaProps) => {
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
            Error={Error}
            hint={hint}
            Hint={Hint}
            tooltip={tooltip}
            className={fieldClassName}
          >
            <BaseTextArea
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

TextArea.displayName = 'TextArea';
