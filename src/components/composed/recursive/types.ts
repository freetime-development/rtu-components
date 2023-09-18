import { Option } from '../..';

export interface NodeValidation {
  required: boolean;
  validation?: string;
  label?: string;
  min?: number;
  minLength?: number;
  max?: number;
  maxLength?: number;
}

export interface INode {
  id: number;
  key: string;
  parent: Partial<INode> | null;
  maxNumberOfReplicas: number | null;
  parentVisibilityRule: string;
  parentRuleType: string;
  order: number;
  field: Field;
}

interface Field {
  type: FieldType;
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string | null;
  tooltip?: string | null;
  hint?: string | null;
  defaultValue?: any;
  exclusiveAnswer?: string;
  options?: Option[];
  validation: NodeValidation;
}

type FieldType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'optiongroup'
  | 'select'
  | 'textarea'
  | 'timepicker'
  | 'datepicker'
  | 'datetimepicker'
  | 'boolean';

export interface Tree extends INode {
  children: Tree[];
}
