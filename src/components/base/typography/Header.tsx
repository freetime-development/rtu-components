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
      h1: ['font-bold, leading-tight, font-3xl'],
      h2: ['font-bold, leading-tight, font-2xl'],
      h3: ['font-bold, leading-tight, font-xl'],
      h4: ['font-bold, leading-tight, font-md'],
      h5: ['font-bold, leading-tight, font-sm'],
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
