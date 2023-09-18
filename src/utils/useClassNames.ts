import { twMerge } from 'tailwind-merge';
import { CommunicationType } from '@/components';
import { communicationVariants } from '@/css/variants/communication';

export function useClassNames(
  communication: CommunicationType = 'custom',
  className?: string,
  ...args: string[]
) {
  return twMerge(
    ...args,
    className,
    communicationVariants({
      error: communication === 'error',
      info: communication === 'info',
      warning: communication === 'warning',
      success: communication === 'success',
      custom: communication === 'custom',
    }),
  );
}
