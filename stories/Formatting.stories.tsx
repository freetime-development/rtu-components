import type { Meta, StoryObj } from '@storybook/react';
import { formatDate } from '../src/utils';

function Wrapper() {
  return (
    <div className="p-4">
      {formatDate(new Date().toISOString(), 'dd LLL yy', { locale: 'cs-CZ' })}
    </div>
  );
}

type Story = StoryObj<typeof Wrapper>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Wrapper> = {
  title: 'Formatting',
  component: Wrapper,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Clean: Story = {
  args: {},
};

export default meta;
