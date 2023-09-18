import classNames from 'classnames';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps {
  label: string;
  name: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, name, disabled, checked, onChange, error }, ref) => {
    return (
      <div className="flex items-center">
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
          )}
        />
        <label
          htmlFor={name}
          className={classNames(
            'ml-2 flex-1 cursor-pointer select-text text-gray-9',
            error ? 'text-error' : '',
            disabled ? 'cursor-default text-gray-2' : '',
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
