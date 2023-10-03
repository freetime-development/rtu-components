import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { MultiSelect } from '../src/components';

type Story = StoryObj<typeof MultiSelect>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MultiSelect> = {
  title: 'General/MultiSelect',
  component: MultiSelect,
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
    name: 'multi-select',
    isLoading: false,
    options: [
      { label: 'option 1', value: 'option-1' },
      { label: 'option 2', value: 'option-2' },
      { label: 'option 3', value: 'option-3' },
    ],
  },
};

export default meta;