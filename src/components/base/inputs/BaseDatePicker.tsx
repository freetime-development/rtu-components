import { DateTime } from 'luxon';
import { FC, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import type {
  DatePickerProps as ReactDatePickerProps,
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { Button, Icon } from '@/components';

export type {
  DatePickerProps as ReactDatePickerProps,
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';

type SingleDatePickerProps = Exclude<
  ReactDatePickerProps,
  { selectsRange: true } | { selectsMultiple: true }
>;

const defaultFormat = 'yyyy-MM-dd';

export interface BaseDatePickerProps
  extends Omit<SingleDatePickerProps, 'onChange' | 'selected' | 'value'> {
  skipFilterDays?: boolean;
  onChange: (value: string) => void;
  dateFormat?: string;
  value?: string;
}

function getValidDate(value?: string, format: string = defaultFormat) {
  if (!value) {
    return null;
  }
  const date = DateTime.fromFormat(value, format);

  return date.isValid ? date.toJSDate() : null;
}

export const BaseDatePicker: FC<BaseDatePickerProps> = props => {
  const {
    value,
    onChange,
    skipFilterDays: _skipFilterDays,
    dateFormat: dateFormatProp,
    ...rest
  } = props;
  void _skipFilterDays;
  const dateFormat = dateFormatProp || defaultFormat;
  const sanitizedDate = getValidDate(value, dateFormat);
  const [date, setDate] = useState<Date | null>(sanitizedDate);
  const pickerProps = rest as SingleDatePickerProps;

  const handleDatePickerChange = (newDate: Date | null) => {
    if (!newDate) {
      onChange('');
      setDate(null);
      return;
    }

    const formattedDate = DateTime.fromJSDate(newDate).toFormat(dateFormat);
    onChange(formattedDate);
    setDate(newDate);
  };

  // prevents invalid user input
  useEffect(() => {
    const nextDate = getValidDate(value, dateFormat);

    setDate(prev => {
      if (!nextDate) {
        return prev === null ? prev : null;
      }

      if (prev && nextDate && prev.getTime() === nextDate.getTime()) {
        return prev;
      }

      return nextDate;
    });
  }, [value, dateFormat]);

  return (
    <ReactDatePicker
      inline
      selected={date}
      onChange={handleDatePickerChange}
      calendarClassName={props.calendarClassName ?? 'rt-datepicker'}
      calendarStartDay={props.calendarStartDay ?? 1}
      dateFormat={dateFormat}
      renderCustomHeader={headerProps => <DatePickerHeader {...headerProps} />}
      {...pickerProps}
    />
  );
};

export default BaseDatePicker;

const DatePickerHeader: FC<ReactDatePickerCustomHeaderProps> = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  return (
    <div className="flex items-center justify-between justify-items-center">
      <Button
        size="small"
        variant="custom"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <Icon name="arrow-left2" />
      </Button>

      <span>{DateTime.fromJSDate(date).toFormat('MMMM yyyy')}</span>

      <Button
        size="small"
        variant="custom"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <Icon name="arrow-right2" />
      </Button>
    </div>
  );
};
