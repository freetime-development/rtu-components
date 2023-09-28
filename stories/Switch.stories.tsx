import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components';

type Story = StoryObj<typeof Switch>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Switch> = {
  title: 'Form/Base/Switch',
  component: Switch,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    options: [
      { label: 'option-1', value: 'option-1' },
      { label: 'option-2', value: 'option-2' },
      { label: 'option-3', value: 'option-3' },
    ],
    value: 'option-1',
  },
};

export default meta;
