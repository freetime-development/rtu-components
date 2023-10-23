import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { Checkbox } from '../src/components';

type Story = StoryObj<typeof Checkbox>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Checkbox> = {
  title: 'General/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
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
    name: 'checkbox-1',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'checkbox-2',
    label: 'Checkbox label',
  },
};

export default meta;
