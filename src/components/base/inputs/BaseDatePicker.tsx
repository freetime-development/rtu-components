import { format, isPast, isToday, isValid } from 'date-fns';
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

export const BaseDatePicker: FC<BaseDatePickerProps> = props => {
  const { value, onChange, ...rest } = props;
  const [datePickerValue, setDatePickerValue] = useState<string | null>(
    value && isValid(new Date(value)) ? value : null,
  );
  const dateFormat = props.dateFormat || defaultFormat;

  const handleDatePickerChange = (newDate: Date) => {
    onChange(format(newDate, dateFormat));
    setDatePickerValue(format(newDate, dateFormat));
  };

  const filterDate = (date: Date) => {
    if (props.skipFilterDays) {
      return true;
    }

    if (isToday(date)) {
      return true;
    }

    return !isPast(date);
  };

  // prevents invalid user input
  useEffect(() => {
    if (value && isValid(new Date(value)) && value !== datePickerValue) {
      setDatePickerValue(value);
    }
  }, [value, datePickerValue]);

  return (
    <ReactDatePicker
      inline
      selected={datePickerValue ? new Date(datePickerValue) : null}
      onChange={handleDatePickerChange}
      calendarClassName={props.calendarClassName ?? 'rt-datepicker'}
      filterDate={filterDate}
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
        intent="icon"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <Icon name="arrow-left2" />
      </Button>

      <span>{format(date, 'MMMM yyyy')}</span>

      <Button
        size="small"
        intent="icon"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <Icon name="arrow-right2" />
      </Button>
    </div>
  );
};
