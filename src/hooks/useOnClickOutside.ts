/* eslint-disable consistent-return */
import type { RefObject } from 'react';
import { useEffect } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClick: () => void,
  disabled = false,
) {
  useEffect(() => {
    if (disabled) {
      return;
    }
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;

      if (ref.current && target && !ref.current.contains(target)) {
        onClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, onClick, disabled]);
}
