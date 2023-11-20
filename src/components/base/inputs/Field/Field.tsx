import React, { PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip } from '../../../composed';

export type FieldProps = PropsWithChildren &
  UnderTextProps &
  LabelProps & {
    id?: string;
    name: string;
    className?: string;
  };

export interface LabelProps {
  label?: string;
  renderLabel?: (
    /** classes that help align the label with the input horizontally (radio, checkbox) */
    className?: string,
  ) => ReactNode;
  tooltip?: string;
}

export interface UnderTextProps {
  error?: string;
  hint?: string;
  renderError?: (error?: string) => ReactNode;
  renderHint?: (hint?: string) => ReactNode;
}

export const Field = ({
  id,
  name,
  label,
  renderLabel,
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
      htmlFor={id ?? name}
      className={twMerge('flex flex-col w-full text-gray', className)}
    >
      {(label || renderLabel) && (
        <>
          {renderLabel ? (
            <>{renderLabel()}</>
          ) : (
            <DefaultFieldLabel label={label} tooltip={tooltip} />
          )}
        </>
      )}

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
    <>
      {(error || renderError) && (
        <>
          {renderError ? (
            <>{renderError(error)}</>
          ) : (
            <span className="py-1 text-xs text-error">{error}</span>
          )}
        </>
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
    </>
  );
}

export function DefaultFieldLabel({
  label,
  tooltip,
}: Omit<LabelProps, 'renderLabel'>) {
  return (
    <div className="flex justify-between pb-2 w-full break-words text-gray">
      <span className="flex-grow break-words">{label}</span>
      {tooltip && <Tooltip text={tooltip} />}
    </div>
  );
}
