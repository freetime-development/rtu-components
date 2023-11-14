import type { Meta, StoryObj } from '@storybook/react';
import { BaseCheckbox } from '../src/components';

type Story = StoryObj<typeof BaseCheckbox>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseCheckbox> = {
  title: 'Form/Base/BaseCheckbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CheckedNormal: Story = {
  args: {
    name: 'checkbox-1',
    checked: true,
  },
};

export const CheckedSmall: Story = {
  args: {
    name: 'checkbox-1',
    size: 'small',
    checked: true,
  },
};

export const UnChecked: Story = {
  args: {
    name: 'checkbox-3',
    checked: false,
  },
};

export const UnCheckedSmall: Story = {
  args: {
    name: 'checkbox-3',
    size: 'small',
    checked: false,
  },
};

export const WithError: Story = {
  args: {
    name: 'checkbox-4',
    error: true,
  },
};

export const WithErrorSmall: Story = {
  args: {
    name: 'checkbox-4',
    size: 'small',
    error: true,
  },
};

export const CheckedWithError: Story = {
  args: {
    checked: true,
    name: 'checkbox-4',
    error: true,
  },
};

export const CheckedWithErrorSmall: Story = {
  args: {
    checked: true,
    name: 'checkbox-4',
    size: 'small',
    error: true,
  },
};

export default meta;
