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
  intent: 'secondary',
  size: 'large',
};

export const Link = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { size, intent, orientation, children, className, icon, ...restProps },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        className={twMerge(
          buttonVariants({ ...variantDefaults, orientation, intent, size }),
          className,
        )}
        {...restProps}
      >
        {children && <div className="buttonContent">{children}</div>}
        {icon && (
          <div className={twMerge(`icon-${icon}`, 'h-3 w-auto md:h-4')}></div>
        )}
      </a>
    );
  },
);

Link.displayName = 'Link';
