import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { useOnClickOutside } from '@/hooks';
import { BaseDatePicker, Icon, Input, Validation } from '@/components';

interface DatePickerProps {
  name: string;
  label?: string;
  locale?: string;
  placeholder?: string;
  errorMessage?: string;
  defaultValue?: string | null;
  tooltip?: string | null;
  disabled?: boolean;
  className?: string;
  excludeDates?: Date[];
  highlightDates?: Array<Date | { [key: string]: Date[] }>;
  skipFilterDays?: boolean;
  validation?: Validation;
  isStatic?: boolean;
  selectedFirstDate?: string;
}

export const DatePicker: FC<DatePickerProps> = props => {
  const { name, defaultValue = '', isStatic = false } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { field } = useController({ name, defaultValue });

  const datepickerProps = {
    ...props,
    locale: 'en',
    value: field.value,
    onChange: field.onChange,
    Icon: () => <Icon name="calendar" />,
  };

  useOnClickOutside(ref, () => setOpen(false));

  const onFocus = () => {
    setOpen(true);
  };

  const dynamicDatepickerInputProps = {
    ...datepickerProps,
    onFocus,
  };

  return (
    <>
      {isStatic ? (
        <div
          className={classNames('flex flex-col gap-4', {
            'pointer-events-none opacity-50': props.disabled,
          })}
        >
          <Input {...props} />
          <BaseDatePicker {...datepickerProps} />
        </div>
      ) : (
        <div className="relative" ref={ref}>
          <Input
            {...dynamicDatepickerInputProps}
            className={open ? 'rounded-b-none' : 'rounded-b-lg'}
          />
          {open && (
            <div
              className={classNames(
                'absolute z-10  w-full rounded-lg rounded-t-none border border-gray-9/20 bg-white',
              )}
            >
              <div className="m-4">
                <BaseDatePicker {...datepickerProps} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DatePicker;
