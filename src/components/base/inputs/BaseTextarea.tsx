import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ComponentVariantState,
  ComponentVariantType,
  getComponentStateVariants,
} from '@/css/variants/stateVariants';

export type BaseTextAreaProps = React.HTMLProps<HTMLTextAreaElement> & {
  name: string;
  error?: boolean;
};

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  ({ name, error, className, ...props }, ref) => {
    const { inputStateVariants } = getComponentStateVariants(
      ComponentVariantType.TEXTAREA,
      error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
    );

    return (
      <textarea
        ref={ref}
        id={name}
        name={name}
        className={twMerge(
          'flex w-full p-3 outline-none appearance-none bg-transparent rounded-lg',
          inputStateVariants,
          className,
        )}
        {...props}
      />
    );
  },
);
