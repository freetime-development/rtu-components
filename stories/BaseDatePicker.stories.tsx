import type { Meta, StoryObj } from '@storybook/react';
import { BaseDatePicker } from '../src/components';

type Story = StoryObj<typeof BaseDatePicker>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseDatePicker> = {
  title: 'Form/Base/DatePicker',
  component: BaseDatePicker,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'datepicker',
  },
};

export default meta;
