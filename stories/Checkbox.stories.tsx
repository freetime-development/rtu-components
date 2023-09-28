import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components';

type Story = StoryObj<typeof Checkbox>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Checkbox> = {
  title: 'Form/Base/Checkbox',
  component: Checkbox,
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

export const WithLabel: Story = {
  args: {
    name: 'checkbox-3',
    checked: false,
    label: 'Checkito!',
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
