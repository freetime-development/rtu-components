import { useCallback } from 'react';
import { useController } from 'react-hook-form';
import {
  FadeIn,
  Field,
  Option,
  OptionBox,
  Validation,
  getReplicaName,
  useReplicaIndexContext,
} from '@/components';
import { useFormError } from '@/utils';

interface OptionGroupProps {
  options: Option[];
  name: string;
  label: string;
  tooltip?: string | null;
  disabled?: boolean;
  className?: string;
  exclusiveAnswer?: string;
  defaultValue: string[];
  validation: Validation;
}

export const OptionGroup = ({
  options = [],
  tooltip,
  className,
  name,
  label,
  defaultValue,
  exclusiveAnswer,
  validation,
  disabled,
}: OptionGroupProps) => {
  const replicaIndex = useReplicaIndexContext();
  const rules = validation?.rules;
  const errorMessage = validation?.errorMessage;
  const error = useFormError(name, errorMessage);
  const { field } = useController({
    name,
    rules,
    defaultValue,
  });
  const { ref, onChange, value } = field;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
      let newValue = [];
      if (e.target.checked) {
        newValue = [...value, option];
      } else {
        newValue = value.filter((v: string) => v !== option);
      }

      if (exclusiveAnswer && newValue.includes(exclusiveAnswer)) {
        onChange([exclusiveAnswer]);
      } else {
        onChange(newValue);
      }
    },
    [value, onChange],
  );

  return (
    <Field
      name={name}
      label={label}
      error={error}
      tooltip={tooltip}
      className={className}
    >
      {options.map((option, i) => (
        <FadeIn key={String(option.value)}>
          <OptionBox
            ref={i === 0 ? ref : null}
            name={String(option.value)}
            label={option.label}
            disabled={disabled}
            className="py-2"
            onChange={handleChange}
            checked={value.includes(
              getReplicaName(String(option.value), replicaIndex),
            )}
          />
        </FadeIn>
      ))}
    </Field>
  );
};

OptionGroup.displayName = 'OptionGroup';
