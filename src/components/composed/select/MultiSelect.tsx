import { ReactNode, useCallback } from 'react';
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

type MultiSelectProps<O extends Option> = Omit<
  BaseSelectProps,
  'value' | 'onChange' | 'setQuery' | 'clear' | 'renderSelectedOptions'
> &
  FieldProps & {
    name: string;
    isLoading?: boolean;
    options: O[];
    categories?: Category[];
    placeholder?: string;
    errorBorder?: boolean;
    fieldClassName?: string;
    containerClassName?: string;
    initialQuery?: string;
    validation?: Validation;
    defaultValue?: string[] | string | number | null;
    async?: boolean;
    onChange?: (value: string) => void;
    LoadingIcon?: ReactNode;
    ClearIcon?: ReactNode;
    DefaultIcon?: ReactNode;
    renderSelectedOptions?: <O extends Option>(
      props: RenderSelectedOptionsProps<O>,
    ) => ReactNode;
  };

export interface RenderSelectedOptionsProps<O extends Option> {
  selectedOptions: O[];
  handleRemove: (value: O['value']) => void;
}

export function MultiSelect<O extends Option>({
  name,
  isLoading,
  options,
  categories,
  placeholder = 'Select',
  initialQuery,
  fieldClassName,
  tooltip,
  errorBorder,
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
}: MultiSelectProps<O>) {
  const rules = validation?.rules;
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);
  const { field } = useController({ name, rules, defaultValue });
  const selectedOptions = options.filter(
    option => Array.isArray(field.value) && field.value.includes(option.value),
  ) as O[];

  const { filteredOptions, setQuery, clear } = useSelect<O>(
    name,
    initialQuery,
    options,
    categories,
    onChange,
    async,
  );

  const handleRemove = useCallback(
    (value: O['value']) => {
      field.onChange(field.value.filter((v: O['value']) => v !== value));
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
          error={errorBorder ? Boolean(error) : false}
          onChange={field.onChange}
          setQuery={setQuery}
          clear={clear}
          renderSelectedOptions={
            renderSelectedOptions
              ? () =>
                  renderSelectedOptions<O>({ selectedOptions, handleRemove })
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
}

function RenderChipOptions<O extends Option>({
  selectedOptions,
  handleRemove,
}: RenderSelectedOptionsProps<O>) {
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
}
