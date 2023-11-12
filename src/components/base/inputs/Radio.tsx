import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';
import { BaseInputProps } from './BaseInput';

export type RadioProps = Omit<BaseInputProps, 'value' | 'size'> &
  LabelVariantProps &
  InputVariantProps & {
    inputClassName?: string;
    value: string | null | number;
    renderLabel?: (label?: string) => JSX.Element;
  };

type LabelVariantProps = VariantProps<typeof labelVariants>;
type InputVariantProps = VariantProps<typeof inputVariants>;

const labelVariants = cva(
  'relative my-1 flex cursor-pointer select-text items-start rounded-lg text-inherit',
  {
    variants: {
      size: {
        large: ['text-md', 'leading-7'],
        normal: ['text-base', 'leading-6'],
        small: ['text-sm', 'leading-5'],
        custom: [''],
      },
    },
    defaultVariants: {
      size: 'normal',
    },
  },
);

const inputVariants = cva(
  'before:h-3/4 before:w-3/4 checked:before:bg-primary',
  {
    variants: {
      size: {
        large: ['h-[1.25rem]', 'w-[1.25rem]'],
        normal: ['h-[1rem]', 'w-[1rem]'],
        small: ['h-[0.75rem]', 'w-[0.75rem]'],
        custom: [''],
      },
    },
    defaultVariants: {
      size: 'normal',
    },
  },
);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      className,
      size,
      label,
      inputClassName,
      value = '',
      renderLabel,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        htmlFor={id}
        className={twMerge(labelVariants({ size }), className)}
      >
        <input
          id={id}
          ref={ref}
          type="radio"
          value={value ?? ''}
          className={twMerge(
            'relative shrink-0 cursor-pointer appearance-none rounded-full border border-gray-300 text-primary-500 transition-all',
            "before:content[''] before:relative before:left-1/2 before:top-1/2 before:block before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:opacity-0 before:transition-opacity checked:border-primary-500 checked:before:bg-primary-500 checked:before:opacity-100",
            inputVariants({ size }),
            inputClassName,
          )}
          {...props}
        />
        {renderLabel ? (
          <>{renderLabel(label)}</>
        ) : (
          <span className="relative top-[-0.25rem] ml-2 flex-1">{label}</span>
        )}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
