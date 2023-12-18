import { ReactNode, useCallback } from 'react';
import { useController } from 'react-hook-form';
import {
  Category,
  Option,
  Validation,
  useSelect,
  FieldProps,
  BaseSelectField,
  BaseSelectFieldProps,
} from '@/components';
import { useFormError } from '@/utils';

type SelectFieldProps<O> = Omit<
  BaseSelectFieldProps,
  'value' | 'onChange' | 'onBlur' | 'clear' | 'ref'
> &
  FieldProps & {
    name: string;
    isLoading?: boolean;
    options: O[];
    categories?: Category[];
    fieldClassName?: string;
    containerClassName?: string;
    inputClassName?: string;
    tooltip?: string | null;
    initialQuery?: string;
    errorBorder?: boolean;
    valueAs?: 'string' | 'number';
    validation?: Validation;
    defaultValue?: string | number | null;
    onChange?: (value: string) => void;
    async?: boolean;
    LoadingIcon?: ReactNode;
    ClearIcon?: ReactNode;
    DefaultIcon?: ReactNode;
  };

export function SelectField<O extends Option>({
  name,
  isLoading,
  options,
  categories,
  inputClassName,
  initialQuery,
  errorBorder,
  valueAs = 'string',
  validation,
  defaultValue = '',
  onChange,
  async,
  ...rest
}: SelectFieldProps<O>) {
  const rules = validation?.rules;
  const error = useFormError(name);
  const { field } = useController({ name, rules, defaultValue });
  const selectedOption = options?.find(o => o.value === field.value);
  const { filteredOptions, setQuery, clear } = useSelect<O>(
    name,
    initialQuery,
    options,
    field.onChange,
    categories,
    onChange,
    async,
  );

  const handleOnChange = useCallback(
    (value: string) => {
      if (valueAs === 'number') {
        field.onChange(parseInt(value, 10));
      } else {
        field.onChange(value);
      }
    },
    [field, valueAs],
  );

  return (
    <BaseSelectField
      name={name}
      ref={field.ref}
      error={error}
      className={inputClassName}
      options={filteredOptions}
      value={!selectedOption?.value ? '' : String(selectedOption.value)}
      onChange={handleOnChange}
      setQuery={setQuery}
      clear={clear}
      {...rest}
    />
  );
}

SelectField.displayName = 'SelectField';
