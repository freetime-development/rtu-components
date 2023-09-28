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
export const Primary: Story = {
  args: {
    size: 'large',
    children: 'Primary Button',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    size: 'large',
    intent: 'primary',
    children: (
      <>
        Secondary Button <Icon name="plus" />
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    size: 'large',
    intent: 'secondary',
    children: 'Secondary Button',
  },
};

export const SmallWithIcon: Story = {
  args: {
    size: 'small',
    intent: 'secondary',
    children: <Icon name="plus" />,
  },
};

export const Outlined: Story = {
  args: {
    size: 'large',
    intent: 'outlined',
    children: 'Outlined Button',
  },
};

export const Neumorphism: Story = {
  args: {
    intent: 'custom',
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
    intent: 'custom',
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
