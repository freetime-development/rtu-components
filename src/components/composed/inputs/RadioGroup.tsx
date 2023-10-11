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

interface RadioGroupProps {
  options: Option[];
  tooltip?: string | null;
  className?: string;
  disabled?: boolean;
  name: string;
  label: string;
  validation: Validation;
  defaultValue: string[] | null;
  renderOption?: <T>(
    props: RadioOptionProps,
    ref: RefCallback<T> | null,
  ) => React.ReactNode;
}

export const RadioGroup = ({
  options,
  tooltip,
  defaultValue,
  className,
  validation,
  name,
  label,
  disabled,
  renderOption,
}: RadioGroupProps) => {
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
      if (e.target.value) {
        onChange([e.target.value]);
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
                onChange: handleOnChange,
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
};

RadioGroup.displayName = 'RadioGroup';
