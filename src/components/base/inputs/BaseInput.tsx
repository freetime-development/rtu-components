import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useClassNames } from '@/utils/useClassNames';

type InputVariantProps = VariantProps<typeof inputVariants>;
export type BaseInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'onChange' | 'onFocus'
> &
  InputVariantProps & {
    Icon?: () => JSX.Element;
    name: string;
    containerClassName?: string;
    error?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

const inputVariants = cva(
  [
    'flex w-full items-center rounded-lg border border-gray-9/10 hover:border-gray-9/20 focus:border-gray-9/20 dark:border-white-9/10 dark:hover:border-white-9/20 dark:focus:border-white-9/20',
  ],
  {
    variants: {
      orientation: {
        normal: ['flex-row'],
        reverse: ['flex-row-reverse'],
      },
    },
  },
);

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      Icon,
      name,
      value,
      type,
      placeholder,
      onChange,
      onBlur,
      onFocus,
      disabled,
      error,
      orientation,
      className,
      containerClassName,
      ...rest
    },
    ref,
  ) => {
    const classNames = useClassNames(
      error ? 'error' : 'custom',
      containerClassName,
      inputVariants({ orientation }),
    );

    return (
      <div className={classNames}>
        {Icon && (
          <div
            className={twMerge(
              'relative flex w-8 cursor-pointer items-center self-stretch border-0 bg-transparent',
              orientation === 'reverse'
                ? 'justify-start rounded-r-lg'
                : 'justify-end rounded-l-lg',
            )}
          >
            {Icon()}
          </div>
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
            'flex-grow appearance-none rounded-lg bg-transparent p-3 text-gray-9',
            error && 'text-error',
            Icon
              ? orientation === 'reverse'
                ? 'rounded-r-none border-r-0'
                : 'rounded-l-none border-l-0'
              : '',
            className,
          )}
          {...rest}
        />
      </div>
    );
  },
);
