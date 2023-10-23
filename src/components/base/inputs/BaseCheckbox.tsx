import { ChangeEvent, HTMLProps, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { CheckboxSvg } from './CheckboxSvg';

export interface BaseCheckboxProps extends HTMLProps<HTMLInputElement> {
  name: string;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  CheckedIcon?: ReactNode;
}

export const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(
  (
    {
      label,
      name,
      disabled,
      className,
      checked,
      onChange,
      error,
      CheckedIcon = <CheckboxSvg width={16} height={16} />,
      ...rest
    },
    ref,
  ) => {
    return (
      <span
        className={twMerge(
          'relative schrink-0 block box-content cursor-pointer user-select-none',
          'h-4 w-4 rounded-[4px] border border-gray-300 bg-white text-primary',
          checked && 'checked border-primary bg-primary-50',
          error && 'border-error focus:ring-error focus:border-error',
          disabled ? 'cursor-default' : '',
          className,
        )}
      >
        <input
          ref={ref}
          id={name}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          className={twMerge(
            'absolute top-0 z-1 left-0 outline-none appearance-none cursor-inherit',
            'h-4 w-4 rounded-[4px]',
            'focus:ring-2 ring-primary focus:ring-primary',
            checked && 'checked border-primary bg-primary-50',
            error && 'border-error focus:ring-error focus:border-error',
            disabled ? 'cursor-default' : '',
            className,
          )}
          {...rest}
        />
        {checked && <>{CheckedIcon}</>}
      </span>
    );
  },
);

BaseCheckbox.displayName = 'Checkbox';
