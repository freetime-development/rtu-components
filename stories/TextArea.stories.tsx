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
export const Default: Story = {
  args: {
    name: 'textarea',
    label: 'TextArea',
    placeholder: "Tell us something nice about yourself, don't be shy",
  },
};

export const With5Rows: Story = {
  args: {
    name: 'textarea',
    label: 'TextArea',
    placeholder: "Tell us something nice about yourself, don't be shy",
    rows: 5,
    cols: 10,
  },
};

export const WithError: Story = {
  args: {
    name: 'textarea',
    label: 'TextArea',
    error: true,
    placeholder: "Tell us something nice about yourself, don't be shy",
  },
};

export default meta;
