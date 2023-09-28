import { INode } from '../../src/components';

export const nodesMock: INode[] = [
  {
    id: 1,
    key: 'key-1',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 1,
    field: {
      name: 'bool',
      label: 'Bool',
      type: 'boolean',
      disabled: false,
      validation: {
        required: true,
      },
    },
  },
  {
    id: 2,
    key: 'key-2',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 2,
    field: {
      name: 'number',
      label: 'Number',
      type: 'number',
      placeholder: 'enter a number',
      disabled: false,
      validation: {
        required: true,
      },
    },
  },
  {
    id: 3,
    key: 'key-3',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 3,
    field: {
      name: 'text',
      label: 'Text',
      type: 'text',
      placeholder: 'enter a text',
      disabled: false,
      validation: {
        required: true,
      },
    },
  },
  {
    id: 4,
    key: 'key-4',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 4,
    field: {
      name: 'timepicker',
      label: 'Timepicker',
      type: 'timepicker',
      placeholder: 'choose a time',
      disabled: false,
      validation: {
        required: true,
      },
    },
  },
  {
    id: 5,
    key: 'key-5',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 5,
    field: {
      name: 'datepicker',
      label: 'Datepicker',
      type: 'datepicker',
      placeholder: 'choose a date',
      disabled: false,
      validation: {
        required: true,
      },
    },
  },
  {
    id: 6,
    key: 'key-6',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 6,
    field: {
      name: 'datetimepicker',
      label: 'Datetimepicker',
      type: 'datetimepicker',
      placeholder: 'choose time and date',
      disabled: false,
      validation: {
        required: true,
      },
    },
  },
  {
    id: 7,
    key: 'key-7',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 7,
    field: {
      name: 'radio',
      label: 'Radio',
      type: 'radio',
      disabled: false,
      validation: {
        required: true,
      },
      options: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
  },
  {
    id: 8,
    key: 'key-8',
    parent: null,
    maxNumberOfReplicas: null,
    parentVisibilityRule: '',
    parentRuleType: '',
    order: 8,
    field: {
      name: 'option-group',
      label: 'Option-Group',
      type: 'optiongroup',
      disabled: false,
      validation: {
        required: true,
      },
      options: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
  },
];
