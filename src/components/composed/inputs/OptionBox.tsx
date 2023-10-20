import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Box, BaseCheckbox } from '@/components';

interface OptionBoxProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, option: string) => void;
  error?: boolean;
}

export const OptionBox = forwardRef<HTMLInputElement, OptionBoxProps>(
  ({ name, label, className, onChange, checked, error, disabled }, ref) => {
    return (
      <label
        htmlFor={name}
        className={twMerge(className, 'block cursor-pointer py-2')}
      >
        <Box className="flex-row rounded-lg bg-white p-3 hover:bg-gray-9/10">
          <BaseCheckbox
            ref={ref}
            name={name}
            disabled={disabled}
            label={label}
            checked={checked}
            error={error}
            onChange={e => onChange(e, name)}
          />
        </Box>
      </label>
    );
  },
);

OptionBox.displayName = 'OptionBox';
