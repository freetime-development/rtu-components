import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import { Option } from '@/components';

export type TabProps<O extends Option> = {
  value: O['value'];
  options: O[];
  renderOption?: (
    option: O,
    isSelected: boolean,
    isFirst: boolean,
    isLast: boolean,
  ) => JSX.Element;
  onClick: (value: O['value']) => void;
  containerClassName?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'primary' | 'secondary';
};

const switchVariants = cva('', {
  variants: {
    orientation: {
      vertical: ['flex', 'flex-col'],
      horizontal: ['flex'],
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export function Tabs<O extends Option>({
  options,
  value,
  className,
  containerClassName,
  onClick,
  orientation = 'horizontal',
  variant = 'primary',
  renderOption,
}: TabProps<O>) {
  return (
    <div
      className={twMerge(switchVariants({ orientation }), containerClassName)}
    >
      {options.map((option, i) => {
        const isFirst = i === 0;
        const isLast = i === options.length - 1;

        return (
          <>
            {renderOption ? (
              <>
                {renderOption(option, value === option.value, isFirst, isLast)}
              </>
            ) : (
              <DefaultButton
                orientation={orientation}
                variant={variant}
                isFirst={isFirst}
                isLast={isLast}
                isSelected={value === option.value}
                option={option}
                onClick={onClick}
                className={className}
              />
            )}
          </>
        );
      })}
    </div>
  );
}

interface DefaultButtonProps {
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  className?: string;
  orientation: TabProps<Option>['orientation'];
  option: TabProps<Option>['options'][0];
  onClick: TabProps<Option>['onClick'];
  variant: TabProps<Option>['variant'];
}

const DefaultButton: FC<DefaultButtonProps> = ({
  isFirst,
  isLast,
  isSelected,
  option,
  className,
  orientation,
  variant,
  onClick,
}) => {
  const switchVariants = cva('p-3', {
    variants: {
      variant: {
        primary: [isSelected ? 'bg-primary text-white' : 'bg-gray-50'],
        secondary: [isSelected ? 'bg-secondary text-white' : 'bg-gray-50'],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  });

  return (
    <button
      key={option.value}
      type="button"
      className={twMerge(
        switchVariants({ variant }),
        isFirst
          ? orientation === 'horizontal'
            ? 'rounded-l-lg'
            : 'rounded-t-lg'
          : '',
        isLast
          ? orientation === 'horizontal'
            ? 'rounded-r-lg'
            : 'rounded-b-lg'
          : '',
        className,
      )}
      onClick={_ => onClick(option.value)}
    >
      {option.label}
    </button>
  );
};
