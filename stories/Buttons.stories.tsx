import type { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Button, Icon } from '../src/components';
import { Row } from './utils/Row';

type Story = StoryObj<typeof Row>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Row> = {
  title: 'Experimental/Buttons',
  component: Row,
  tags: ['autodocs'],
};

const pressAnimation = 'transition active:shadow-md';

export const Buttons: Story = {
  args: {
    children: [
      <Button
        key={1}
        variant="custom"
        size="large"
        className={classNames(
          pressAnimation,
          'h-10 w-10 items-center justify-center rounded-full text-gray-2 ease-in-out nm-convex-white group-active:scale-105',
        )}
      >
        <>
          <Icon
            name="play2"
            className="slideLeft absolute rounded-full text-2xl text-gray-6 transition ease-in-out group-focus:-translate-x-20 group-focus:text-info group-active:scale-105 group-active:text-info"
          />
          <div className="group-focus:fadeIn flex w-0 items-center justify-between opacity-0 group-focus:w-20">
            <Icon name="play3" className="tabIndex-0 rounded-full text-info" />
            <Icon name="pause2" className="tabIndex-0 rounded-full text-info" />
            <Icon name="stop2" className="tabIndex-0 rounded-full text-info" />
          </div>
        </>
      </Button>,
      <Button
        key={2}
        variant="custom"
        size="large"
        className={twMerge(
          pressAnimation,
          'focus:justify-end',
          'h-10 w-10 items-center justify-between rounded-full text-gray-4 nm-convex-white',
        )}
      >
        <span className="opacity-1 transition delay-150 group-focus:opacity-0 group-focus:transition-none">
          Playback options
        </span>
        <>
          <Icon
            name="pause2"
            className="slideLeft absolute right-4 rounded-full text-2xl text-gray-6 group-focus:-translate-x-32 group-focus:text-info group-active:scale-105 group-active:text-info"
          />
          <div className="group-focus:fadeIn flex w-0 items-center justify-between opacity-0 group-focus:w-20">
            <Button variant="custom" size="small" className="p-0 md:h-auto">
              <Icon name="play3" className="rounded-full text-info" />
            </Button>
            <Button variant="custom" size="small" className="p-0 md:h-auto">
              <Icon name="pause2" className="rounded-full text-info" />
            </Button>
            <Button variant="custom" size="small" className="p-0 md:h-auto">
              <Icon name="stop2" className="rounded-full text-info" />
            </Button>
          </div>
        </>
      </Button>,
    ],
  },
};

export default meta;
