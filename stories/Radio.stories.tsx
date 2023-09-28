import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../src/components';

type Story = StoryObj<typeof Radio>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Radio> = {
  title: 'Form/Base/Radio',
  component: Radio,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Checked: Story = {
  args: {
    name: 'radio',
    checked: true,
  },
};

export const UnChecked: Story = {
  args: {
    name: 'radio',
    checked: false,
  },
};

export const WithLabel: Story = {
  args: {
    name: 'radio',
    checked: false,
    label: 'Checkito!',
  },
};

export default meta;
