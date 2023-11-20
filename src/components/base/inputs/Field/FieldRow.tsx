import { twMerge } from 'tailwind-merge';
import { DefaultFieldLabel, FieldProps, UnderText } from './Field';
import {
  LabelTextVariantProps,
  labelAlignmentVariants,
  labelTextVariants,
} from '@/components/base/inputs/classNameVariants';

type FieldRowProps = FieldProps & LabelTextVariantProps;

export const FieldRow = ({
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
  size,
}: FieldRowProps) => {
  const labelAlignment = labelAlignmentVariants({ size });
  const labelClassName = twMerge(
    'relative my-1 flex  cursor-pointer select-text items-start rounded-lg',
    labelTextVariants({ size }),
    labelAlignment,
    className,
  );

  return (
    <label
      htmlFor={id ?? name}
      className={twMerge(
        'flex flex-row w-full text-gray gap-2',
        labelClassName,
      )}
    >
      {children}

      <div className="flex flex-col items-start">
        {(label || renderLabel) && (
          <>
            {renderLabel ? (
              <>{renderLabel(labelAlignment)}</>
            ) : (
              <DefaultFieldLabel label={label} tooltip={tooltip} />
            )}
          </>
        )}

        <UnderText
          error={error}
          hint={hint}
          renderError={renderError}
          renderHint={renderHint}
        />
      </div>
    </label>
  );
};
