import { twMerge } from 'tailwind-merge';
import { Option } from '@/components';

interface SwitchProps {
  value: string;
  options: Option[];
  onClick: (value: any) => void;
  className?: string;
}

export function Switch({ options, value, className, onClick }: SwitchProps) {
  return (
    <>
      {options.map((option, i) => (
        <button
          key={option.value}
          type="button"
          className={twMerge(
            'p-3',
            value === option.value ? 'bg-primary text-white' : 'bg-gray-9/10',
            i === 0 && 'rounded-l-lg',
            i === options.length - 1 && 'rounded-r-lg',
            className,
          )}
          onClick={_ => onClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </>
  );
}
