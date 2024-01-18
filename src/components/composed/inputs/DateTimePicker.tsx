import { useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  BaseDatePicker,
  BaseInput,
  BaseTimePicker,
  Field,
  FieldProps,
  Icon,
  Validation,
} from '@/components';
import { getMeridiemnTime, useOnClickOutside } from '@/hooks';
import { useFormError } from '@/utils';

type DateTimePickerProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'defaultValue'
> &
  FieldProps & {
    name: string;
    validation: Validation;
    defaultValue?: string | null;
    skipFilterDays?: boolean;
    tooltip?: string | null;
    fieldClassName?: string;
  };

export const DateTimePicker = ({
  name,
  validation,
  defaultValue,
  label,
  placeholder,
  disabled,
  skipFilterDays,
  tooltip,
  fieldClassName,
  renderError,
  renderHint,
  hint,
}: DateTimePickerProps) => {
  const [open, setOpen] = useState<'date' | 'time' | null>(null);
  const [time, setTime] = useState(
    defaultValue ? defaultValue?.split(',')[1] : '',
  );
  const [date, setDate] = useState(
    defaultValue ? defaultValue?.split(',')[0] : '',
  );

  const rules = validation?.rules;
  const error = useFormError(name);
  const { field } = useController({ name, defaultValue, rules });

  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(null));

  const onFocusDate = () => {
    setOpen('date');
  };

  const onFocusTime = () => {
    setOpen('time');
  };

  const handleDateChange = (date: string) => {
    field.onChange(`${date}, ${time}`);
    setDate(date);
  };

  const handleTimeChange = (time: string) => {
    const meridiemTime = getMeridiemnTime(time);
    field.onChange(`${date}, ${meridiemTime}`);
    setTime(time);
  };

  return (
    <div className="relative" ref={ref}>
      <Field
        name={name}
        label={label}
        tooltip={tooltip}
        error={error}
        renderError={renderError}
        hint={hint}
        renderHint={renderHint}
        className={fieldClassName}
      >
        <div className="flex">
          <BaseInput
            ref={field.ref}
            id={`${name}-date`}
            name={`${name}-date`}
            value={date}
            placeholder={placeholder}
            renderLeft={className => (
              <Icon name="calendar" className={className} />
            )}
            onChange={e => {
              setDate(e.target.value);
            }}
            onBlur={field.onBlur}
            onFocus={onFocusDate}
            disabled={disabled}
            className={twMerge(
              'rounded-lg rounded-r-none border',
              open ? 'rounded-b-none' : 'rounded-b-lg',
            )}
          />
          <BaseInput
            ref={field.ref}
            id={`${name}-time`}
            name={`${name}-time`}
            value={time}
            renderLeft={className => (
              <Icon name="alarm" className={className} />
            )}
            placeholder={placeholder}
            onChange={e => {
              setTime(e.target.value);
            }}
            onBlur={field.onBlur}
            onFocus={onFocusTime}
            disabled={disabled}
            className={twMerge(
              'rounded-lg rounded-l-none border-l-0',
              open ? 'rounded-b-none' : 'rounded-b-lg',
            )}
          />
        </div>
      </Field>
      <div
        className={twMerge(
          'absolute z-10 w-full hover:border-gray-9/20 focus:border-gray-9/20',
          open
            ? 'rounded-lg rounded-t-none border border-gray-9/20'
            : 'rounded-t-lg border-gray-9/10',
        )}
      >
        {open && (
          <>
            {open === 'date' && (
              <div className="m-4">
                <BaseDatePicker
                  locale="en"
                  key={field.name}
                  name={field.name}
                  skipFilterDays={skipFilterDays}
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            )}
            {open === 'time' && (
              <BaseTimePicker
                key={field.name}
                name={field.name}
                value={time}
                onChange={handleTimeChange}
                open={open === 'time'}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
