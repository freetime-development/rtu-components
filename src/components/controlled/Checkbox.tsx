import { FC, ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import { BaseCheckbox, BaseCheckboxProps } from '../base';
import { Validation } from '../types';
import { Field, FieldProps } from '../composed';
import { useFormError } from '@/utils';

type CheckboxProps = FieldProps &
  Omit<BaseCheckboxProps, 'defaultValue' | 'ref' | 'onChange' | 'checked'> & {
    name: string;
    label?: string;
    validation?: Validation;
    defaultValue?: boolean | null;
    fieldClassName?: string;
    inputClassName?: string;
    errorBorder?: boolean;
    renderLabel?: () => ReactNode;
  };

export const Checkbox: FC<CheckboxProps> = ({
  name,
  label,
  validation,
  defaultValue,
  fieldClassName,
  inputClassName,
  errorBorder,
  disabled,
  onFocus,
  hint,
  renderHint,
  renderError,
  renderLabel,
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
          <Field
            name={name}
            // label={label}
            error={error}
            renderError={renderError}
            hint={hint}
            renderHint={renderHint}
            className={`relative flex flex-row items-baseline justify-start gap-2 ${fieldClassName}`}
          >
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
            {renderLabel ? (
              renderLabel()
            ) : (
              <span className="relative top-[-3px] w-full flex-1 break-words text-black dark:text-white">
                {label}
              </span>
            )}
          </Field>
        );
      }}
    />
  );
};
