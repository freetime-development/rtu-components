import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Validation } from '../types';
import { BaseRadioProps, BaseRadio } from '../base';
import { useFormError } from '@/utils';

type RadioProps = Omit<
  BaseRadioProps,
  'defaultValue' | 'ref' | 'onChange' | 'checked' | 'value'
> & {
  name: string;
  label?: string;
  validation?: Validation;
  defaultValue?: boolean | null;
  ClassName?: string;
  inputClassName?: string;
  errorBorder?: boolean;
};

export const Radio: FC<RadioProps> = ({
  name,
  validation,
  defaultValue,
  ClassName = '',
  inputClassName = '',
  errorBorder,
  ...rest
}) => {
  const rules = validation?.rules;
  const error = useFormError(name);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <BaseRadio
            ref={field.ref}
            name={name}
            className={inputClassName}
            checked={field.value}
            error={Boolean(error)}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...rest}
          />
        );
      }}
    />
  );
};

Radio.displayName = 'Radio';
