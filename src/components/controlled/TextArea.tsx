import { Controller } from 'react-hook-form';
import { Validation, BaseTextAreaProps, BaseTextArea } from '..';
import { useFormError } from '@/utils';

type TextAreaProps = Omit<
  BaseTextAreaProps,
  'defaultValue' | 'ref' | 'onChange' | 'onBlur'
> & {
  name: string;
  validation?: Validation;
  defaultValue?: string | null;
  inputClassName?: string;
  errorBorder?: boolean;
};

export const TextArea = ({
  inputClassName,
  type = 'text',
  name,
  validation,
  defaultValue,
  errorBorder,
  ...rest
}: TextAreaProps) => {
  const rules = validation?.rules;
  const error = useFormError(name);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <BaseTextArea
            name={name}
            type={type}
            value={field.value}
            ref={field.ref}
            error={Boolean(error)}
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

TextArea.displayName = 'TextArea';
