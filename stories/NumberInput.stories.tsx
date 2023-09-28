import type { Meta, StoryObj } from '@storybook/react';
import { BaseInput, Icon } from '../src/components';

type Story = StoryObj<typeof BaseInput>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseInput> = {
  title: 'Form/Base/NumberInput',
  component: BaseInput,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Clean: Story = {
  args: {
    name: 'Number-input',
    label: 'Number Input',
    type: 'number',
    placeholder: 'Type some Number',
  },
};

export const CleanDisabled: Story = {
  args: {
    name: 'Number-input',
    label: 'Number Input',
    type: 'number',
    placeholder: 'Type some Number',
    disabled: true,
  },
};

export const CleanWithError: Story = {
  args: {
    name: 'Number-input',
    label: 'Number Input',
    type: 'number',
    placeholder: 'Type some Number',
    error: true,
  },
};

export const Neo: Story = {
  args: {
    name: 'Number-input',
    label: 'Number Input',
    type: 'number',
    placeholder: 'Type some Number',
    className: 'nm-inset-white',
    Icon: () => <Icon name="sort-numeric-asc" />,
  },
};

export const NeoWithError: Story = {
  args: {
    name: 'Number-input',
    label: 'Number Input',
    type: 'number',
    placeholder: 'Type some Number',
    className: 'nm-inset-white',
    Icon: () => <Icon name="sort-numeric-asc" className="text-error" />,
    error: true,
  },
};

export default meta;
