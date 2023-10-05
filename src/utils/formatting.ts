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
  locales: string | string[],
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
