import { useContext } from 'react';
import { FlashMessagesContext } from '@/components/composed/flashMessages/FlashMessagesProvider';

export const useFlashMessages = () => {
  return useContext(FlashMessagesContext);
};
