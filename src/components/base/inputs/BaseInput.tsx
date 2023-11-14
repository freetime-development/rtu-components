import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputVariantProps = VariantProps<typeof inputVariants>;
export type BaseInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'onChange' | 'onFocus' | 'size'
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
  [
    'peer flex-grow appearance-none rounded-lg bg-transparent text-gray focus:outline-none',
  ],
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
    'flex w-10 items-center self-stretch border-0 bg-transparent justify-center',
    'peer-focus:border-gray-300 group-hover:border-gray',
  ],
  {
    variants: {
      orientation: {
        right: ['border-l'],
        left: ['border-r'],
      },
      size: {
        large: ['text-lg', '1.25rem'],
        normal: ['text-base', '1rem'],
        small: ['text-sm', '0.75rem'],
        custom: [''],
      },
    },
  },
);

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      renderLeft,
      renderRight,
      name,
      value,
      type,
      placeholder,
      onChange,
      onBlur,
      size,
      onFocus,
      disabled,
      error,
      className,
      containerClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={twMerge(
          'flex w-full group items-center rounded-lg border border-gray-200 hover:border-gray/90 focus-within:border-gray-300 text-gray',
          disabled && 'pointer-events-none',
          error && 'focus-within:border-error border-error hover:border-error',
          containerClassName,
        )}
      >
        {renderLeft && (
          <>{renderLeft(sideVariants({ orientation: 'left', size }), error)}</>
        )}
        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          className={twMerge(
            inputVariants({ size }),
            error && 'text-error',
            disabled && 'opacity-40 pointer-events-none',
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
