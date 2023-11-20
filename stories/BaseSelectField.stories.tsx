import type { Meta, StoryObj } from '@storybook/react';
import { BaseSelectField, Tooltip as CustomTooltip } from '../src/components';

type Story = StoryObj<typeof BaseSelectField>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseSelectField> = {
  title: 'Form/Fields/BaseSelectField',
  component: BaseSelectField,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input',
  },
};

export const Hint: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with hint',
    hint: 'No characters allowed, only numbers!',
    type: 'number',
  },
};

export const CustomHint: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with hint',
    type: 'number',
    renderHint: () => <em>No characters allowed, only numbers!</em>,
  },
};

export const Error: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with error',
    error: 'Someting went wrong',
  },
};

export const CustomError: Story = {
  args: {
    name: 'text-input',
    label: 'Field Input with custom error',
    error: 'Damn, this broken',
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
    renderLabel: () => (
      <div className="flex items-center gap-2 p-1">
        <span className="font-bold italic">I look special!</span>
        <CustomTooltip text="Splendid!" />
      </div>
    ),
  },
};

export default meta;
