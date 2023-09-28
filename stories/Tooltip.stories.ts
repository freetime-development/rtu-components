import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/components';

type Story = StoryObj<typeof Tooltip>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tooltip> = {
  title: 'General/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TooltipStory: Story = {
  args: {
    placement: 'right',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export default meta;
