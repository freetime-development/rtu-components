import type { Meta, StoryObj } from '@storybook/react';
import { BaseMultiSelect } from '../src/components';

const options = [
  { label: 'option 1', value: 'option-1', icon: 'icon-alarm' },
  { label: 'option 2', value: 'option-2', icon: 'icon-bubbles4' },
  { label: 'option 3', value: 'option-3', icon: 'icon-checkmark' },
];

const optionWithEmoji = [
  { label: 'option 1', value: 'option-1', emoji: '👋' },
  { label: 'option 2', value: 'option-2', emoji: '👋' },
  { label: 'option 3', value: 'option-3', emoji: '👋' },
];

const optionWithSubtext = [
  { label: 'option 1', value: 'option-1', subtext: 'subtext 1' },
  { label: 'option 2', value: 'option-2', subtext: 'subtext 2' },
  { label: 'option 3', value: 'option-3', subtext: 'subtext 3' },
];

type Story = StoryObj<typeof BaseMultiSelect>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseMultiSelect> = {
  title: 'Form/Base/MultiSelect',
  component: BaseMultiSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 250,
      },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: 'select',
    options,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
  },
};

export const Large: Story = {
  args: {
    name: 'select',
    options,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
    size: 'large',
  },
};

export const Normal: Story = {
  args: {
    name: 'select',
    options,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
  },
};

export const Small: Story = {
  args: {
    name: 'select',
    options,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    name: 'select',
    options,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    name: 'select',
    options,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
    isLoading: true,
  },
};

export const Unselected: Story = {
  args: {
    name: 'select',
    options,
    placeholder: 'Select',
    value: ['option-1', 'option-2'],
  },
};

export const RenderLeft: Story = {
  args: {
    name: 'select',
    options,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
    renderSelectedOptions: options => (
      <div className="flex items-center">
        {options.map(option => (
          <span
            key={option.value}
            className="text-primary flex items-center m-1 p-1 gap-1"
          >
            <i className={option.icon} />
            {option.label}
          </span>
        ))}
      </div>
    ),
  },
};

export const Emoji: Story = {
  args: {
    name: 'select',
    options: optionWithEmoji,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
  },
};

export const Subtext: Story = {
  args: {
    name: 'select',
    options: optionWithSubtext,
    value: ['option-1', 'option-2'],
    selectedOptions: options.slice(0, 2),
  },
};

export default meta;
