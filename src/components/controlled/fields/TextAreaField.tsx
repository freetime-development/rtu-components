import { Controller } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  BaseTextAreaFieldProps,
  BaseTextAreaField,
} from '@/components/base/fields';
import { Validation } from '@/components/types';

export type TextAreaFieldProps = Omit<
  BaseTextAreaFieldProps,
  'defaultValue' | 'ref'
> & {
  name: string;
  validation?: Validation;
  defaultValue?: string | null;
  tooltip?: string | null;
  fieldClassName?: string;
  inputClassName?: string;
  errorBorder?: boolean;
};

export const TextAreaField = ({
  inputClassName,
  fieldClassName,
  type = 'text',
  name,
  validation,
  defaultValue,
  errorBorder,
  ...rest
}: TextAreaFieldProps) => {
  const rules = validation?.rules;
  const error = useFormError(name);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <BaseTextAreaField
            name={name}
            type={type}
            value={field.value}
            ref={field.ref}
            error={error}
            fieldClassName={fieldClassName}
            className={inputClassName}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...rest}
          />
        );
      }}
    />
  );
};

TextAreaField.displayName = 'TextAreaField';
