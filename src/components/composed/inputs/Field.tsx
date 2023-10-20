import { Transition } from '@headlessui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip } from '..';

export type FieldProps = PropsWithChildren &
  UnderTextProps & {
    name: string;
    className?: string;
    label?: string;
    tooltip?: string | null;
  };

interface UnderTextProps {
  error?: string;
  hint?: string;
  renderError?: (error?: string) => ReactNode;
  renderHint?: (hint?: string) => ReactNode;
}

export const Field = ({
  name,
  label,
  error,
  renderError,
  hint,
  renderHint,
  children,
  className,
  tooltip,
}: FieldProps) => {
  return (
    <label
      htmlFor={name}
      className={twMerge('flex flex-col w-full', className)}
    >
      {label && <Label label={label} tooltip={tooltip} />}

      {children}

      <UnderText
        error={error}
        hint={hint}
        renderError={renderError}
        renderHint={renderHint}
      />
    </label>
  );
};

export function UnderText({
  error,
  hint,
  renderError,
  renderHint,
}: UnderTextProps) {
  return (
    <Transition
      show={Boolean(error) || Boolean(hint)}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {error && renderError ? (
        <>{renderError(error)}</>
      ) : (
        <span className="py-1 text-xs text-error">{error}</span>
      )}
      {(hint || renderHint) && !error && (
        <>
          {renderHint ? (
            <>{renderHint(hint)}</>
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
