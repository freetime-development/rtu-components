import { FC, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside } from '@/hooks';
import {
  BaseDatePicker,
  BaseDatePickerProps,
  Icon,
  Input,
  InputProps,
} from '@/components';

type DatePickerProps = {
  inputProps: InputProps & {
    defautValue?: string;
  };
  datepickerProps?: Omit<BaseDatePickerProps, 'value' | 'onChange'>;
  isStatic?: boolean;
};

export const DatePicker: FC<DatePickerProps> = ({
  inputProps,
  datepickerProps,
  isStatic = false,
}) => {
  const { defaultValue = '', ...restInputProps } = inputProps;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { field } = useController({ name: inputProps.name, defaultValue });

  useOnClickOutside(ref, () => setOpen(false));

  const onFocus = () => {
    setOpen(true);
  };

  const controlProps = {
    value: field.value,
    onChange: field.onChange,
  };

  const props = {
    Icon: () => <Icon name="calendar" />,
    ...restInputProps,
    ...controlProps,
  };

  const dtProps = {
    ...datepickerProps,
    ...controlProps,
  };

  const dynamicDatepickerInputProps = {
    ...props,
    onFocus,
  };

  const dynamicDatepickerProps = {
    ...dtProps,
    onChange: (value: string) => {
      field.onChange(value);
      setOpen(false);
    },
  };

  return (
    <>
      {isStatic ? (
        <div
          className={twMerge(
            'flex flex-col gap-4',
            inputProps.disabled && 'pointer-events-none opacity-50',
          )}
        >
          <Input {...props} />
          <BaseDatePicker {...dtProps} />
        </div>
      ) : (
        <div className="relative w-full" ref={ref}>
          <Input
            {...dynamicDatepickerInputProps}
            containerClassName={`${open ? 'rounded-b-none' : 'rounded-b-lg'} ${
              dynamicDatepickerInputProps.containerClassName
            }`}
          />
          {open && (
            <div
              className={twMerge(
                'absolute z-10  w-full rounded-lg rounded-t-none border border-gray-9/20 bg-white',
              )}
            >
              <div className="m-4">
                <BaseDatePicker {...dynamicDatepickerProps} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DatePicker;
