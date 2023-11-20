import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';
import { BaseInputProps } from './BaseInput';
import {
  ComponentVariantState,
  ComponentVariantType,
  getComponentStateVariants,
} from '@/css/variants/stateVariants';

export type BaseRadioProps = Omit<BaseInputProps, 'value' | 'size'> &
  InputVariantProps & {
    inputClassName?: string;
    value: string | null | number;
    error?: boolean;
    renderLabel?: (className?: string) => JSX.Element;
  };

export type InputVariantProps = VariantProps<typeof inputSizeVariants>;

export const inputSizeVariants = cva('', {
  variants: {
    size: {
      xl: [
        'w-[1.25rem]',
        'h-[1.25rem]',
        'before:w-[0.875rem]',
        'before:h-[0.875rem]',
      ],
      large: [
        'w-[1.125rem]',
        'h-[1.125rem]',
        'before:w-[0.75rem]',
        'before:h-[0.75rem]',
      ],
      normal: [
        'w-[1rem]',
        'h-[1rem]',
        'before:w-[0.625rem]',
        'before:h-[0.625rem]',
      ],
      small: [
        'w-[0.875rem]',
        'h-[0.875rem]',
        'before:w-[0.5rem]',
        'before:h-[0.5rem]',
      ],
      custom: [''],
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export const BaseRadio = forwardRef<HTMLInputElement, BaseRadioProps>(
  (
    {
      id,
      className,
      size,
      error,
      label,
      inputClassName,
      value = '',
      renderLabel,
      ...props
    },
    ref,
  ) => {
    const { inputStateVariants } = getComponentStateVariants(
      ComponentVariantType.RADIO,
      error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
    );

    return (
      <input
        id={id}
        ref={ref}
        type="radio"
        value={value ?? ''}
        className={twMerge(
          'relative flex items-center justify-center shrink-0 outline-none cursor-pointer appearance-none rounded-full transition',
          "before:content[''] before:rounded-full before:opacity-0 before:transition-opacity checked:before:opacity-100",
          inputSizeVariants({ size }),
          inputStateVariants,
          inputClassName,
        )}
        {...props}
      />
    );
  },
);

BaseRadio.displayName = 'Radio';
