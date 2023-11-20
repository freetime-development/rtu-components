import { useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { BaseInput, BaseTimePicker, Icon, Validation } from '@/components';
import { getMeridiemnTime } from '@/hooks/useMeridiemTime';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useFormError } from '@/utils';

interface TimePickerProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'defaultValue'> {
  name: string;
  validation: Validation;
  defaultValue?: string;
}

export const TimePicker = (props: TimePickerProps) => {
  const { name, validation, defaultValue, label } = props;
  const errorMessage = validation;
  const rules = validation?.rules;
  const error = useFormError(name);
  const { field } = useController({ name, defaultValue, rules });
  const [open, setOpen] = useState(false);
  const meridiemTime = getMeridiemnTime(field.value);

  const timepickerProps = {
    ...props,
    value: field.value,
    onChange: field.onChange,
    error,
    open,
  };

  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, () => setOpen(false));

  const onFocus = () => {
    setOpen(true);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <BaseInput
        ref={field.ref}
        id={name}
        label={label}
        name={name}
        value={meridiemTime}
        placeholder={props.placeholder}
        onChange={field.onChange}
        onFocus={onFocus}
        disabled={props.disabled}
        renderLeft={className => <Icon name="alarm" className={className} />}
        className={twMerge(open ? 'rounded-b-none' : 'rounded-b-lg')}
      />
      <div
        className={twMerge(
          'absolute z-10 w-full  border-gray-9/20 bg-white',
          open && 'rounded-lg rounded-t-none border',
        )}
      >
        <BaseTimePicker {...timepickerProps} />
      </div>
    </div>
  );
};
