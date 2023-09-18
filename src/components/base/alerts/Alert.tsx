import { cva, VariantProps } from 'class-variance-authority';
import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { CommunicationType } from '../..';
import { matchEach } from '@/utils/matchEach';

export type AlertVariantProps = VariantProps<typeof alert>;
type AlertProps = PropsWithChildren & {
  variant?: AlertVariantProps;
  className?: string;
};

const variantDefaults: AlertVariantProps = { type: 'warning' };
const alert = cva('flex gap-5 w-full px-5 py-3 rounded-lg items-center', {
  variants: {
    type: {
      info: ['bg-info', 'text-white'],
      warning: ['bg-warning', 'text-white'],
      error: ['bg-error', 'text-white'],
      success: ['bg-success', 'text-white'],
    },
  },
  defaultVariants: {
    type: 'warning',
  },
});

export const Alert: FC<AlertProps> = ({ children, variant, className }) => {
  const variants = { ...variantDefaults, ...variant };

  const icon = matchEach(variants.type as CommunicationType, {
    info: 'info',
    error: 'fire',
    warning: 'warning',
    success: 'checkmark',
    custom: '',
  });

  return (
    <div className={twMerge(alert(variants), className)}>
      {variant && <i className={twMerge(`icon-${icon}`)} />}
      {children}
    </div>
  );
};
