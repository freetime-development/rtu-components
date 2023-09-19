import { forwardRef } from 'react';
import { Radio } from '../../base/inputs/Radio';

interface RadioProps {
  label: string;
  name: string;
  value: string | null;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  checked: boolean;
}

export const RadioOption = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, value, onChange, checked, clear, disabled }, ref) => {
    const id = `${name}:${value}`;

    return (
      <div className="flex">
        <Radio
          id={id}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          ref={ref}
          disabled={disabled}
          className="w-full bg-white p-3 text-gray-9 shadow-md hover:bg-gray-9/10"
        />
        {checked && (
          <button
            className="my-1 ml-2 cursor-pointer select-text rounded-lg bg-white p-3 text-gray-9 shadow-md"
            type="button"
            onClick={clear}
          >
            clear
          </button>
        )}
      </div>
    );
  },
);

RadioOption.displayName = 'RadioOption';