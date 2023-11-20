import { VariantProps, cva } from 'class-variance-authority';

export const labelAlignmentVariants = cva('', {
  variants: {
    size: {
      xl: ['leading-[1.25rem]'],
      large: ['leading-[1.125rem]'],
      normal: ['leading-[1rem]'],
      small: ['leading-[0.875rem]'],
      custom: [''],
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export type LabelTextVariantProps = VariantProps<typeof labelTextVariants>;
export const labelTextVariants = cva('', {
  variants: {
    size: {
      xl: ['text-lg', 'leading-8'],
      large: ['text-md', 'leading-7'],
      normal: ['text-base', 'leading-6'],
      small: ['text-sm', 'leading-5'],
      custom: [''],
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});
