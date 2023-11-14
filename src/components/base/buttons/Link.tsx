import { AnchorHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonVariantProps, buttonVariants } from './Button';

type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  ButtonVariantProps & {
    icon?: string;
  };

const variantDefaults: ButtonVariantProps = {
  variant: 'secondary',
  size: 'normal',
};

export const Link = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { size, variant, orientation, children, className, icon, ...props },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        className={twMerge(
          buttonVariants({ ...variantDefaults, orientation, variant, size }),
          className,
        )}
        {...props}
      >
        {children}
        {icon && (
          <div className={twMerge(`icon-${icon}`, 'h-3 w-auto md:h-4')}></div>
        )}
      </a>
    );
  },
);

Link.displayName = 'Link';
