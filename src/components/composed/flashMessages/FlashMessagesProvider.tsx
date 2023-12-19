import React, { FC, useCallback, useMemo, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type FlashMessagesProviderProps = {
  children: React.ReactNode;
};

type FlashMessageType = 'info' | 'error' | 'success' | 'warning';
type FlashMessage = {
  id?: string;
  type: FlashMessageType;
  message: React.ReactNode;
  timeout?: number;
  permanent?: boolean;
};

type FlashMessagesStore = Record<string, FlashMessage[]>;
type FlashMessagesStoreAction = {
  type: 'ADD' | 'REMOVE' | 'REMOVE_ALL' | 'CLEAR_DEFAULT_GROUP';
  payload?: {
    message?: FlashMessage;
    group?: string;
    id?: string;
  };
};

export const defaultGroup = 'default';
const defaultTimeoutInMs = 7000;

export const FlashMessagesContext = React.createContext({
  addMessage: (message: FlashMessage, group?: string) => {},
  getMessagesFromGroup: (group: string) => {
    return [] as FlashMessage[];
  },
  allMessages: {},
  timeoutInMs: defaultTimeoutInMs,
  setTimeoutInMs: (timeoutInMs: number) => {},
  clearDefaultGroup: () => {},
  removeAll: () => {},
  removeMessage: (id: string, group: string) => {},
});

const reducer = (
  state: FlashMessagesStore,
  action: FlashMessagesStoreAction,
): FlashMessagesStore => {
  switch (action.type) {
    case 'ADD': {
      const addGroup = action.payload?.group ?? defaultGroup;
      const addMessage = action.payload?.message;

      if (!addMessage) {
        return state;
      }

      if (state[addGroup]?.some(message => addMessage.id === message.id)) {
        return state;
      }

      return {
        ...state,
        [addGroup]: state[addGroup]
          ? [...state[addGroup], addMessage]
          : [addMessage],
      };
    }
    case 'REMOVE': {
      const removeGroup = action.payload?.group ?? defaultGroup;
      const removeId = action.payload?.id;

      if (state[removeGroup]) {
        return {
          ...state,
          [removeGroup]: state[removeGroup].filter(
            message => message.id !== removeId,
          ),
        };
      }

      return state;
    }
    case 'CLEAR_DEFAULT_GROUP': {
      return {
        ...state,
        [defaultGroup]: [] as FlashMessage[],
      };
    }
    case 'REMOVE_ALL': {
      return { [defaultGroup]: [] as FlashMessage[] };
    }
    default:
      return state;
  }
};

export const FlashMessagesProvider: FC<FlashMessagesProviderProps> = ({
  children,
}) => {
  const [messages, dispatch] = useReducer(reducer, {
    default: [] as FlashMessage[],
  });
  const [timeoutInMs, setTimeoutInMs] = useState(defaultTimeoutInMs);

  const getMessagesFromGroup = useCallback(
    (group: string) => messages[group] ?? [],
    [messages],
  );

  const removeMessage = useCallback((id: string, group: string) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        id,
        group,
      },
    });
  }, []);

  const removeAll = useCallback(() => dispatch({ type: 'REMOVE_ALL' }), []);
  const clearDefaultGroup = useCallback(
    () => dispatch({ type: 'CLEAR_DEFAULT_GROUP' }),
    [],
  );

  const addMessage = useCallback(
    (message: FlashMessage, group: string = defaultGroup) => {
      const newMessage = {
        ...message,
        ...(!message.id && { id: uuidv4() }),
      };

      const messageTimeout = message?.timeout ?? timeoutInMs;

      dispatch({
        type: 'ADD',
        payload: {
          message: newMessage,
          group,
        },
      });

      if (!message.permanent) {
        setTimeout(
          () => removeMessage(newMessage.id as string, group),
          messageTimeout,
        );
      }
    },
    [removeMessage, timeoutInMs],
  );

  const value = useMemo(
    () => ({
      addMessage,
      getMessagesFromGroup,
      removeAll,
      removeMessage,
      clearDefaultGroup,
      allMessages: messages,
      timeoutInMs,
      setTimeoutInMs,
    }),
    [
      addMessage,
      getMessagesFromGroup,
      messages,
      removeMessage,
      removeAll,
      clearDefaultGroup,
      timeoutInMs,
    ],
  );

  return (
    <FlashMessagesContext.Provider value={value}>
      {children}
    </FlashMessagesContext.Provider>
  );
};
