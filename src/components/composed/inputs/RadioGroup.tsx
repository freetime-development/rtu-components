import { RefCallback, useCallback } from 'react';
import { useController } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  Field,
  FieldProps,
  Option,
  RadioOption,
  RadioOptionProps,
  Validation,
} from '@/components';

interface RenderRadioOptionProps extends Omit<RadioOptionProps, 'onChange'> {
  onChange: (value: string | null) => void;
}

export type RadioGroupProps<O extends Option> = FieldProps & {
  options: O[];
  tooltip?: string | null;
  fieldClassName?: string;
  disabled?: boolean;
  name: string;
  label?: string;
  validation?: Validation;
  defaultValue?: string | null;
  renderOption?: <T>(
    props: RenderRadioOptionProps & O,
    ref: RefCallback<T> | null,
  ) => React.ReactNode;
};

export function RadioGroup<O extends Option>({
  options,
  tooltip,
  defaultValue = null,
  fieldClassName,
  validation,
  name,
  label,
  disabled,
  renderOption,
  hint,
  renderHint,
  renderError,
}: RadioGroupProps<O>) {
  const rules = validation?.rules;
  const error = useFormError(name);
  const { field } = useController({
    name,
    rules,
    defaultValue,
  });
  const { ref, value, onChange } = field;

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    [onChange],
  );

  const handleChange = useCallback(
    (value: string | null) => {
      if (value) {
        onChange(value);
      } else {
        onChange(null);
      }
    },
    [onChange],
  );

  const clear = useCallback(() => {
    onChange(null);
  }, [onChange]);

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
      <div className={'flex flex-col gap-2'}>
        {options.map((option, i) => {
          if (renderOption) {
            return renderOption(
              {
                ...option,
                name,
                onChange: handleChange,
                clear,
                disabled,
                checked: value === option.value,
              },
              i === 0 ? ref : null,
            );
          }

          return (
            <RadioOption
              ref={i === 0 ? ref : null}
              key={option.label}
              label={option.label}
              disabled={disabled}
              name={name}
              value={option.value}
              onChange={handleOnChange}
              checked={value === option.value}
              clear={clear}
            />
          );
        })}
      </div>
    </Field>
  );
}

RadioGroup.displayName = 'RadioGroup';
