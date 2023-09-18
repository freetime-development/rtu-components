import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface RadioProps {
  id: string;
  label?: string;
  className?: string;
  name: string;
  value: string | null;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ id, name, label, className, value, onChange, checked, disabled }, ref) => {
    return (
      <label
        htmlFor={id}
        className={twMerge(
          'my-1 flex cursor-pointer select-text items-center rounded-lg text-gray-9',
          className,
        )}
      >
        <input
          id={id}
          ref={ref}
          disabled={disabled}
          checked={checked}
          name={name}
          type="radio"
          onChange={onChange}
          value={value || ''}
          className="relative my-1 h-4 w-4 appearance-none rounded-full border border-gray-2 checked:border-black focus:ring-1"
        />
        <span className="ml-2 flex-1">{label}</span>
      </label>
    );
  },
);

Radio.displayName = 'Radio';
