import { ChangeEvent, HTMLProps, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';
import { CheckboxSvg } from './CheckboxSvg';

export type BaseCheckboxProps = Omit<
  HTMLProps<HTMLInputElement>,
  'size' | 'onChange'
> &
  CheckboxVariantProps &
  CheckboxIconVariantProps & {
    name: string;
    checked?: boolean;
    error?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    CheckedIcon?: ReactNode;
  };
type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
type CheckboxIconVariantProps = VariantProps<typeof checkboxIconVariants>;

const checkboxVariants = cva('', {
  variants: {
    size: {
      normal: ['w-5', 'h-5'],
      small: ['w-4', 'h-4'],
      custom: [''],
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

const checkboxIconVariants = cva('', {
  variants: {
    size: {
      normal: ['1rem'],
      small: ['0.75rem'],
      custom: '',
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(
  (
    {
      label,
      name,
      disabled,
      className,
      checked,
      error,
      size,
      CheckedIcon = (
        <CheckboxSvg
          width={checkboxIconVariants({ size })}
          height={checkboxIconVariants({ size })}
        />
      ),
      ...props
    },
    ref,
  ) => {
    return (
      <span
        className={twMerge(
          checkboxVariants({ size }),
          'flex transition relative shrink-0 cursor-pointer user-select-none justify-center items-center text-primary',
          '[&>svg]:pointer-events-none [&>svg]:absolute',
          error && 'text-error',
          className,
        )}
      >
        <input
          ref={ref}
          id={name}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          className={twMerge(
            checkboxVariants({ size }),
            'rounded peer transition border border-gray-300 bg-white text-primary',
            'absolute z-1 outline-none appearance-none cursor-inherit',
            'focus:ring-1 ring-primary focus:ring-primary',
            checked && 'checked border-primary bg-primary-50',
            error &&
              'border-error focus:ring-error focus:border-error bg-transparent',
            disabled ? 'cursor-default' : 'cursor-pointer',
            className,
          )}
          {...props}
        />
        <span className="relative opacity-0 peer-checked:opacity-100">
          {CheckedIcon}
        </span>
      </span>
    );
  },
);

BaseCheckbox.displayName = 'Checkbox';
