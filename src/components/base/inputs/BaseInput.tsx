import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ComponentVariantState,
  ComponentVariantType,
  getComponentStateVariants,
} from '@/css/variants/stateVariants';

type InputVariantProps = VariantProps<typeof inputVariants>;
export type BaseInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'onChange' | 'onFocus' | 'size' | 'ref'
> &
  InputVariantProps & {
    renderLeft?: (className: string, error?: boolean) => JSX.Element;
    renderRight?: (className: string, error?: boolean) => JSX.Element;
    name: string;
    containerClassName?: string;
    error?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

const inputVariants = cva(
  ['peer flex-grow appearance-none rounded-lg outline-none'],
  {
    variants: {
      size: {
        large: ['py-3', 'px-5', 'text-lg'],
        normal: ['py-2.5', 'px-4', 'text-base'],
        small: ['py-2', 'px-3', 'text-sm'],
        custom: [''],
      },
    },
    defaultVariants: {
      size: 'normal',
    },
  },
);

const sideVariants = cva(
  [
    'flex items-center self-stretch border-0 justify-center',
    'peer-focus:border-gray-300 group-hover:border-gray',
  ],
  {
    variants: {
      orientation: {
        right: ['border-l'],
        left: ['border-r'],
      },
      size: {
        large: ['text-lg', '1.25rem', 'w-10'],
        normal: ['text-base', '1rem', 'w-10'],
        small: ['text-xs', '0.75rem', 'w-8'],
        custom: [''],
      },
    },
    defaultVariants: {
      size: 'normal',
    },
  },
);

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      renderLeft,
      renderRight,
      name,
      size,
      disabled,
      error,
      className,
      containerClassName,
      ...rest
    },
    ref,
  ) => {
    const { wrapperStateVariants, inputStateVariants } =
      getComponentStateVariants(
        ComponentVariantType.INPUT,
        error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
      );

    return (
      <div
        className={twMerge(
          'flex w-full group items-center rounded-lg',
          wrapperStateVariants,
          disabled && 'pointer-events-none opacity-40',
          containerClassName,
        )}
      >
        {renderLeft && (
          <>{renderLeft(sideVariants({ orientation: 'left', size }), error)}</>
        )}

        <input
          ref={ref}
          id={name}
          name={name}
          disabled={disabled}
          className={twMerge(
            inputVariants({ size }),
            inputStateVariants,
            renderLeft && 'rounded-l-none border-l-0',
            renderRight && 'rounded-r-none border-r-0',
            className,
          )}
          {...rest}
        />

        {renderRight && (
          <>
            {renderRight(sideVariants({ orientation: 'right', size }), error)}
          </>
        )}
      </div>
    );
  },
);
