import type { Meta, StoryObj } from '@storybook/react';
import { Button, Icon } from '../src/components';

type Story = StoryObj<typeof Button>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimaryLarge: Story = {
  args: {
    size: 'large',
    children: 'Click me!',
  },
};

export const PrimaryNormal: Story = {
  args: {
    children: 'Click me!',
  },
};

export const PrimarySmall: Story = {
  args: {
    size: 'small',
    children: 'Click me!',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        Click me! <Icon name="plus" size="sm" />
      </>
    ),
  },
};

export const PrimaryWithIconReversed: Story = {
  args: {
    variant: 'primary',
    orientation: 'reverse',
    children: (
      <>
        Click me! <Icon name="plus" size="sm" />
      </>
    ),
  },
};

export const SecondaryLarge: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    children: 'Click me!',
  },
};

export const SecondaryNormal: Story = {
  args: {
    variant: 'secondary',
    children: 'Click me!',
  },
};

export const SecondarySmall: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    children: 'Click me!',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        Click me! <Icon name="plus" size="sm" />
      </>
    ),
  },
};

export const SecondaryWithIconReversed: Story = {
  args: {
    variant: 'secondary',
    orientation: 'reverse',
    children: (
      <>
        Click me! <Icon name="plus" size="sm" />
      </>
    ),
  },
};

export const OutlinedLarge: Story = {
  args: {
    variant: 'outlined',
    size: 'large',
    children: 'Click me!',
  },
};

export const OutlinedNormal: Story = {
  args: {
    variant: 'outlined',
    children: 'Click me!',
  },
};

export const OutlinedSmall: Story = {
  args: {
    variant: 'outlined',
    size: 'small',
    children: 'Click me!',
  },
};

export const OutlinedWithIcon: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        Click me! <Icon name="plus" size="sm" />
      </>
    ),
  },
};

export const OutlinedWithIconReversed: Story = {
  args: {
    variant: 'outlined',
    orientation: 'reverse',
    children: (
      <>
        Click me! <Icon name="plus" size="sm" />
      </>
    ),
  },
};

export const Neumorphism: Story = {
  args: {
    variant: 'custom',
    size: 'custom',
    className:
      'nm-convex-white w-10 h-10 text-gray-2 items-center justify-center active:shadow-md transition ease-in-out duration-200 group-active:scale-105',
    children: (
      <Icon
        name="plus"
        className="absolute rounded-lg text-gray-6 transition duration-200 ease-in-out focus:text-primary group-active:scale-105 group-active:text-secondary"
      />
    ),
  },
};

export const NeumorphismRound: Story = {
  args: {
    variant: 'custom',
    size: 'custom',
    className:
      'nm-convex-white rounded-full w-10 h-10 text-gray-2 items-center justify-center active:shadow-md transition ease-in-out duration-200 group-active:scale-105',
    children: (
      <Icon
        name="minus"
        className="absolute rounded-full text-gray-6 transition duration-200 ease-in-out focus:text-primary group-active:scale-105 group-active:text-error"
      />
    ),
  },
};

export default meta;
