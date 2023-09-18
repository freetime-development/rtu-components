import { FC, useContext, useMemo } from 'react';
import { CommunicationType } from '../..';
import { Alert } from '../../base/alerts/Alert';
import { FlashMessagesContext } from './FlashMessagesProvider';

type FlashMessagesProps = {
  group?: string;
  filterBy?: CommunicationType;
  className?: string;
};

export const FlashMessages: FC<FlashMessagesProps> = ({
  group = 'default',
  filterBy,
  className,
}) => {
  const flashMessagesContext = useContext(FlashMessagesContext);

  const flashMessages = useMemo(() => {
    const messages = flashMessagesContext.getMessagesFromGroup(group);

    if (filterBy) {
      return messages.filter(message => message.type === filterBy);
    }

    return messages;
  }, [flashMessagesContext, group, filterBy]);

  return (
    <div className={className}>
      {flashMessages.map(flashMessage => (
        <Alert
          key={flashMessage.id}
          variant={{ type: flashMessage.type }}
          className="my-4"
        >
          {flashMessage.message}
        </Alert>
      ))}
    </div>
  );
};
