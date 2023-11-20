import type { Meta, StoryObj } from '@storybook/react';
import { BaseRadio } from '../src/components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Base/Radio',
  component: BaseRadio,
} satisfies Meta<typeof BaseRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const XL: Story = {
  args: {
    id: 'radio-1',
    checked: true,
    value: '1',
    name: 'radio-1',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'xl',
  },
};

export const Large: Story = {
  args: {
    id: 'radio-2',
    checked: true,
    value: '2',
    name: 'radio-2',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'large',
  },
};

export const Default: Story = {
  args: {
    id: 'radio-3',
    checked: true,
    value: '3',
    name: 'radio-3',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const Small: Story = {
  args: {
    id: 'radio-4',
    checked: true,
    value: '4',
    name: 'radio-4',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'small',
  },
};

export const UnChecked: Story = {
  args: {
    id: 'radio-5',
    value: '5',
    name: 'radio-5',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const Hover: Story = {
  args: {
    id: 'radio-5',
    value: '5',
    name: 'radio-5',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Focus: Story = {
  args: {
    id: 'radio-5',
    value: '5',
    name: 'radio-5',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};

export const Error: Story = {
  args: {
    id: 'radio-6',
    checked: true,
    error: true,
    value: '6',
    name: 'radio-6',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};
