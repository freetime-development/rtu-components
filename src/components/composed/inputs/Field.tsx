import { Transition } from '@headlessui/react';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip } from '..';

export type FieldProps = PropsWithChildren &
  ErrorOrHintProps & {
    name: string;
    className?: string;
    label?: string;
    tooltip?: string | null;
  };

interface ErrorOrHintProps {
  error?: string;
  hint?: string;
  Error?: React.ReactNode;
  Hint?: React.ReactNode;
}

export const Field = ({
  name,
  label,
  error,
  Error,
  hint,
  Hint,
  children,
  className,
  tooltip,
}: FieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className={twMerge(className, 'flex flex-col')}>
        {label && <Label label={label} tooltip={tooltip} />}

        {children}

        <ErrorOrHint error={error} hint={hint} Error={Error} Hint={Hint} />
      </label>
    </div>
  );
};

export function ErrorOrHint({ error, hint, Error, Hint }: ErrorOrHintProps) {
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
      {error && Error ? (
        <>{Error}</>
      ) : (
        <span className="py-1 text-xs text-error">{error}</span>
      )}
      {hint && !error && (
        <>
          {Hint ? (
            <>{Hint}</>
          ) : (
            <span className="py-1 text-xs text-gray">{hint}</span>
          )}
        </>
      )}
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
