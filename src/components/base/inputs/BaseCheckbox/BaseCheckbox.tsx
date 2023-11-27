import { ChangeEvent, HTMLProps, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';
import { CheckboxSvg } from './CheckboxSvg';
import {
  ComponentVariantState,
  ComponentVariantType,
  getComponentStateVariants,
} from '@/css/variants/stateVariants';

export type BaseCheckboxProps = Omit<
  HTMLProps<HTMLInputElement>,
  'size' | 'error' | 'onChange' | 'ref'
> &
  CheckboxVariantProps &
  CheckboxIconVariantProps & {
    name: string;
    checked?: boolean;
    error?: boolean;
    containerClassName?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    renderLabel?: (className?: string) => JSX.Element;
    renderCheckedIcon?: (defaultClassName: string) => ReactNode;
  };
type CheckboxVariantProps = VariantProps<typeof checkboxSizeVariants>;
type CheckboxIconVariantProps = VariantProps<typeof checkboxIconSizeVariants>;

const checkboxSizeVariants = cva('', {
  variants: {
    size: {
      xl: ['w-[1.25rem]', 'h-[1.25rem]'],
      large: ['w-[1.125rem]', 'h-[1.125rem]'],
      normal: ['w-[1rem]', 'h-[1rem]'],
      small: ['w-[0.875rem]', 'h-[0.875rem]'],
      custom: [''],
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

const checkboxIconSizeVariants = cva('', {
  variants: {
    size: {
      xl: ['1rem'],
      large: ['0.875rem'],
      normal: ['0.75rem'],
      small: ['0.625rem'],
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
      renderLabel,
      name,
      containerClassName,
      disabled,
      className,
      checked,
      error,
      size,
      renderCheckedIcon,
      ...props
    },
    ref,
  ) => {
    const { wrapperStateVariants, inputStateVariants } =
      getComponentStateVariants(
        ComponentVariantType.CHECKBOX,
        error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
      );

    return (
      <span
        className={twMerge(
          'transition flex relative shrink-0 cursor-pointer user-select-none justify-center items-center',
          '[&>svg]:pointer-events-none [&>svg]:absolute',
          checkboxSizeVariants({ size }),
          wrapperStateVariants,
          containerClassName,
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
            'rounded peer transition relative z-1 outline-none appearance-none cursor-inherit',
            checkboxSizeVariants({ size }),
            inputStateVariants,
            disabled ? 'cursor-default' : 'cursor-pointer',
            className,
          )}
          {...props}
        />
        {renderCheckedIcon ? (
          <>
            {renderCheckedIcon(
              twMerge(
                'relative opacity-0 peer-checked:opacity-100',
                checkboxIconSizeVariants({ size }),
              ),
            )}
          </>
        ) : (
          <CheckboxSvg
            width={checkboxIconSizeVariants({ size })}
            height={checkboxIconSizeVariants({ size })}
          />
        )}
      </span>
    );
  },
);

BaseCheckbox.displayName = 'BaseCheckbox';
