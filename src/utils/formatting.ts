import { DateTime, DateTimeOptions } from 'luxon';

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

export function formatNum(
  number: number | bigint,
  options?: Intl.NumberFormatOptions,
  locales?: string | string[],
) {
  return new Intl.NumberFormat(locales, options).format(number);
}

export function formatCurrency(
  currency: string,
  amount: number,
  locales?: string | string[],
  options?: Intl.NumberFormatOptions,
) {
  return formatNum(
    amount,
    {
      style: 'currency',
      currency,
      ...options,
    },
    locales,
  );
}

export function formatDate(
  date: string | Date | number,
  format: string = DEFAULT_DATE_FORMAT,
  opts?: DateTimeOptions,
) {
  if (typeof date === 'number') {
    return DateTime.fromMillis(date, opts).toFormat(format);
  }

  if (date instanceof Date) {
    return DateTime.fromJSDate(date, opts).toFormat(format);
  }

  if (typeof date === 'string') {
    return DateTime.fromISO(date, opts).toFormat(format);
  }

  return date;
}
