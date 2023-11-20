import { useController } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  BaseFileInputFieldProps,
  BaseFileInputField,
} from '@/components/base/fields';
import { Validation } from '@/components/types';

export type FileInputFieldProps = Omit<
  BaseFileInputFieldProps,
  'ref' | 'onChange' | 'defaultValue' | 'value'
> & {
  name: string;
  validation?: Validation;
  tooltip?: string | null;
  fieldClassName?: string;
  inputClassName?: string;
  errorBorder?: boolean;
  aggregate?: boolean;
};

export const FileInputField = ({
  inputClassName,
  type = 'text',
  name,
  validation,
  errorBorder,
  aggregate,
  ...rest
}: FileInputFieldProps) => {
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
    <BaseFileInputField
      name={name}
      id={name}
      type={type}
      ref={field.ref}
      error={error}
      value={field.value}
      className={inputClassName}
      onChange={handleChange}
      removeFile={handleRemoveFile}
      onBlur={field.onBlur}
      {...rest}
    />
  );
};

FileInputField.displayName = 'FileInputField';
