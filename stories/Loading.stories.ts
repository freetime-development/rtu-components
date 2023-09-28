import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../src/components';

type Story = StoryObj<typeof LoadingSpinner>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LoadingSpinner> = {
  title: 'General/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Spinner: Story = {
  args: {
    color: 'black',
  },
};

export default meta;
