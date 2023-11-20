import { FC, forwardRef } from 'react';
import { BaseCheckbox, BaseCheckboxProps } from '..';
import { FieldProps } from '../../composed';
import { FieldRow } from '../inputs/Field';

export type BaseCheckboxFieldProps = FieldProps &
  Omit<BaseCheckboxProps, 'ref' | 'error'> & {
    name: string;
    label?: string;
    fieldClassName?: string;
    inputClassName?: string;
    error?: string;
  };

export const BaseCheckboxField = forwardRef<
  HTMLInputElement,
  BaseCheckboxFieldProps
>(
  ({
    id,
    name,
    label,
    renderLabel,
    fieldClassName = '',
    inputClassName = '',
    hint,
    renderHint,
    error,
    renderError,
    size,
    ...rest
  }) => {
    const renderFieldLabel = () => {
      if (renderLabel) {
        return renderLabel;
      } else {
        return (className?: FieldProps['className']) => (
          <DefaultCheckboxLabel label={label} className={className} />
        );
      }
    };

    return (
      <FieldRow
        id={id ?? name}
        name={name}
        label={label}
        renderLabel={renderFieldLabel()}
        error={error}
        renderError={renderError}
        hint={hint}
        renderHint={renderHint}
        className={fieldClassName}
        size={size}
      >
        <BaseCheckbox
          id={id ?? name}
          name={name}
          className={inputClassName}
          error={Boolean(error)}
          size={size}
          {...rest}
        />
      </FieldRow>
    );
  },
);

interface DefaultCheckboxLabelProps {
  label?: string;
  className?: string;
}

function DefaultCheckboxLabel({ className, label }: DefaultCheckboxLabelProps) {
  return <span className={className}>{label}</span>;
}
