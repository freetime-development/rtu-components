import type { Meta, StoryObj } from '@storybook/react';
import { BaseInput, Field } from '../src/components';

type Story = StoryObj<typeof Field>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Field> = {
  title: 'Form/Base/Field',
  component: Field,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Clean: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input',
    children: <BaseInput name="input" />,
  },
};

export const WithError: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with error',
    error: 'Someting went wrong',
    children: <BaseInput name="input" error={true} />,
  },
};

export const WithTooltip: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with a tooltip',
    tooltip: 'This is a tooltip',
    children: <BaseInput name="input" />,
  },
};

export default meta;
