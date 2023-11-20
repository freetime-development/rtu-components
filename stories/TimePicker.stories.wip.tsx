import type { Meta, StoryObj } from '@storybook/react';
import { BaseTimePicker } from '../src/components';

type Story = StoryObj<typeof BaseTimePicker>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseTimePicker> = {
  title: 'Form/Base/TimePicker',
  component: BaseTimePicker,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'timepicker',
    open: true,
  },
};

export default meta;
