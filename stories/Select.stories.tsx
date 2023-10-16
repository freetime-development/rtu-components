import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { Icon, Select } from '../src/components';

type Story = StoryObj<typeof Select>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Select> = {
  title: 'General/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 250,
      },
    },
  },
  decorators: [
    Story => {
      const form = useForm();
      return (
        <FormProvider {...form}>
          <Story />
        </FormProvider>
      );
    },
  ],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'select',
    isLoading: false,
    options: [
      { label: 'option 1', value: 'option-1' },
      { label: 'option 2', value: 'option-2' },
      { label: 'option 3', value: 'option-3' },
    ],
    ClearIcon: <Icon name="cross" />,
    DefaultIcon: <Icon name="arrow-down2" />,
  },
};

export default meta;
