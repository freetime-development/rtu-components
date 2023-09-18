import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { matchEach } from '@/utils/matchEach';

type LoadingSpinnerProps = {
  className?: string;
  color?: 'white' | 'black';
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  className,
  color = 'white',
}) => {
  const borderClassNames = matchEach(color, {
    white: 'border-white',
    black: 'border-gray-6',
  });
  return (
    <div
      className={twMerge(
        borderClassNames,
        'h-5 w-5 animate-spin rounded-full border-2 border-solid border-t-transparent',
        className,
      )}
    />
  );
};
