import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../src/components';

type Story = StoryObj<typeof Icon>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Icon> = {
  title: 'General/Icon',
  component: Icon,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Icomoon: Story = {
  args: {
    name: 'alarm',
  },
};

export default meta;
