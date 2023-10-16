import { Combobox } from '@headlessui/react';
import classNames from 'classnames';
import { ForwardedRef, HTMLProps, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { BaseSelectOptions } from './BaseSelectOptions';
import { Option } from '@/components/types';

export interface BaseSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'ref'> {
  isLoading?: boolean;
  disabled?: boolean;
  options: Option[];
  value: string | null;
  name: string;
  inputClassName?: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  setQuery: (query: string) => void;
  clear: () => void;
  transitionDuration?: number;
  LoadingIcon?: ReactNode;
  ClearIcon?: ReactNode;
  DefaultIcon?: ReactNode;
  renderOption?: (option: Option) => ReactNode;
}

export const BaseSelect = forwardRef(
  (
    {
      isLoading,
      disabled,
      options,
      value,
      name,
      placeholder,
      inputClassName,
      error,
      onChange,
      setQuery,
      clear,
      transitionDuration = 150,
      LoadingIcon,
      ClearIcon,
      DefaultIcon,
      renderOption,
    }: BaseSelectProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const selectedOption = options.find(o => o.value === value);

    function onClick() {
      if (!value) {
        return;
      }
      setTimeout(() => {
        clear();
      }, transitionDuration);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
      if (!value) {
        return false;
      }
      if (e.key === 'Enter' || e.key === 'Space') {
        setTimeout(() => {
          clear();
        }, transitionDuration);
      }

      return true;
    }

    return (
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <>
            <Combobox.Button as="div" className="relative flex w-full">
              <div
                className={twMerge(
                  'absolute h-full w-10 items-center justify-center',
                  selectedOption?.icon ? 'flex' : 'hidden',
                )}
              >
                {selectedOption?.icon && (
                  <i className={classNames('h-6 w-6', selectedOption.icon)} />
                )}
              </div>
              <Combobox.Input
                name={name}
                ref={ref}
                onChange={event => setQuery(event.target.value)}
                className={classNames(
                  ' w-full rounded-lg border p-3 text-gray',
                  !disabled && 'hover:border-gray/20 focus:border-gray/20',
                  open ? 'rounded-b-none' : 'rounded-b-lg',
                  error ? 'border-error focus:border-error' : 'border-gray/10',
                  selectedOption?.icon ? 'px-9' : 'pr-9',
                  inputClassName,
                )}
                placeholder={placeholder}
                displayValue={(value: string) => {
                  return options.find(o => o.value === value)?.label || '';
                }}
              />

              <Combobox.Button
                className={twMerge(
                  'absolute hidden right-0 h-full w-10 hover:cursor-pointer',
                  !disabled && 'block',
                )}
                // @ts-expect-error
                tabindex={0} // it needs to overide the default -1 so that the Combobox.Button can open the dropdown, yes it's lower case i, no don't change it
                onClick={onClick}
                onKeyDown={onKeyDown}
              >
                <div className="absolute right-3 top-3.5">
                  {isLoading ? (
                    <>
                      {LoadingIcon ? (
                        <>{LoadingIcon}</>
                      ) : (
                        <div className="flex h-full w-10 items-center justify-center">
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-t-transparent" />
                        </div>
                      )}
                    </>
                  ) : (
                    <>{value ? <>{ClearIcon}</> : <>{DefaultIcon}</>}</>
                  )}
                </div>
              </Combobox.Button>
            </Combobox.Button>

            <BaseSelectOptions
              open={open}
              options={options}
              transitionDuration={transitionDuration}
              renderOption={renderOption}
            />
          </>
        )}
      </Combobox>
    );
  },
);

BaseSelect.displayName = 'BaseSelect';
