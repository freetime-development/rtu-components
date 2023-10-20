import { PropsWithChildren, FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../icons';

interface ChipProps extends PropsWithChildren {
  onRemove: () => void;
  className?: string;
}

export const Chip: FC<ChipProps> = ({ children, onRemove, className = '' }) => {
  return (
    <button
      className={twMerge(
        `flex items-center justify-center rounded-lg bg-primary-50 py-1 px-2 mr-2 h-8 ${className}`,
      )}
      onClick={onRemove}
    >
      {children}
      <Icon name="cross" className="ml-2 text-gray-2" size="xs" />
    </button>
  );
};
