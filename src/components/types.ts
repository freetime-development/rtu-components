import { FieldValues, RegisterOptions } from 'react-hook-form';

export type Validation = {
  rules:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'setValueAs' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
};

export interface Category {
  label: string;
  items: string[];
}

export interface Option {
  label: string;
  value: string | number | null;
  icon?: string;
  emoji?: string;
  subtext?: string;
}

export type CommunicationType =
  | 'info'
  | 'error'
  | 'success'
  | 'warning'
  | 'custom';
