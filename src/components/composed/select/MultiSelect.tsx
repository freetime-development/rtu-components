import classNames from 'classnames';
import { ReactNode, useCallback } from 'react';
import { useController } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  Box,
  Category,
  ComboBox,
  Field,
  Option,
  Validation,
  useSelect,
} from '@/components';

interface MultiSelectProps {
  name: string;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  options: Option[];
  categories?: Category[];
  placeholder?: string;
  tooltip?: string | null;
  initialQuery?: string;
  defaultIcon?: string;
  validation?: Validation;
  defaultValue?: string[] | string | number | null;
  async?: boolean;
  onChange?: (value: string) => void;
  LoadingIcon?: ReactNode;
  ClearIcon?: ReactNode;
  DefaultIcon?: ReactNode;
}

export const MultiSelect = ({
  name,
  isLoading,
  disabled,
  options,
  categories,
  placeholder = 'Select',
  initialQuery,
  defaultIcon,
  tooltip,
  validation,
  defaultValue = [],
  label,
  async,
  onChange,
  LoadingIcon,
  ClearIcon,
  DefaultIcon,
}: MultiSelectProps) => {
  const rules = validation?.rules;
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);
  const { field } = useController({ name, rules, defaultValue });
  const selectedOptions = options.filter(
    option => Array.isArray(field.value) && field.value.includes(option.value),
  );
  const { filteredOptions, setQuery, clear } = useSelect(
    name,
    initialQuery,
    options,
    categories,
    onChange,
    async,
  );
  const value =
    !field.value || (Array.isArray(field.value) && !field.value[0])
      ? ''
      : field.value;

  const handleOnChange = useCallback(
    (value: string) => {
      const alreadyAdded = selectedOptions.find(o => o.value === value);
      if (alreadyAdded) {
        return;
      }
      if (value) {
        field.onChange([...field.value, value]);
      } else {
        field.onChange(field.value.filter((v: string) => v !== value));
      }
    },
    [field, selectedOptions],
  );

  const handleRemove = useCallback(
    (value: string | null) => {
      field.onChange(field.value.filter((v: string) => v !== value));
    },
    [field],
  );

  return (
    <Field name={name} label={label} error={error} tooltip={tooltip}>
      <ComboBox
        ref={field.ref}
        disabled={disabled}
        isLoading={isLoading}
        options={filteredOptions}
        value={value}
        name={name}
        placeholder={placeholder}
        defaultIcon={defaultIcon}
        error={error}
        onChange={handleOnChange}
        setQuery={setQuery}
        clear={clear}
        LoadingIcon={LoadingIcon}
        ClearIcon={ClearIcon}
        DefaultIcon={DefaultIcon}
      />
      <div>
        {selectedOptions.map(option => {
          return (
            <label
              key={option.value}
              htmlFor={name}
              className="my-2 block cursor-pointer"
            >
              <Box className="flex flex-row justify-between rounded-lg bg-gray-9/10 p-3 hover:bg-gray-9/20">
                <button
                  onClick={() => handleRemove(option.value)}
                  className="flex w-full items-center justify-between"
                >
                  {option.icon && (
                    <i
                      className={classNames('mx-2 flex h-6 w-6', option.icon)}
                    />
                  )}
                  <span className="flex-grow text-left text-gray-9">
                    {option.label}
                  </span>
                  <i className="icon-cross ml-3 text-gray-2" />
                </button>
              </Box>
            </label>
          );
        })}
      </div>
    </Field>
  );
};
