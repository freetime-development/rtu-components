import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useClassNames } from '@/utils/useClassNames';

export type BaseTextAreaProps = Omit<
  React.HTMLProps<HTMLTextAreaElement>,
  'onChange' | 'onFocus'
> & {
  name: string;
  containerClassName?: string;
  rows?: number;
  cols?: number;
  error?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  (
    {
      name,
      value,
      placeholder,
      onChange,
      onBlur,
      onFocus,
      disabled,
      rows,
      cols,
      error,
      className,
      containerClassName,
    },
    ref,
  ) => {
    const classNames = useClassNames(
      error ? 'error' : 'custom',
      containerClassName,
      'flex w-full items-center rounded-lg border border-gray-9/10 hover:border-gray-9/20 focus:border-gray-9/20 dark:border-white-9/10 dark:hover:border-white-9/20 dark:focus:border-white-9/20',
    );

    return (
      <div className={classNames}>
        <textarea
          ref={ref}
          id={name}
          name={name}
          value={value}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          className={twMerge(
            'flex-grow appearance-none rounded-lg bg-transparent p-3 text-gray-9',
            error && 'text-error',
            className,
          )}
        />
      </div>
    );
  },
);
