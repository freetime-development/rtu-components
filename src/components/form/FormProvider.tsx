import { FC, PropsWithChildren } from 'react';
import {
  useForm,
  FormProvider as Provider,
  UseFormProps,
} from 'react-hook-form';

interface Props extends PropsWithChildren {
  defaultValues?: Record<string, any>;
  reValidateMode?: UseFormProps['reValidateMode'];
}

export const FormProvider: FC<Props> = ({
  children,
  defaultValues,
  reValidateMode,
}) => {
  const form = useForm({ defaultValues, reValidateMode });
  return <Provider {...form}>{children}</Provider>;
};
