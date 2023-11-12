import { forwardRef } from 'react';
import { Radio, RadioProps } from '../../base/inputs/Radio';

export type RadioOptionProps = Omit<RadioProps, 'ref'> & {
  clear: () => void;
};

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ clear, name, value, checked, ...props }, ref) => {
    const id = `${name}:${value}`;

    return (
      <div className="flex">
        <Radio
          ref={ref}
          name={name}
          id={id}
          value={value}
          checked={checked}
          {...props}
          className="w-full bg-white p-3 text-gray-9 shadow-md hover:bg-gray-9/10 items-center"
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
