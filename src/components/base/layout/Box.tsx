import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps extends PropsWithChildren {
  className?: string;
}

export const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge('rounded-lg bg-gray-2/10 shadow-md', className)}>
      {children}
    </div>
  );
};
