import type { Meta, StoryObj } from '@storybook/react';
import { BaseTextArea } from '../src/components';

type Story = StoryObj<typeof BaseTextArea>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseTextArea> = {
  title: 'Form/Base/TextArea',
  component: BaseTextArea,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const First: Story = {
  args: {
    name: 'textarea',
    label: 'TextArea',
    placeholder: 'Give me your life story',
  },
};

export const Second: Story = {
  args: {
    name: 'textarea',
    label: 'TextArea',
    placeholder: 'Give me your life story',
    rows: 5,
    cols: 10,
  },
};

export default meta;
