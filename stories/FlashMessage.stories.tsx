import type { Meta, StoryObj } from '@storybook/react';
import { useContext, useState } from 'react';
import {
  Button,
  FlashMessages,
  FlashMessagesContext,
  FlashMessagesProvider,
  Icon,
} from '../src/components';
import { useInfiniteCount } from '../src/hooks';

type Story = StoryObj<typeof FlashMessages>;
type FlashMessageType = 'info' | 'error' | 'success' | 'warning';
const types: FlashMessageType[] = ['info', 'error', 'success', 'warning'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FlashMessages> = {
  title: 'NeedLove/FlashMessages',
  component: FlashMessageGenerator,
  decorators: [
    Story => (
      <FlashMessagesProvider>
        <Story />
      </FlashMessagesProvider>
    ),
  ],
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FlashMessagesStory: Story = {
  args: {
    className: 'max-w-110',
  },
};

function FlashMessageGenerator() {
  const { addMessage } = useContext(FlashMessagesContext);
  const [index, setIndex] = useState(0);
  const { increment } = useInfiniteCount(index, types.length);

  const handleClick = () => {
    addMessage({ message: 'Hello World!', type: types[index] });
    setIndex(increment);
  };

  return (
    <>
      <Button size="small" onClick={handleClick} className="justify-center">
        <Icon name="plus" />
      </Button>
      <FlashMessages />
    </>
  );
}

export default meta;
