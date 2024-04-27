import { Combobox } from '@headlessui/react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Option } from '@/components/types';

interface BaseSelectOptionsProps<O extends Option> {
  name?: string;
  className?: string;
  leftClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  options?: O[];
  selectedOptions?: O[];
  open: boolean;
  transitionDuration: number;
  renderOption?: (option: O, className?: string) => ReactNode;
  onTransitionEnd?: () => void;
}

export function BaseSelectOptions<O extends Option>({
  name,
  className,
  leftClassName,
  open,
  options,
  selectedOptions,
  optionsClassName,
  optionClassName,
  transitionDuration,
  renderOption,
  onTransitionEnd,
}: BaseSelectOptionsProps<O>) {
  return (
    <div className="relative">
      <Combobox.Options
        static
        className={twMerge(
          'transition-height absolute z-10 w-full border-y-0 overflow-auto border rounded-b-lg bg-white border-gray-200 overscroll-contain',
          open ? 'max-h-60 rounded-t-none border-b' : 'max-h-0',
          optionsClassName,
        )}
        style={{ transitionDuration: `${transitionDuration * 2}ms` }}
        onTransitionEnd={onTransitionEnd}
      >
        {options?.map((option, i) => (
          <Combobox.Option
            disabled={option.value === null}
            key={`${name}-${option.label}-${i}`}
            value={option.value}
            className={twMerge(
              'flex items-center px-3 ui-active:bg-primary-100 focus:scale-[99%] focus:rounded-lg transition-transform duration-75 ease-in-out',
              option.value ? 'border-b p-3' : 'pb-0 pt-3',
              i === options.length - 1 ? 'border-none' : '',
              isHighlighted(option, selectedOptions) &&
                'ui-not-active:bg-primary-50',
              className,
              optionClassName,
            )}
          >
            {option.value === null ? (
              <GroupLabel label={option.label} />
            ) : (
              <>
                {renderOption ? (
                  renderOption(option, leftClassName)
                ) : (
                  <DefaultOption option={option} className={leftClassName} />
                )}
              </>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </div>
  );
}

function isHighlighted(option: Option, selectedOptions?: Option[]) {
  return selectedOptions?.find(o => o.value === option.value);
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center text-sm text-gray-7">
      <span>{label}</span>
      <span className="flex-grow" />
    </div>
  );
}

interface DefaultOptionBaseSelectOptionsProps {
  option: Option;
  className?: string;
}

function DefaultOption({
  option,
  className,
}: DefaultOptionBaseSelectOptionsProps) {
  const label = <span className="text-gray">{option.label}</span>;

  if (option.icon) {
    return (
      <>
        <div className={className}>
          <i className={option.icon} />
        </div>
        {label}
      </>
    );
  }

  if (option.emoji) {
    return (
      <>
        <div className={className}>
          <span>{option.emoji}</span>
        </div>
        {label}
      </>
    );
  }

  if (option.subtext) {
    return (
      <div className="flex flex-col text-gray">
        <span className="text-sm">{option.label}</span>
        <span className="text-xs">{option.subtext}</span>
      </div>
    );
  }

  return label;
}
