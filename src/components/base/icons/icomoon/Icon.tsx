import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconName } from './icomoon';

export interface IconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  name: IconName;
  prefix?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Icon: FC<IconProps> = ({
  name,
  className,
  size = 'md',
  prefix = 'icon',
}) => {
  return (
    <i className={twMerge(`${prefix}-${name}`, `text-${size}`, className)} />
  );
};
