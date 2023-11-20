import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from '../src/components';

type Story = StoryObj<typeof LinkButton>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LinkButton> = {
  title: 'NeedLove/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LinkStory: Story = {
  args: {
    href: '/?path=/docs/General-linkbutton--docs',
    children: 'Link to the root',
  },
};

export default meta;
