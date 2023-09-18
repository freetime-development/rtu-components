import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type CenteredMaxwContainerProps = PropsWithChildren & {
  className?: string;
};

export const CenteredMaxwContainer: FC<CenteredMaxwContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'mx-auto sm:max-w-3xl md:max-w-5xl desktop:max-w-7xl',
        className,
      )}
    >
      {children}
    </div>
  );
};
