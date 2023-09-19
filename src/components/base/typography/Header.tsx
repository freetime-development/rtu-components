import { cva, VariantProps } from 'class-variance-authority';
import {
  createElement,
  DetailedHTMLProps,
  forwardRef,
  HtmlHTMLAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';

export type HeaderVariantProps = VariantProps<typeof typographyVariants>;
export type HeaderProps = DetailedHTMLProps<
  HtmlHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> &
  HeaderVariantProps;

const defaultVariant = 'h1';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: ['font-bold', 'leading-tight', 'text-4xl'],
      h2: ['font-bold', 'leading-tight', 'text-3xl'],
      h3: ['font-bold', 'leading-tight', 'text-2xl'],
      h4: ['font-bold', 'leading-tight', 'text-xl'],
      h5: ['font-bold', 'leading-tight', 'text-md'],
    },
  },
  defaultVariants: {
    variant: defaultVariant,
  },
});

export const Header = forwardRef<HTMLHeadingElement, HeaderProps>(
  ({ className, variant, children, ...rest }, ref) => {
    const css = twMerge(typographyVariants({ variant }), className);
    const tag = variant ?? defaultVariant;

    return createElement(tag, { className: css, ...rest, ref }, children);
  },
);

Header.displayName = 'Header';
