import type { Meta, StoryObj } from '@storybook/react';
import { BaseFileInput } from '../src/components';

type Story = StoryObj<typeof BaseFileInput>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseFileInput> = {
  title: 'Form/Base/BaseFileInput',
  component: BaseFileInput,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'file',
    children: 'Upload',
    multiple: true,
    className: 'w-32 h-32 border border-gray-300 rounded-lg',
  },
};

export default meta;
