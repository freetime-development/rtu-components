import { ChangeEvent, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Box, BaseCheckbox } from '@/components';

interface OptionBoxProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, option: string) => void;
  error?: boolean;
}

export const OptionBox = forwardRef<HTMLInputElement, OptionBoxProps>(
  ({ name, label, className, onChange, checked, error, disabled }, ref) => {
    return (
      <label
        htmlFor={name}
        className={twMerge(className, 'block cursor-pointer py-2')}
      >
        <Box className="flex flex-row gap-2 items-center rounded-lg bg-white p-3">
          <BaseCheckbox
            ref={ref}
            name={name}
            disabled={disabled}
            checked={checked}
            error={error}
            onChange={e => onChange(e, name)}
          />
          {label}
        </Box>
      </label>
    );
  },
);

OptionBox.displayName = 'OptionBox';
