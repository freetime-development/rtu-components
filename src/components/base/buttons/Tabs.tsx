import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { Option } from '@/components';

type TabOption = Omit<Option, 'value'> & { value: string | number };

export type TabProps<O = void> = O extends void
  ? DefaultTabProps
  : GenericTabProps<O extends TabOption ? O : never>;

type GenericTabProps<O extends TabOption> = {
  value: O['value'];
  options: O[];
  renderOption?: (
    option: O,
    isSelected: boolean,
    isFirst: boolean,
    isLast: boolean,
  ) => JSX.Element;
  onClick: (value: O['value']) => void;
} & Omit<DefaultTabProps, 'options' | 'value' | 'onClick' | 'renderOption'>;

type DefaultTabProps = {
  value: TabOption['value'];
  options: TabOption[];
  renderOption?: (
    option: TabOption,
    isSelected: boolean,
    isFirst: boolean,
    isLast: boolean,
  ) => JSX.Element;
  onClick: (value: TabOption['value']) => void;
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

export function Tabs<O extends TabOption>({
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
              <DefaultButton<O>
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

type DefaultButtonProps<O extends TabOption> = {
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  className?: string;
  orientation: TabProps<O>['orientation'];
  option: TabProps<O>['options'][0];
  onClick: TabProps<O>['onClick'];
  variant: TabProps<O>['variant'];
};

function DefaultButton<O extends TabOption>({
  isFirst,
  isLast,
  isSelected,
  option,
  className,
  orientation,
  variant,
  onClick,
}: DefaultButtonProps<O>) {
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
}
