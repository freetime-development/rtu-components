import { DateTime } from 'luxon';
import { FC, useEffect, useState } from 'react';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from 'react-datepicker';
import { Button, Icon } from '@/components';

export type {
  ReactDatePickerProps,
  ReactDatePickerCustomHeaderProps,
  CalendarContainerProps,
} from 'react-datepicker';

const defaultFormat = 'yyyy-MM-dd';

export interface BaseDatePickerProps
  extends Omit<ReactDatePickerProps, 'onChange'> {
  skipFilterDays?: boolean;
  onChange: (value: string) => void;
  dateFormat?: string;
}

function getValidDate(value?: string, format: string = defaultFormat) {
  if (!value) {
    return null;
  }
  const date = DateTime.fromFormat(value, format);

  return date.isValid ? date.toJSDate() : null;
}

export const BaseDatePicker: FC<BaseDatePickerProps> = props => {
  const { value, onChange, ...rest } = props;
  const dateFormat = props.dateFormat || defaultFormat;
  const sanitizedDate = getValidDate(value, dateFormat);
  const [date, setDate] = useState<Date | null>(sanitizedDate);

  const handleDatePickerChange = (newDate: Date) => {
    const formattedDate = DateTime.fromJSDate(newDate).toFormat(dateFormat);
    onChange(formattedDate);
    setDate(newDate);
  };

  // prevents invalid user input
  useEffect(() => {
    const sanitizedDate = getValidDate(value, dateFormat);
    if (sanitizedDate && sanitizedDate !== date) {
      setDate(sanitizedDate);
    }
  }, [value, date]);

  return (
    <ReactDatePicker
      inline
      selected={date}
      onChange={handleDatePickerChange}
      calendarClassName={props.calendarClassName ?? 'rt-datepicker'}
      calendarStartDay={props.calendarStartDay ?? 1}
      dateFormat={dateFormat}
      renderCustomHeader={headerProps => <DatePickerHeader {...headerProps} />}
      {...rest}
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
