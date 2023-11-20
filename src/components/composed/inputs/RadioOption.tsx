import { forwardRef } from 'react';
import { BaseRadio, BaseRadioProps } from '@/components/base';

export type RadioOptionProps = BaseRadioProps & {
  clear: () => void;
};

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ clear, name, value, checked, label, ...props }, ref) => {
    const id = `${name}:${value}`;

    return (
      <div className="flex">
        <label
          htmlFor={id}
          className="w-full gap-2 flex rounded-lg cursor-pointer bg-white p-3 text-gray shadow-md hover:bg-gray-9/10 items-center"
        >
          <BaseRadio
            ref={ref}
            name={name}
            id={id}
            value={value}
            checked={checked}
            {...props}
          />
          {label}
        </label>
        {checked && (
          <button
            className="ml-2 cursor-pointer select-text rounded-lg bg-white p-3 text-gray shadow-md"
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
