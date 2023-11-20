import { useController } from 'react-hook-form';
import { Validation, FieldProps, BaseFileInputProps, BaseFileInput } from '..';
import { useFormError } from '@/utils';

type FileInputProps = Omit<
  BaseFileInputProps,
  'ref' | 'onChange' | 'defaultValue' | 'value'
> &
  FieldProps & {
    name: string;
    validation?: Validation;
    inputClassName?: string;
    errorBorder?: boolean;
    aggregate?: boolean;
  };

export const FileInput = ({
  inputClassName,
  type = 'text',
  name,
  validation,
  errorBorder,
  aggregate,
  ...rest
}: FileInputProps) => {
  const rules = validation?.rules;
  const error = useFormError(name);
  const { field } = useController({ name, rules, defaultValue: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const newFiles = aggregate ? [...field.value, ...files] : files;
    field.onChange(newFiles);
  };

  const handleRemoveFile = (id: string) => {
    const files = field.value.filter((file: File) => file.name !== id);

    field.onChange(files);
  };

  return (
    <BaseFileInput
      name={name}
      id={name}
      type={type}
      ref={field.ref}
      error={Boolean(error)}
      value={field.value}
      className={inputClassName}
      onChange={handleChange}
      removeFile={handleRemoveFile}
      onBlur={field.onBlur}
      {...rest}
    />
  );
};

FileInput.displayName = 'FileInput';
