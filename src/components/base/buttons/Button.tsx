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
  'flex relative gap-2 rounded-lg font-semibold disabled:opacity-40 disabled:pointer-events-none focus:outline-0 justify-center items-center',
  {
    variants: {
      intent: {
        primary: ['bg-primary', 'text-white', 'hover:bg-primary/90'],
        secondary: ['bg-secondary', 'text-white', 'hover:bg-secondary/80'],
        icon: [],
        outlined: ['border', 'border-gray', 'hover:bg-gray/20'],
        custom: [''],
      },
      size: {
        full: ['w-full', 'py-3', 'px-5'],
        large: ['md:w-48', 'py-3', 'px-5'],
        normal: ['md:w-32', 'py-3', 'px-5'],
        small: ['h-8', 'w-8', 'py-3', 'px-5'],
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
          buttonVariants({ size, intent, orientation, loading }),
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
