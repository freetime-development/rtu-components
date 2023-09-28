import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { RecursiveTree, createTree } from '../src/components';
import { nodesMock } from './mocks/nodes';

type Story = StoryObj<typeof RecursiveTreeGenerator>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RecursiveTreeGenerator> = {
  title: 'General/RecursiveTree',
  component: RecursiveTreeGenerator,
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
export const RecursiveTreeStory: Story = {
  args: {},
};

function RecursiveTreeGenerator() {
  const tree = createTree(nodesMock, null, () => {
    return 0;
  });
  return <RecursiveTree tree={tree} />;
}

export default meta;
