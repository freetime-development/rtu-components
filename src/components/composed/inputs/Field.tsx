import { Transition } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip } from '..';

interface FieldProps extends PropsWithChildren {
  name: string;
  className?: string;
  label?: string;
  error?: string;
  tooltip?: string | null;
}

export const Field = ({
  name,
  label,
  error,
  children,
  className,
  tooltip,
}: FieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className={twMerge(className, 'flex flex-col')}>
        {label && <Label label={label} tooltip={tooltip} />}

        {children}

        <ErrorMessage error={error} />
      </label>
    </div>
  );
};

export function ErrorMessage({ error }: { error?: string }) {
  return (
    <Transition
      show={Boolean(error)}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <span className="py-1 text-xs text-error">{error}</span>
    </Transition>
  );
}

interface LabelProps {
  label: string;
  tooltip?: React.ReactNode;
}

function Label({ label, tooltip }: LabelProps) {
  return (
    <div className="flex justify-between pb-2">
      <h5 className="w-full flex-1 break-words text-black dark:text-white">
        {label}
      </h5>
      {tooltip && <Tooltip text={tooltip} />}
    </div>
  );
}
