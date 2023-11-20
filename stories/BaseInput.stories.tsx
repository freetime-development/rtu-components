import type { Meta, StoryObj } from '@storybook/react';
import { twMerge } from 'tailwind-merge';
import { BaseInput as Input, Icon } from '../src/components';

type Story = StoryObj<typeof Input>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: 'Form/Base/Input',
  component: Input,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BaseTextLarge: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    size: 'large',
    placeholder: 'Type some text',
  },
};

export const BaseTextNormal: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    size: 'normal',
    placeholder: 'Type some text',
  },
};

export const BaseTextSmall: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    size: 'small',
    placeholder: 'Type some text',
  },
};

export const BaseTextSmallLeft: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    size: 'small',
    placeholder: 'Type some text',
    renderLeft: className => <Icon name="pencil2" className={className} />,
  },
};

export const BaseNumberInput: Story = {
  args: {
    name: 'number-input',
    label: 'Number Input',
    type: 'number',
    placeholder: 'Type some text',
  },
};

export const BaseInputDisabled: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    disabled: true,
  },
};

export const BaseInputWithError: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    error: true,
  },
};

export const BaseInputWithLeft: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    renderLeft: className => <Icon name="pencil2" className={className} />,
  },
};

export const BaseInputWithRight: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    renderRight: className => <Icon name="pencil2" className={className} />,
  },
};

export const BaseInputWithBoth: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    renderLeft: className => <Icon name="pencil2" className={className} />,
    renderRight: className => <Icon name="bin" className={className} />,
  },
};

export const Neo: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    className: 'nm-inset-white',
    renderLeft: className => (
      <Icon name="pencil2" className={twMerge(className, 'border-0')} />
    ),
  },
};

export const NeoWithError: Story = {
  args: {
    name: 'text-input',
    label: 'Text Input',
    placeholder: 'Type some text',
    className: 'nm-inset-white text-error',
    renderLeft: className => (
      <Icon
        name="pencil2"
        className={twMerge(className, 'border-0 text-error')}
      />
    ),
    error: true,
  },
};

export default meta;
