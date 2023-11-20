import { VariantProps, cva } from 'class-variance-authority';

export type BaseSelectVariants = VariantProps<typeof selectSizeVariants>;

export const selectSizeVariants = cva('', {
  variants: {
    size: {
      large: ['py-3', 'px-5', 'text-lg'],
      normal: ['py-2.5', 'px-4', 'text-base'],
      small: ['py-2', 'px-3', 'text-sm'],
      custom: [''],
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export const selectSideItemVariants = cva(
  'flex items-center border-0 justify-center',
  {
    variants: {
      size: {
        large: ['text-lg', '1.25rem'],
        normal: ['text-base', '1rem'],
        small: ['text-xs', '0.75rem'],
        custom: [''],
      },
      orientation: {
        left: ['pr-2'],
        right: ['pl-2'],
      },
    },
    defaultVariants: {
      size: 'normal',
      orientation: 'left',
    },
  },
);
