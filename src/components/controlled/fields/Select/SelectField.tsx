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

export type SelectFieldProps<O> = Omit<
  BaseSelectFieldProps,
  'value' | 'onChange' | 'onBlur' | 'clear' | 'ref' | 'onSelect'
> &
  FieldProps & {
    name: string;
    isLoading?: boolean;
    options: O[];
    categories?: Category[];
    initialQuery?: string;
    errorBorder?: boolean;
    valueAs?: 'string' | 'number';
    validation?: Validation;
    defaultValue?: string | number | null;
    onQueryChange?: (value: string) => void;
    onSelect?: (value: string | number | null) => void;
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
  initialQuery,
  errorBorder,
  valueAs = 'string',
  validation,
  defaultValue = '',
  onQueryChange,
  onSelect,
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
    onQueryChange,
    async,
  );

  const handleOnChange = useCallback(
    (value: string) => {
      if (valueAs === 'number') {
        const numberValue = parseInt(value, 10);
        field.onChange(numberValue);
        onSelect?.(numberValue);
      } else {
        field.onChange(value);
        onSelect?.(value);
      }
    },
    [field, valueAs],
  );

  return (
    <BaseSelectField
      name={name}
      ref={field.ref}
      error={error}
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
