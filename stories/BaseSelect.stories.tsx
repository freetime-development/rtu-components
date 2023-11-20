import type { Meta, StoryObj } from '@storybook/react';
import { twMerge } from 'tailwind-merge';
import { BaseSelect } from '../src/components';

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

type Story = StoryObj<typeof BaseSelect>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseSelect> = {
  title: 'Form/Base/Select',
  component: BaseSelect,
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
    value: 'option-1',
  },
};

export const Large: Story = {
  args: {
    name: 'select',
    options,
    value: 'option-2',
    size: 'large',
  },
};

export const Normal: Story = {
  args: {
    name: 'select',
    options,
    value: 'option-3',
  },
};

export const Small: Story = {
  args: {
    name: 'select',
    options,
    value: 'option-1',
    size: 'small',
  },
};

export const UnSelected: Story = {
  args: {
    name: 'select',
    placeholder: 'Select an option',
    options,
  },
};

export const UnSelectedWithRenderLeft: Story = {
  args: {
    name: 'select',
    placeholder: 'Select an option',
    options,
    renderLeft: (option, className) => (
      <span
        className={twMerge(className, option ? option.icon : 'icon-alarm')}
      />
    ),
  },
};

export const Disabled: Story = {
  args: {
    name: 'select',
    options,
    value: 'option-1',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    name: 'select',
    options,
    value: 'option-1',
    isLoading: true,
  },
};

export const RenderLeft: Story = {
  args: {
    name: 'select',
    options,
    value: 'option-2',
    renderLeft: (option, className) => (
      <span className={twMerge(className, 'text-primary', option?.icon)} />
    ),
  },
};

export const CustomIcons: Story = {
  args: {
    name: 'select',
    options,
    value: 'option-2',
    renderLeft: (option, className) => (
      <span className={twMerge(className, 'text-primary', option?.icon)} />
    ),
    ClearIcon: <span className="icon-cross text-primary" />,
    DefaultIcon: <span className="icon-arrow-down2 text-primary" />,
  },
};

export const Emoji: Story = {
  args: {
    name: 'select',
    options: optionWithEmoji,
    value: 'option-2',
  },
};

export const Subtext: Story = {
  args: {
    name: 'select',
    options: optionWithSubtext,
    value: 'option-2',
  },
};

export default meta;
