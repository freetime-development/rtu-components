import { useFormContext } from 'react-hook-form';
import { Validation } from '../../types';
import { INode, Tree } from './types';
import {
  Boolean,
  DatePicker,
  DateTimePicker,
  Icon,
  Input,
  OptionGroup,
  RadioGroup,
  TimePicker,
} from '@/components';

// Replicas per Node implementation "Replicas" SHA: 3c12fae
export function createTree(
  nodes: INode[],
  parent: number | null = null,
  cb: (node: Tree) => void,
) {
  return nodes?.reduce((acc, node) => {
    if (parent !== null && node.parent?.id !== parent) {
      return acc;
    }

    const numberOfReplicas = node.maxNumberOfReplicas
      ? node.maxNumberOfReplicas - 1
      : 0;

    for (let i = 0; i <= numberOfReplicas; i++) {
      const key =
        numberOfReplicas === null ? node.key : getReplicaName(node.key, i);

      const treeNode: Tree = {
        ...node,
        key,
        children: createTree(nodes, node.id, cb).sort(
          (a, b) => a.order - b.order,
        ),
      };

      cb(treeNode);
      acc.push(treeNode);
    }

    return acc;
  }, [] as Tree[]);
}

export function useElementByType(node: Tree) {
  const validation = useValidationRule(node);
  const { field } = node;
  let element;

  switch (field.type) {
    case 'boolean':
      element = (
        <Boolean
          key={field.name}
          name={field.name}
          label={field.label}
          disabled={field.disabled}
          defaultValue={field.defaultValue ?? null}
          validation={validation}
          tooltip={field.tooltip}
        />
      );
      break;
    case 'number':
      element = (
        <Input
          key={field.name}
          name={field.name}
          disabled={field.disabled}
          label={field.label}
          defaultValue={field.defaultValue ?? null}
          validation={validation}
          tooltip={field.tooltip}
          placeholder={field.placeholder ?? undefined}
          Icon={() => <Icon name="sort-numeric-asc" />}
          type="number"
        />
      );
      break;
    case 'text':
      element = (
        <Input
          key={field.name}
          name={field.name}
          label={field.label}
          disabled={field.disabled}
          defaultValue={field.defaultValue ?? ''}
          validation={validation}
          tooltip={field.tooltip}
          Icon={() => <Icon name="sort-alpha-asc" />}
        />
      );
      break;
    case 'timepicker':
      element = (
        <TimePicker
          key={field.name}
          name={field.name}
          disabled={field.disabled}
          validation={validation}
          defaultValue={field.defaultValue ?? ''}
          label={field.label}
          placeholder={field.placeholder ?? undefined}
        />
      );
      break;
    case 'datepicker':
      element = (
        <DatePicker
          key={field.name}
          inputProps={{
            name: field.name,
            label: field.label,
            disabled: field.disabled,
            placeholder: field.placeholder ?? undefined,
            defaultValue: field.defaultValue ?? '',
            validation,
            tooltip: field.tooltip,
          }}
          datepickerProps={{
            skipFilterDays: true,
          }}
        />
      );

      break;
    case 'datetimepicker':
      element = (
        <DateTimePicker
          key={field.name}
          disabled={field.disabled}
          skipFilterDays={true}
          placeholder={field.placeholder ?? undefined}
          name={field.name}
          label={field.label}
          defaultValue={field.defaultValue ?? null}
          validation={validation}
          tooltip={field.tooltip}
        />
      );
      break;
    case 'optiongroup': {
      element = (
        <OptionGroup
          name={node.key}
          label={field.label}
          exclusiveAnswer={field.exclusiveAnswer}
          validation={validation}
          disabled={field.disabled}
          defaultValue={field.defaultValue ?? []}
          tooltip={field.tooltip}
          options={field.options ?? []}
        />
      );
      break;
    }
    case 'radio': {
      element = (
        <RadioGroup
          defaultValue={field.defaultValue ?? []}
          disabled={field.disabled}
          name={field.name}
          label={field.label}
          tooltip={field.tooltip}
          options={field.options ?? []}
          validation={validation}
          className="py-2"
        />
      );
      break;
    }
    default:
      element = null;
  }

  return element;
}

export function useVisibilityRule(node: Tree) {
  const { watch } = useFormContext();
  const parentKey = node.parent?.key;
  const parentValue = watch(parentKey || '');
  const { parentVisibilityRule, parentRuleType } = node;

  let show = true;
  // console.log(`general-${node.key}`, parentRuleType, parentVisibilityRule)

  if (parentVisibilityRule && parentRuleType) {
    if (node.parentRuleType === 'pattern') {
      if (Array.isArray(parentValue)) {
        return parentValue.includes(parentVisibilityRule);
      } else if (
        typeof parentValue === 'string' ||
        typeof parentValue === 'number'
      ) {
        const reg = new RegExp(parentVisibilityRule);
        const value = String(parentValue);
        return reg.test(value);
      } else if (typeof parentValue === 'boolean') {
        if (parentVisibilityRule === '1') {
          return parentValue === true;
        }
        if (parentVisibilityRule === '0') {
          return parentValue === false;
        }

        return false;
      } else {
        return node.parentVisibilityRule === parentValue;
      }
    } else if (parentRuleType === 'contains' && Array.isArray(parentValue)) {
      if (parentVisibilityRule.includes('|')) {
        const values = parentVisibilityRule.split('|');
        show = values.some(value => {
          return parentValue.includes(value);
        });
      } else {
        show = parentValue.includes(parentVisibilityRule);
      }
    } else if (parentRuleType === 'contains' && !Array.isArray(parentValue)) {
      // This condition is for the case when the parent is static or profile
      show = parentValue === parentVisibilityRule;
    } else {
      show = false;
    }
  } else if (Array.isArray(parentValue)) {
    show = parentValue.length > 0;
  } else {
    show = parentValue !== null;
  }

  return show;
}

export function useValidationRule(node: Tree): Validation {
  const { validation } = node.field;

  if (node.field.type === 'boolean') {
    return {
      rules: {
        validate: {
          boolean: (value: boolean) => value !== null,
        },
      },
      errorMessage: 'Something went wrong',
    };
  }

  const rules = {
    required: {
      value: validation.required,
      message: 'Something went wrong',
    },
    pattern: validation.validation
      ? {
          value: new RegExp(validation.validation),
          message: 'Something went wrong',
        }
      : undefined,
    min: validation.min
      ? {
          value: validation.min,
          message: 'Something went wrong',
        }
      : undefined,
    minLength: validation.minLength
      ? {
          value: validation.minLength,
          message: 'Something went wrong',
        }
      : undefined,
    max: validation.max
      ? {
          value: validation.max,
          message: 'Something went wrong',
        }
      : undefined,
    maxLength: validation.maxLength
      ? {
          value: validation.maxLength,
          message: 'Something went wrong',
        }
      : undefined,
  };

  return { rules, tooltip: validation.label };
}

export function getNumberFromString(value: string) {
  return parseInt(value, 10);
}

export function getReplicaName(name: string, replicaIndex: number | null) {
  return replicaIndex !== null ? `${name}:replica-${replicaIndex}` : name;
}

export function parseReplicaName(name: string) {
  return name.split(':replica-');
}
