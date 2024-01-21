import { ReactElement, Ref, forwardRef } from 'react';
import { BaseMultiSelect, BaseMultiSelectProps } from '..';
import { FieldProps } from '../../composed';
import { Field } from '../inputs/Field';
import { Option } from '@/components/types';

export type BaseMultiSelectFieldProps<O extends Option> = FieldProps &
  Omit<BaseMultiSelectProps<O>, 'ref' | 'error'> & {
    fieldClassName?: string;
  };

function BaseMultiSelectFieldComponent<O extends Option>({
  id,
  name,
  fieldClassName = '',
  label,
  renderLabel,
  hint,
  renderHint,
  error,
  renderError,
  tooltip,
  ...rest
}: BaseMultiSelectFieldProps<O>) {
  return (
    <Field
      id={id ?? name}
      name={name}
      className={fieldClassName}
      label={label}
      renderLabel={renderLabel}
      error={error}
      renderError={renderError}
      hint={hint}
      renderHint={renderHint}
      tooltip={tooltip}
    >
      <BaseMultiSelect
        id={id ?? name}
        name={name}
        error={Boolean(error)}
        {...rest}
      />
    </Field>
  );
}

export const BaseMultiSelectField = forwardRef(
  BaseMultiSelectFieldComponent,
) as <O extends Option>(
  p: BaseMultiSelectFieldProps<O> & { ref?: Ref<HTMLSelectElement> },
) => ReactElement;
