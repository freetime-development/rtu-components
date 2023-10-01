import { useCallback } from 'react';
import { useController } from 'react-hook-form';
import {
  Category,
  ComboBox,
  Field,
  Option,
  Validation,
  useSelect,
} from '@/components';
import { useFormError } from '@/utils';

interface SelectProps {
  name: string;
  label?: string;
  isLoading?: boolean;
  disabled?: boolean;
  options: Option[];
  categories?: Category[];
  placeholder?: string;
  fieldClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  tooltip?: string | null;
  initialQuery?: string;
  defaultIcon?: string;
  valueAs?: 'string' | 'number';
  validation?: Validation;
  defaultValue?: string[] | string | number | null;
  onChange?: (value: string) => void;
  async?: boolean;
}

export const Select = ({
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
  defaultIcon,
  tooltip,
  valueAs = 'string',
  validation,
  defaultValue,
  label,
  onChange,
  async,
}: SelectProps) => {
  const rules = validation?.rules;
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);
  const { field } = useController({ name, rules, defaultValue });
  const { filteredOptions, setQuery, clear } = useSelect(
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
      error={error}
      tooltip={tooltip}
      className={fieldClassName}
    >
      <ComboBox
        ref={field.ref}
        disabled={disabled}
        isLoading={isLoading}
        options={filteredOptions}
        value={!field.value ? '' : String(field.value)}
        name={name}
        placeholder={placeholder}
        defaultIcon={defaultIcon}
        error={error}
        onChange={handleOnChange}
        setQuery={setQuery}
        clear={clear}
      />
    </Field>
  );
};
