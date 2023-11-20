import type { Meta, StoryObj } from '@storybook/react';
import { twMerge } from 'tailwind-merge';
import { BaseRadioField } from '../src/components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Fields/BaseRadioField',
  component: BaseRadioField,
} satisfies Meta<typeof BaseRadioField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {
  args: {
    checked: true,
    value: '1',
    name: 'radio-1',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const Error: Story = {
  args: {
    checked: true,
    error: 'Something went wrong',
    value: '2',
    name: 'radio-2',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const UnCheckedWithLabel: Story = {
  args: {
    value: '3',
    name: 'radio-3',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const CustomLabel: Story = {
  args: {
    checked: true,
    value: '4',
    name: 'radio-4',
    renderLabel: className => (
      <div className={twMerge(className, 'flex flex-col gap-2 text-gray')}>
        <span className="font-bold text-black leading-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio nulla
          quidem quibusdam error a omnis voluptate autem nobis natus! Nostrum
          earum ducimus doloremque quos rem velit fuga, praesentium voluptatum
          aperiam.
        </span>
      </div>
    ),
  },
};

export const CustomLabelAndError: Story = {
  args: {
    error: 'Something went wrong',
    value: '4',
    name: 'radio-4',
    renderLabel: className => (
      <div
        className={twMerge(className, 'relative flex flex-col gap-2 text-gray')}
      >
        <span className="font-bold text-black leading-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio nulla
          quidem quibusdam error a omnis voluptate autem nobis natus! Nostrum
          earum ducimus doloremque quos rem velit fuga, praesentium voluptatum
          aperiam.
        </span>
      </div>
    ),
    renderError: error => <span className="text-error-300 mt-2">{error}</span>,
  },
};
