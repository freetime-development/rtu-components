import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BaseCheckboxProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(
  (
    { label, name, disabled, className, checked, onChange, error, ...rest },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        id={name}
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className={twMerge(
          'relative box-content h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-gray-2 bg-white',
          'focus:black shadow-black ring-gray-7 checked:bg-black focus:ring-1',
          checked && 'checked border-black',
          error && 'border-error ring-error focus:border-error',
          disabled ? 'cursor-default' : '',
          className,
        )}
        {...rest}
      />
    );
  },
);

BaseCheckbox.displayName = 'Checkbox';
