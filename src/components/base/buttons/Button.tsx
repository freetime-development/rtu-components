import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonVariantProps;

export const buttonVariants = cva(
  'flex relative gap-2 rounded-lg font-semibold disabled:opacity-40 disabled:pointer-events-none max-w-xs focus:outline-0 justify-center items-center',
  {
    variants: {
      intent: {
        primary: ['bg-primary', 'text-white', 'hover:bg-primary/90'],
        secondary: ['bg-secondary', 'hover:bg-secondary/80', 'text-white'],
        icon: [],
        outlined: ['border', 'border-gray-9', 'hover:bg-gray-9/20'],
        custom: [''],
      },
      size: {
        large: ['h-12', 'w-full', 'md:w-48', 'py-3', 'px-5'],
        normal: ['h-10', 'w-10', 'md:w-32', 'md:h-10', 'py-3', 'px-5'],
        small: ['h-8', 'w-8', 'md:h-8', 'md:w-8', 'py-3', 'px-5'],
        'small-nr': ['h-10', 'w-10', 'py-3', 'px-5'],
        'large-full': ['h-12', 'w-full', 'py-3', 'px-5'],
        custom: [''],
      },
      loading: {
        true: ['opacity-50', 'pointer-events-none'],
      },
      orientation: {
        normal: ['flex-row'],
        reverse: ['flex-row-reverse'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      orientation: 'normal',
      size: 'large',
    },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size,
      intent,
      orientation,
      children,
      loading,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          'group',
          buttonVariants({ size, intent, orientation }),
          className,
        )}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
