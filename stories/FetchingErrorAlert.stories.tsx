import type { Meta, StoryObj } from '@storybook/react';
import { Alert, FetchingError } from '../src/components';

type Story = StoryObj<typeof Alert>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Alert> = {
  title: 'NeedLove/FetchingErrorAlert',
  component: Alert,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FetchingErrorAlert: Story = {
  args: {
    className: 'max-w-xs p-0',
    children: (
      <FetchingError
        error={true}
        errorMessage="There was an issue fetching the data"
        refetch={() => {
          return 0;
        }}
      />
    ),
  },
};

export default meta;
