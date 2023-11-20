import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Modal } from '../src/components';

type Story = StoryObj<typeof Modal>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Modal> = {
  title: 'General/Modal',
  component: ModalGenerator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LinkStory: Story = {
  args: {
    children: 'Link to the root',
  },
};

function ModalGenerator() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex w-full justify-evenly">
        <Button onClick={() => setOpen(true)} size="large">
          Open Modal
        </Button>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="max-w-md">
          <h1>Hello world!</h1>

          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            veniam ipsa suscipit, in necessitatibus quod voluptas soluta,
            pariatur vel, aliquam ea maiores. Sit ipsum deserunt optio, aliquam
            aut nemo placeat?
          </p>

          <div className="mt-5 flex w-full justify-evenly">
            <Button onClick={() => setOpen(false)} size="normal">
              Confirm
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="secondary"
              size="normal"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default meta;
