import { Combobox } from '@headlessui/react';
import classNames from 'classnames';
import {
  ForwardedRef,
  HTMLProps,
  ReactNode,
  forwardRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { set } from 'date-fns';
import { BaseSelectOptions } from './BaseSelectOptions';
import { Option } from '@/components/types';

export interface BaseMultiSelectProps
  extends Omit<HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'ref'> {
  isLoading?: boolean;
  disabled?: boolean;
  disableClear?: boolean;
  options: Option[];
  highlightedOptions?: Option[];
  value: string[];
  name: string;
  inputClassName?: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string[]) => void;
  setQuery?: (query: string) => void;
  clear: () => void;
  transitionDuration?: number;
  LoadingIcon?: ReactNode;
  ClearIcon?: ReactNode;
  DefaultIcon?: ReactNode;
  renderOption?: (option: Option) => ReactNode;
  renderSelectedOptions?: () => ReactNode;
}

export const BaseMultiSelect = forwardRef(
  (
    {
      isLoading,
      disabled,
      options,
      highlightedOptions,
      disableClear,
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
      renderSelectedOptions,
    }: BaseMultiSelectProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    function onClick() {
      if (!value || isLoading || disableClear) {
        return;
      }
      setTimeout(() => {
        clear();
      }, transitionDuration);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
      if (!value || isLoading || disableClear) {
        return false;
      }
      if (e.key === 'Enter' || e.key === 'Space') {
        setTimeout(() => {
          clear();
        }, transitionDuration);
      }

      return true;
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setQuery?.(e.target.value);
    }

    return (
      <Combobox value={value} onChange={onChange} disabled={disabled} multiple>
        {({ open }) => (
          <>
            <Combobox.Button as="div" className="relative flex w-full">
              {!open && renderSelectedOptions && highlightedOptions?.length ? (
                <div
                  className={classNames(
                    'w-full flex flex-wrap rounded-lg border min-h-[2.5rem] pr-10 text-gray items-center box-content',
                    !disabled && 'hover:border-gray/20 focus:border-gray/20',
                    open ? 'rounded-b-none' : 'rounded-b-lg',
                    error
                      ? 'border-error focus:border-error'
                      : 'border-gray/10',
                  )}
                >
                  {renderSelectedOptions()}
                </div>
              ) : (
                <Combobox.Input
                  name={name}
                  ref={ref}
                  onChange={handleInputChange}
                  className={classNames(
                    'w-full rounded-lg border min-h-[2.5rem] text-gray box-content pl-3',
                    !disabled && 'hover:border-gray/20 focus:border-gray/20',
                    open ? 'rounded-b-none' : 'rounded-b-lg',
                    error
                      ? 'border-error focus:border-error'
                      : 'border-gray/10',
                    inputClassName,
                  )}
                  placeholder={placeholder}
                />
              )}

              <Combobox.Button
                className={twMerge(
                  'absolute hidden right-0 h-full w-10 hover:cursor-pointer',
                  !disabled && 'flex items-center justify-center',
                )}
                // @ts-expect-error
                tabindex={0} // it needs to overide the default -1 so that the Combobox.Button can open the dropdown, yes it's lower case i, no don't change it
                onClick={onClick}
                onKeyDown={onKeyDown}
              >
                <div className="absolute">
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
                    <>
                      {value && !disableClear ? (
                        <>{ClearIcon}</>
                      ) : (
                        <>{DefaultIcon}</>
                      )}
                    </>
                  )}
                </div>
              </Combobox.Button>
            </Combobox.Button>

            <BaseSelectOptions
              open={open}
              options={options}
              highlightedOptions={highlightedOptions}
              transitionDuration={transitionDuration}
              renderOption={renderOption}
              onTransitionEnd={() => setQuery?.('')}
            />
          </>
        )}
      </Combobox>
    );
  },
);

BaseMultiSelect.displayName = 'BaseMultiSelect';
