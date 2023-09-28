import type { Meta, StoryObj } from '@storybook/react';
import { RadioOption } from '../src/components';

type Story = StoryObj<typeof RadioOption>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RadioOption> = {
  title: 'Form/Base/RadioOption',
  component: RadioOption,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Checked: Story = {
  args: {
    name: 'radio-1',
    checked: true,
  },
};

export const UnChecked: Story = {
  args: {
    name: 'radio-2',
    checked: false,
  },
};

export const WithLabel: Story = {
  args: {
    name: 'radio-3',
    checked: false,
    label: 'Checkito!',
  },
};

export default meta;
