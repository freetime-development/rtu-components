import { Combobox } from '@headlessui/react';
import { ForwardedRef, HTMLProps, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { BaseSelectOptions } from './BaseSelectOptions';
import {
  BaseSelectVariants,
  selectSideItemVariants,
  selectSizeVariants,
} from './variantClassNames';
import { StateButton } from './StateButton';
import { Option } from '@/components/types';
import {
  ComponentVariantState,
  ComponentVariantType,
  getComponentStateVariants,
} from '@/css/variants/stateVariants';

export type BaseSelectProps = Omit<
  HTMLProps<HTMLInputElement>,
  'value' | 'onChange' | 'ref' | 'size'
> &
  BaseSelectVariants & {
    isLoading?: boolean;
    disabled?: boolean;
    disableClear?: boolean;
    options?: Option[];
    selectedOptions?: Option[];
    value: string | null;
    name: string;
    inputClassName?: string;
    containerClassName?: string;
    optionsClassName?: string;
    optionClassName?: string;
    placeholder?: string;
    error?: boolean;
    onChange: (value: string) => void;
    setQuery?: (query: string) => void;
    clear: () => void;
    transitionDuration?: number;
    LoadingIcon?: ReactNode;
    ClearIcon?: ReactNode;
    DefaultIcon?: ReactNode;
    renderOption?: (option: Option) => ReactNode;
    renderLeft?: (
      option?: Option,
      className?: string,
      error?: boolean,
    ) => ReactNode;
  };

export const BaseSelect = forwardRef(
  (
    {
      isLoading,
      disabled,
      options,
      selectedOptions,
      disableClear,
      value,
      name,
      placeholder,
      inputClassName,
      containerClassName,
      optionsClassName,
      optionClassName,
      error,
      onChange,
      setQuery,
      clear,
      size,
      transitionDuration = 150,
      LoadingIcon,
      ClearIcon,
      DefaultIcon,
      renderOption,
      renderLeft,
    }: BaseSelectProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const { wrapperStateVariants, inputStateVariants } =
      getComponentStateVariants(
        ComponentVariantType.SELECT,
        error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
      );
    const sizeVariants = selectSizeVariants({ size });
    const sideItemVariantsLeft = selectSideItemVariants({
      size,
      orientation: 'left',
    });
    const sideItemVariantsRight = selectSideItemVariants({
      size,
      orientation: 'right',
    });

    const selectedOption = options?.find(o => o.value === value);

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
      const { value } = e.target;
      setQuery?.(value);

      if (!value) {
        onChange(value);
      }
    }

    console.log('BaseSelect', selectedOption, value);

    return (
      <Combobox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="group">
            <Combobox.Button
              as="div"
              className={twMerge(
                'flex w-full items-center',
                sizeVariants,
                wrapperStateVariants,
                open ? 'rounded-b-none' : 'rounded-b-lg',
                disabled && 'pointer-events-none opacity-40',
                containerClassName,
              )}
            >
              {renderLeft ? (
                <>{renderLeft(selectedOption, sideItemVariantsLeft, error)}</>
              ) : (
                <DefaultSelectedOption
                  selectedOption={selectedOption}
                  className={sideItemVariantsLeft}
                />
              )}

              <Combobox.Input
                name={name}
                ref={ref}
                onChange={handleInputChange}
                className={twMerge(
                  'peer flex-grow appearance-none outline-none',
                  inputStateVariants,
                  inputClassName,
                )}
                placeholder={placeholder}
                displayValue={(value: string) => {
                  return options?.find(o => o.value === value)?.label || '';
                }}
              />

              <StateButton
                className={twMerge(
                  'hidden cursor-pointer',
                  sideItemVariantsRight,
                  !disabled && 'flex items-center justify-center',
                )}
                value={value}
                disabled={disabled}
                disableClear={disableClear}
                isLoading={isLoading}
                onClick={onClick}
                onKeyDown={onKeyDown}
                ClearIcon={ClearIcon}
                DefaultIcon={DefaultIcon}
                LoadingIcon={LoadingIcon}
              />
            </Combobox.Button>

            <BaseSelectOptions
              open={open}
              options={options}
              className={sizeVariants}
              leftClassName={sideItemVariantsLeft}
              selectedOptions={selectedOptions}
              transitionDuration={transitionDuration}
              renderOption={renderOption}
              onTransitionEnd={() => setQuery?.('')}
              optionsClassName={optionsClassName}
              optionClassName={optionClassName}
              clear={clear}
            />
          </div>
        )}
      </Combobox>
    );
  },
);

BaseSelect.displayName = 'BaseSelect';

function DefaultSelectedOption({
  selectedOption,
  className,
}: {
  selectedOption?: Option;
  className?: string;
}) {
  if (!selectedOption) {
    return null;
  }

  if (selectedOption.icon) {
    return (
      <div className={className}>
        <i className={twMerge(selectedOption.icon)} />
      </div>
    );
  }

  if (selectedOption.emoji) {
    return (
      <div className={className}>
        <span>{selectedOption.emoji}</span>
      </div>
    );
  }

  return null;
}
