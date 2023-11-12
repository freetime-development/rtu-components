import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../src/components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Base/Radio',
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimaryLarge: Story = {
  args: {
    id: 'radio-2',
    value: '2',
    name: 'radio',
    className: 'text-gray',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'large',
  },
};

export const Primary: Story = {
  args: {
    id: 'radio-1',
    value: '1',
    name: 'radio',
    className: 'text-gray',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const PrimarySmall: Story = {
  args: {
    id: 'radio-3',
    value: '3',
    name: 'radio',
    className: 'text-gray',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'small',
  },
};

export const PrimaryWithLabel: Story = {
  args: {
    id: 'radio-4',
    value: '4',
    name: 'radio',
    className: 'text-gray',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const PrimaryWithCustomLabel: Story = {
  args: {
    id: 'radio-5',
    value: '5',
    name: 'radio',
    className: 'text-gray',
    renderLabel: () => (
      <div className="ml-2 flex flex-col gap-2 text-gray">
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
