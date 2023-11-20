import type { Meta, StoryObj } from '@storybook/react';
import {
  BaseFileInputField,
  Tooltip as CustomTooltip,
} from '../src/components';

type Story = StoryObj<typeof BaseFileInputField>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseFileInputField> = {
  title: 'Form/Fields/BaseFileInputField',
  component: BaseFileInputField,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input',
    children: 'Upload',
    className: 'text-sm',
  },
};

export const Hint: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with hint',
    hint: 'Only jpeg, gif png',
    children: 'Upload',
    className: 'text-sm',
  },
};

export const CustomHint: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with hint',
    multiple: true,
    children: 'Upload',
    className: 'text-sm',
    renderHint: () => <em className="mt-2">Upload multipe files!</em>,
  },
};

export const Error: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with error',
    error: 'Someting went wrong',
    children: 'Upload',
    className: 'text-sm',
  },
};

export const CustomError: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with custom error',
    error: 'Damn, this broken',
    children: 'Upload',
    className: 'text-sm',
    renderError: error => (
      <span className="text-error p-1">{error} &#128530;</span>
    ),
  },
};

export const Tooltip: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with a tooltip',
    tooltip: 'This is a tooltip',
  },
};

export const CustomLabel: Story = {
  args: {
    name: 'text-input',
    children: 'Upload',
    className: 'text-sm',
    renderLabel: () => (
      <div className="flex items-center gap-2 p-1">
        <span className="font-bold italic">I look special!</span>
        <CustomTooltip text="Splendid!" />
      </div>
    ),
  },
};

export default meta;
