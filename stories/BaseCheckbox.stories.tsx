import type { Meta, StoryObj } from '@storybook/react';
import { BaseCheckbox } from '../src/components';

type Story = StoryObj<typeof BaseCheckbox>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseCheckbox> = {
  title: 'Form/Base/BaseCheckbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Checked: Story = {
  args: {
    name: 'checkbox-1',
    checked: true,
  },
};

export const UnChecked: Story = {
  args: {
    name: 'checkbox-2',
    checked: false,
  },
};

export const WithError: Story = {
  args: {
    name: 'checkbox-3',
    checked: false,
    error: true,
  },
};

export default meta;
