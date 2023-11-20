import { ReactNode, useCallback } from 'react';
import { useController } from 'react-hook-form';
import {
  Category,
  Option,
  Validation,
  useSelect,
  FieldProps,
  BaseSelect,
  BaseSelectProps,
} from '@/components';
import { useFormError } from '@/utils';

type SelectProps<O> = Omit<
  BaseSelectProps,
  'value' | 'onChange' | 'onBlur' | 'clear' | 'ref'
> &
  FieldProps & {
    name: string;
    isLoading?: boolean;
    options: O[];
    categories?: Category[];
    containerClassName?: string;
    inputClassName?: string;
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

export function Select<O extends Option>({
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
}: SelectProps<O>) {
  const rules = validation?.rules;
  const error = useFormError(name);
  const { field } = useController({ name, rules, defaultValue });
  const selectedOption = options?.find(o => o.value === field.value);
  const { filteredOptions, setQuery, clear } = useSelect<O>(
    name,
    initialQuery,
    options,
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
    <BaseSelect
      name={name}
      ref={field.ref}
      error={Boolean(error)}
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
