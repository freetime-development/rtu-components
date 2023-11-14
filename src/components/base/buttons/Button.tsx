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
      variant: {
        primary: [
          'bg-primary',
          'text-white',
          'hover:bg-primary/90',
          'active:bg-primary-700',
        ],
        secondary: [
          'bg-secondary',
          'text-white',
          'hover:bg-secondary/90',
          'active:bg-secondary-700',
        ],
        outlined: [
          'border',
          'border-gray-200',
          'hover:border-gray',
          'active:border-gray-300',
          'text-gray',
        ],
        custom: [''],
      },
      size: {
        full: ['w-full', 'py-3', 'px-5'],
        large: ['py-3', 'px-5', 'text-lg'],
        normal: ['py-2.5', 'px-4', 'text-base'],
        small: ['py-2', 'px-3', 'text-sm'],
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
      variant: 'primary',
      orientation: 'normal',
      size: 'normal',
    },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size,
      variant,
      orientation,
      children,
      loading,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          'group',
          buttonVariants({ size, variant, orientation, loading }),
          className,
        )}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
