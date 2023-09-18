import classNames from 'classnames';
import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Validation } from '../../types';
import { useFormError } from '@/utils';
import { Field } from '@/components';

interface BooleanProps {
  className?: string;
  name: string;
  label: string;
  validation: Validation;
  disabled?: boolean;
  defaultValue?: boolean | null;
  onChange?: (value: boolean) => void;
  state?: boolean | null;
  tooltip?: string | null;
  options?: { label: string; value: string }[];
}

const defaultOptions = [
  {
    label: 'Yes',
    value: 'true',
  },
  {
    label: 'No',
    value: 'false',
  },
];

export const Boolean = ({
  className,
  name,
  defaultValue,
  label,
  validation,
  onChange,
  state,
  disabled,
  tooltip,
  options = defaultOptions,
}: BooleanProps) => {
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);
  const { rules } = validation;
  const { watch } = useFormContext();
  const formValue = watch(name);

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Field
            name={field.name}
            error={error}
            label={label}
            tooltip={tooltip}
            className={className}
          >
            <div className={classNames('flex flex-col sm:flex-row')}>
              {options.map(option => (
                <Radio
                  key={option.label}
                  ref={field.ref}
                  label={option.label}
                  name={field.name}
                  disabled={disabled}
                  value={option.value}
                  onChange={onChange ?? field.onChange}
                  state={state ?? formValue}
                />
              ))}
            </div>
          </Field>
        );
      }}
    />
  );
};

interface RadioProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: boolean) => void;
  state: boolean;
  disabled?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, value, onChange, state, disabled }, ref) => {
    const id = `${name}:${value}`;
    const bool = getBoolean(value);

    function handleOnChange() {
      onChange(getBoolean(value));
    }

    return (
      <label
        htmlFor={id}
        className="my-1 ml-2 cursor-pointer select-text rounded-xl bg-gray-9/10 px-4 py-3 text-gray-9"
      >
        <div className="flex items-center">
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            checked={state === bool}
            type="radio"
            onChange={handleOnChange}
            value={value}
            className="relative h-4 w-4 appearance-none rounded-full border border-gray-9/20 checked:border-black focus:ring-1"
          />
          <span className="ml-1 flex-1 text-sm font-semibold">{label}</span>
        </div>
      </label>
    );
  },
);

Radio.displayName = 'Radio';

export function getBoolean(value: string) {
  return value === 'true';
}
