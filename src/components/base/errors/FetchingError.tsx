import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

interface FetchingErrorProps {
  className?: string;
  error: boolean;
  errorMessage: string;
  refetch: () => void;
}

export function FetchingError({
  className,
  error,
  errorMessage,
  refetch,
}: FetchingErrorProps) {
  const onRefetch = useCallback(() => refetch(), [refetch]);

  if (!error) {
    return null;
  }

  return (
    <div
      className={twMerge('flex w-full items-center justify-between', className)}
    >
      <span className="p-3">{errorMessage}</span>
      <button
        type="button"
        className="group self-stretch border-l border-white/50"
      >
        <div className="flex h-14 w-14 items-center justify-center transition group-active:rotate-180">
          <i className="icon-loop2" onClick={onRefetch} />
        </div>
      </button>
    </div>
  );
}
