import type { Meta, StoryObj } from '@storybook/react';
import { FadeIn } from '../src/components';

type Story = StoryObj<typeof FadeIn>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FadeIn> = {
  title: 'General/FadeIn',
  component: FadeIn,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Fade in',
    className: 'bg-primary p-3 rounded-xl text-white max-w-sm',
    delay: 500,
  },
};

export default meta;
