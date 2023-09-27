import { Dialog } from '@headlessui/react';
import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  title?: string;
  description?: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  title,
  description,
  onClose,
  className,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="w-screen h-screen inset-0 overflow-y-auto overflow-x-hidden bg-black/30"
    >
      <div
        className={twMerge(
          `w-full h-full flex items-center justify-center ${className}`,
        )}
      >
        <Dialog.Panel className="mx-5 my-7 rounded-lg bg-white p-5 pt-7 shadow-md md:max-w-6xl md:p-10">
          {title && (
            <Dialog.Title className="mb-8 text-center text-3xl font-bold">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="mb-10 text-center text-lg font-normal">
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
