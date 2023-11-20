import { FC, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { BaseRadio, BaseRadioProps } from '..';
import { FieldProps } from '../../composed';
import { LabelTextVariantProps } from '../inputs/classNameVariants';
import { FieldRow } from '../inputs/Field';
import {
  ComponentVariantState,
  ComponentVariantType,
  getComponentStateVariants,
} from '@/css/variants/stateVariants';

export type BaseRadioFieldProps = FieldProps &
  LabelTextVariantProps &
  Omit<BaseRadioProps, 'error'> & {
    fieldClassName?: string;
  };

export const BaseRadioField = forwardRef<HTMLInputElement, BaseRadioFieldProps>(
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
    const { wrapperStateVariants } = getComponentStateVariants(
      ComponentVariantType.RADIO,
      error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
    );

    const renderFieldLabel = () => {
      if (renderLabel) {
        return renderLabel;
      } else {
        return (className?: FieldProps['className']) => (
          <DefaultRadioLabel label={label} className={className} />
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
        className={twMerge(wrapperStateVariants, fieldClassName)}
        size={size}
      >
        <BaseRadio
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

interface DefaultRadioLabelProps {
  label?: string;
  className?: string;
}

function DefaultRadioLabel({ className, label }: DefaultRadioLabelProps) {
  return <span className={className}>{label}</span>;
}
