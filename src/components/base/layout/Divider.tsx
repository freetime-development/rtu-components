import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type DividerProps = {
  className?: string;
};

export const Divider: FC<DividerProps> = ({ className }) => (
  <div
    className={twMerge('h-[1px] w-full bg-black/10 shadow-sm', className)}
  ></div>
);
