import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../src/components';

type Story = StoryObj<typeof Divider>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Divider> = {
  title: 'General/Divider',
  component: Divider,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};

export default meta;
