import { PropsWithChildren, FC, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface ChipProps extends PropsWithChildren {
  onRemove: () => void;
  className?: string;
}

export const Chip: FC<ChipProps> = ({ children, onRemove, className = '' }) => {
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove();
  };
  return (
    <button
      className={twMerge(
        `flex items-center justify-center rounded-lg bg-primary-50 py-1 px-2 my-1 mx-1 h-8 ${className}`,
      )}
      onClick={handleRemove}
    >
      {children}
    </button>
  );
};
