import { ReactNode, useCallback } from 'react';
import { useController } from 'react-hook-form';
import {
  Category,
  BaseSelect,
  Field,
  Option,
  Validation,
  useSelect,
  BaseSelectProps,
  FieldProps,
} from '@/components';
import { useFormError } from '@/utils';

type SelectProps<O> = Omit<
  BaseSelectProps,
  'value' | 'onChange' | 'setQuery' | 'clear'
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

export function Select<O extends Option>({
  name,
  isLoading,
  disabled,
  options,
  categories,
  placeholder = 'Select',
  fieldClassName,
  containerClassName,
  inputClassName,
  initialQuery,
  tooltip,
  errorBorder,
  valueAs = 'string',
  validation,
  defaultValue = '',
  label,
  onChange,
  async,
  hint,
  renderHint,
  renderError,
  ...rest
}: SelectProps<O>) {
  const rules = validation?.rules;
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);
  const { field } = useController({ name, rules, defaultValue });
  const selectedOption = options.find(o => o.value === field.value);
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
    <Field
      name={name}
      label={label}
      tooltip={tooltip}
      error={error}
      renderError={renderError}
      hint={hint}
      renderHint={renderHint}
      className={fieldClassName}
    >
      <BaseSelect
        ref={field.ref}
        name={name}
        error={errorBorder ? Boolean(error) : false}
        placeholder={placeholder}
        options={filteredOptions}
        value={!selectedOption?.value ? '' : String(selectedOption.value)}
        onChange={handleOnChange}
        setQuery={setQuery}
        clear={clear}
        {...rest}
      />
    </Field>
  );
}
