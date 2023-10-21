import { FC, ReactNode, useCallback } from 'react';
import { useController } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  Category,
  Field,
  Option,
  Validation,
  useSelect,
  BaseSelectProps,
  FieldProps,
  Icon,
} from '@/components';
import { Chip } from '@/components/base/buttons/Chip';
import { BaseMultiSelect } from '@/components/base/inputs/BaseSelect/BaseMultiSelect';

type MultiSelectProps = Omit<
  BaseSelectProps,
  'value' | 'onChange' | 'setQuery' | 'clear' | 'renderSelectedOptions'
> &
  FieldProps & {
    name: string;
    isLoading?: boolean;
    options: Option[];
    categories?: Category[];
    placeholder?: string;
    fieldClassName?: string;
    initialQuery?: string;
    validation?: Validation;
    defaultValue?: string[] | string | number | null;
    async?: boolean;
    onChange?: (value: string) => void;
    LoadingIcon?: ReactNode;
    ClearIcon?: ReactNode;
    DefaultIcon?: ReactNode;
    renderSelectedOptions?: (props: RenderSelectedOptionsProps) => ReactNode;
  };

export interface RenderSelectedOptionsProps {
  selectedOptions: Option[];
  handleRemove: (value: string | null) => void;
}

export const MultiSelect = ({
  name,
  isLoading,
  options,
  categories,
  placeholder = 'Select',
  initialQuery,
  fieldClassName,
  tooltip,
  validation,
  defaultValue = [],
  label,
  async,
  onChange,
  renderSelectedOptions,
  hint,
  renderHint,
  renderError,
  ...rest
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

  const handleRemove = useCallback(
    (value: string | null) => {
      field.onChange(field.value.filter((v: string) => v !== value));
    },
    [field],
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
      <div className="flex flex-col flex-wrap">
        <BaseMultiSelect
          multiple
          ref={field.ref}
          isLoading={isLoading}
          placeholder={placeholder}
          options={filteredOptions}
          highlightedOptions={selectedOptions}
          value={field.value}
          name={name}
          error={error}
          onChange={field.onChange}
          setQuery={setQuery}
          clear={clear}
          renderSelectedOptions={
            renderSelectedOptions
              ? () => renderSelectedOptions({ selectedOptions, handleRemove })
              : () => (
                  <RenderChipOptions
                    selectedOptions={selectedOptions}
                    handleRemove={handleRemove}
                  />
                )
          }
          {...rest}
        />
      </div>
    </Field>
  );
};

const RenderChipOptions: FC<RenderSelectedOptionsProps> = ({
  selectedOptions,
  handleRemove,
}) => {
  return (
    <>
      {selectedOptions.map(option => {
        return (
          <Chip key={option.value} onRemove={() => handleRemove(option.value)}>
            {option.label}
            <Icon name="cross" className="ml-2" size="xs" />
          </Chip>
        );
      })}
    </>
  );
};
