import { ReactNode, useCallback } from 'react';
import { useController } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  Category,
  Option,
  Validation,
  useSelect,
  FieldProps,
  BaseMultiSelectField,
  BaseMultiSelectFieldProps,
} from '@/components';

export type MultiSelectFieldProps<O extends Option> = Omit<
  BaseMultiSelectFieldProps<O>,
  'value' | 'onChange' | 'setQuery' | 'clear' | 'handleRemove'
> &
  FieldProps & {
    name: string;
    isLoading?: boolean;
    options: O[];
    categories?: Category[];
    errorBorder?: boolean;
    initialQuery?: string;
    validation?: Validation;
    defaultValue?: string[] | string | number | null;
    async?: boolean;
    onQueryChange?: (value: string) => void;
    LoadingIcon?: ReactNode;
    ClearIcon?: ReactNode;
    DefaultIcon?: ReactNode;
  };

export function MultiSelectField<O extends Option>({
  name,
  options,
  categories,
  initialQuery,
  errorBorder,
  validation,
  defaultValue = [],
  async,
  onQueryChange,
  ...rest
}: MultiSelectFieldProps<O>) {
  const rules = validation?.rules;
  const error = useFormError(name);
  const { field } = useController({ name, rules, defaultValue });
  const selectedOptions = options?.filter(
    option => Array.isArray(field.value) && field.value.includes(option.value),
  );

  const { filteredOptions, setQuery, clear } = useSelect<O>(
    name,
    initialQuery,
    options,
    field.onChange,
    categories,
    onQueryChange,
    async,
    true,
  );

  const handleRemove = useCallback(
    (value: O['value']) => {
      field.onChange(field.value.filter((v: O['value']) => v !== value));
    },
    [field],
  );

  return (
    <BaseMultiSelectField
      multiple
      name={name}
      error={error}
      ref={field.ref}
      options={filteredOptions}
      selectedOptions={selectedOptions}
      value={field.value}
      onChange={field.onChange}
      setQuery={setQuery}
      clear={clear}
      handleRemove={handleRemove}
      {...rest}
    />
  );
}

MultiSelectField.displayName = 'MultiSelectField';
