import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { BaseInputProps } from './BaseInput';

export type RadioProps = Omit<BaseInputProps, 'value'> & {
  inputClassName?: string;
  value: string | null | number;
  renderLabel?: (label?: string) => JSX.Element;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { id, className, label, inputClassName, value = '', renderLabel, ...props },
    ref,
  ) => {
    return (
      <label
        htmlFor={id}
        className={twMerge(
          'relative my-1 flex cursor-pointer select-text items-start rounded-lg text-inherit',
          className,
        )}
      >
        <input
          id={id}
          ref={ref}
          type="radio"
          value={value ?? ''}
          className={twMerge(
            'h-[1rem] w-[1rem]',
            'before:h-2/3 before:w-2/3',
            'relative  cursor-pointer appearance-none rounded-full border border-gray-300 text-primary-500 transition-all',
            "before:content[''] before:relative before:left-1/2 before:top-1/2 before:block before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:opacity-0 before:transition-opacity checked:border-primary-500 checked:before:bg-primary-500 checked:before:opacity-100",
            inputClassName,
          )}
          {...props}
        />
        {renderLabel ? (
          <>{renderLabel(label)}</>
        ) : (
          <span className="relative top-[-0.25rem] ml-2 flex-1">{label}</span>
        )}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
