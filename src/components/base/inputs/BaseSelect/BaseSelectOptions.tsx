import { Combobox } from '@headlessui/react';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Option } from '@/components/types';

interface Props {
  options: Option[];
  highlightedOptions?: Option[];
  open: boolean;
  transitionDuration: number;
  renderOption?: (option: Option) => ReactNode;
  onTransitionEnd?: () => void;
}

export const BaseSelectOptions: FC<Props> = ({
  open,
  options,
  highlightedOptions,
  transitionDuration,
  renderOption,
  onTransitionEnd,
}) => {
  return (
    <div className="relative">
      <Combobox.Options
        static
        className={classNames(
          'transition-height absolute z-10 w-full overflow-auto border rounded-b-lg border-gray-9/20',
          open ? 'max-h-60 rounded-t-none' : 'max-h-0 border-transparent',
        )}
        style={{ transitionDuration: `${transitionDuration * 2}ms` }}
        onTransitionEnd={onTransitionEnd}
      >
        {options.map((option, i) => (
          <Combobox.Option
            disabled={option.value === null}
            key={`${name}-${option.label}-${i}`}
            value={option.value}
            className={classNames(
              'flex px-3 ui-active:bg-primary-100 bg-white',
              option.value ? 'border-b p-3' : 'pb-0 pt-3',
              i === options.length - 1 ? 'border-none' : '',
              isHighlighted(option, highlightedOptions)
                ? 'ui-not-active:bg-primary-50'
                : 'ui-not-active:bg-white',
            )}
          >
            {option.value === null ? (
              <GroupLabel label={option.label} />
            ) : (
              <>
                {renderOption ? (
                  renderOption(option)
                ) : (
                  <DefaultOption option={option} />
                )}
              </>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </div>
  );
};

function isHighlighted(option: Option, highlightedOptions?: Option[]) {
  return highlightedOptions?.find(o => o.value === option.value);
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center text-sm text-gray-7">
      <span>{label}</span>
      <span className="flex-grow" />
    </div>
  );
}

function DefaultOption({ option }: { option: Option }) {
  if (option.icon) {
    return (
      <>
        <i className={classNames('mx-2 h-6 w-6', option.icon)} />
        <span>{option.label}</span>
      </>
    );
  }

  if (option.emoji) {
    return (
      <>
        <span className="mr-2">{option.emoji}</span>
        <span>{option.label}</span>
      </>
    );
  }

  if (option.subtext) {
    return (
      <div className="flex flex-col">
        <span className="text-sm">{option.label}</span>
        <span className="text-xs">{option.subtext}</span>
      </div>
    );
  }

  return <span>{option.label}</span>;
}
