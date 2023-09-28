import type { Meta, StoryObj } from '@storybook/react';
import { BaseInput, Icon } from '../src/components';

type Story = StoryObj<typeof BaseInput>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseInput> = {
  title: 'Form/Base/TextInput',
  component: BaseInput,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Clean: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
  },
};

export const CleanDisabled: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    disabled: true,
  },
};

export const CleanWithError: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    error: true,
  },
};

export const CleanWithTooltip: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
  },
};

export const Neo: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    className: 'nm-inset-white',
    Icon: () => <Icon name="pencil2" />,
  },
};

export const NeoWithError: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    className: 'nm-inset-white',
    Icon: () => <Icon name="pencil2" className="text-error" />,
    error: true,
  },
};

export default meta;
