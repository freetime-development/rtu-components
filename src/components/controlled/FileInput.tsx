import { useController } from 'react-hook-form';
import {
  Field,
  Validation,
  FieldProps,
  BaseFileInput,
  BaseFileInputProps,
} from '..';
import { useFormError } from '@/utils';

type FileInputProps = Omit<
  BaseFileInputProps,
  'ref' | 'onChange' | 'defaultValue' | 'value'
> &
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
  const { field } = useController({ name, rules, defaultValue: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange', e.target.files);
    const files = Array.from(e.target.files ?? []);

    field.onChange(files);
  };

  const handleRemoveFile = (id: string) => {
    const files = field.value.filter((file: File) => file.name !== id);

    field.onChange(files);
  };

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
        onChange={handleChange}
        removeFile={handleRemoveFile}
        onBlur={field.onBlur}
        onFocus={onFocus}
        {...rest}
      />
    </Field>
  );
};

FileInput.displayName = 'Input';
