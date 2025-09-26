import {
  FC,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside } from '@/hooks';

export type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  disableClickOutside?: boolean;
  Overlay?: React.ElementType;
  disableOverlay?: boolean;
};

export const Modal = forwardRef<HTMLDivElement | null, ModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className,
      disableClickOutside = false,
      Overlay,
      disableOverlay,
    },
    ref,
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => modalRef.current,
    );
    useOnClickOutside(modalRef, onClose, disableClickOutside);

    if (!isOpen) {
      return null;
    }

    if (!disableOverlay) {
      return (
        <>
          {Overlay ? (
            <Overlay>
              <ModalContent ref={modalRef} className={className}>
                {children}
              </ModalContent>
            </Overlay>
          ) : (
            <div className="fixed flex items-center justify-center w-screen h-screen inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/30">
              <ModalContent ref={modalRef} className={className}>
                {children}
              </ModalContent>
            </div>
          )}
        </>
      );
    }

    return (
      <ModalContent ref={modalRef} className={className}>
        {children}
      </ModalContent>
    );
  },
);

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          `flex flex-col items-center rounded-lg p-5 pt-7 shadow-md md:p-10 ${className}`,
        )}
      >
        {children}
      </div>
    );
  },
);
