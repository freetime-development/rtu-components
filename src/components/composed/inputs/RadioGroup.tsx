import classNames from 'classnames';
import { RefCallback, useCallback } from 'react';
import { useController } from 'react-hook-form';
import { useFormError } from '@/utils';
import {
  Field,
  Option,
  RadioOption,
  RadioOptionProps,
  Validation,
} from '@/components';

interface RenderRadioOptionProps extends Omit<RadioOptionProps, 'onChange'> {
  onChange: (value: string | null) => void;
}

interface RadioGroupProps<O> {
  options: O[];
  tooltip?: string | null;
  className?: string;
  disabled?: boolean;
  name: string;
  label?: string;
  validation?: Validation;
  defaultValue?: string[] | null;
  renderOption?: <T>(
    props: RenderRadioOptionProps & O,
    ref: RefCallback<T> | null,
  ) => React.ReactNode;
}

export function RadioGroup<O extends Option>({
  options,
  tooltip,
  defaultValue,
  className,
  validation,
  name,
  label,
  disabled,
  renderOption,
}: RadioGroupProps<O>) {
  const rules = validation?.rules;
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);
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
        onChange([value]);
      } else {
        onChange([]);
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
      error={error}
      label={label}
      tooltip={tooltip}
      className={className}
    >
      <div className={classNames('flex flex-col')}>
        {options.map((option, i) => {
          if (renderOption) {
            return renderOption(
              {
                ...option,
                name,
                onChange: handleChange,
                clear,
                disabled,
                checked: value === null ? false : value?.includes(option.value),
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
              checked={value === null ? false : value?.includes(option.value)}
              clear={clear}
            />
          );
        })}
      </div>
    </Field>
  );
}

RadioGroup.displayName = 'RadioGroup';
