import type { Meta, StoryObj } from '@storybook/react';
import { BaseCheckbox } from '../src/components';

type Story = StoryObj<typeof BaseCheckbox>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseCheckbox> = {
  title: 'Form/Base/Checkbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const XL: Story = {
  args: {
    size: 'xl',
    name: 'checkbox-1',
    checked: true,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    name: 'checkbox-2',
    checked: true,
  },
};

export const Normal: Story = {
  args: {
    name: 'checkbox-3',
    checked: true,
  },
};

export const Small: Story = {
  args: {
    name: 'checkbox-4',
    size: 'small',
    checked: true,
  },
};

export const UnChecked: Story = {
  args: {
    name: 'checkbox-5',
    checked: false,
  },
};

export const Error: Story = {
  args: {
    name: 'checkbox-6',
    error: true,
  },
};

export const CheckedWithError: Story = {
  args: {
    checked: true,
    name: 'checkbox-7',
    error: true,
  },
};

export const Hover: Story = {
  args: {
    name: 'checkbox-8',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Focus: Story = {
  args: {
    name: 'checkbox-9',
  },
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};

export default meta;
