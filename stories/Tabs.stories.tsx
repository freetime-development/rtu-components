import type { Meta, StoryObj } from '@storybook/react';
import { twMerge } from 'tailwind-merge';
import { Tabs } from '../src/components';

type Story = StoryObj<typeof Tabs>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tabs> = {
  title: 'Form/Base/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    options: [
      { label: 'option-1', value: 'option-1' },
      { label: 'option-2', value: 'option-2' },
      { label: 'option-3', value: 'option-3' },
    ],
    value: 'option-1',
  },
};

export const PrimaryVertical: Story = {
  args: {
    orientation: 'vertical',
    containerClassName: 'w-48',
    options: [
      { label: 'option-1', value: 'option-1' },
      { label: 'option-2', value: 'option-2' },
      { label: 'option-3', value: 'option-3' },
    ],
    value: 'option-1',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    options: [
      { label: 'option-1', value: 'option-1' },
      { label: 'option-2', value: 'option-2' },
      { label: 'option-3', value: 'option-3' },
    ],
    value: 'option-2',
  },
};

export const SecondaryVertical: Story = {
  args: {
    containerClassName: 'w-48',
    orientation: 'vertical',
    variant: 'secondary',
    options: [
      { label: 'option-1', value: 'option-1' },
      { label: 'option-2', value: 'option-2' },
      { label: 'option-3', value: 'option-3' },
    ],
    value: 'option-2',
  },
};

export const CustomCol: Story = {
  args: {
    containerClassName: 'flex flex-col',
    options: [
      { label: 'option-1', value: 'option-1' },
      { label: 'option-2', value: 'option-2' },
      { label: 'option-3', value: 'option-3' },
    ],
    value: 'option-3',
    renderOption: (option, isSelected, isFirst, isLast) => {
      return (
        <button
          className={twMerge(
            'p-2 border border-b-0 w-48',
            isSelected && 'bg-gray-300',
            isFirst && 'rounded-t-lg',
            isLast && 'border-b rounded-b-lg',
          )}
        >
          {option.label}
        </button>
      );
    },
  },
};

export const CustomRow: Story = {
  args: {
    options: [
      { label: 'option-1', value: 'option-1' },
      { label: 'option-2', value: 'option-2' },
      { label: 'option-3', value: 'option-3' },
    ],
    value: 'option-3',
    renderOption: (option, isSelected, isFirst, isLast) => {
      return (
        <button
          className={twMerge(
            'p-2 border border-b-none w-40',
            isSelected && 'bg-gray-300',
            isFirst && 'rounded-l-lg',
            isLast && 'rounded-r-lg',
          )}
        >
          {option.label}
        </button>
      );
    },
  },
};
export default meta;
