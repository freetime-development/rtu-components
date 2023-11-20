import { cva } from 'class-variance-authority';

export enum ComponentVariantState {
  DEFAULT = 'default',
  ERROR = 'error',
  CUSTOM = 'custom',
}

export enum ComponentVariantType {
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
  FILE = 'FILE',
  SELECT = 'SELECT',
}

export function getComponentStateVariants(
  componentType: ComponentVariantType,
  state: ComponentVariantState,
  className?: string,
) {
  const wrapperStateVariants = cva('', {
    variants: {
      [ComponentVariantState.DEFAULT]: {
        true: getWrapperVariants(ComponentVariantState.DEFAULT)[componentType],
      },
      [ComponentVariantState.ERROR]: {
        true: getWrapperVariants(ComponentVariantState.ERROR)[componentType],
      },
      [ComponentVariantState.CUSTOM]: {
        true: className,
      },
    },
    defaultVariants: {
      default: true,
    },
  });

  const inputStateVariants = cva('', {
    variants: {
      [ComponentVariantState.DEFAULT]: {
        true: getInputVariants(ComponentVariantState.DEFAULT)[componentType],
      },
      [ComponentVariantState.ERROR]: {
        true: getInputVariants(ComponentVariantState.ERROR)[componentType],
      },
      [ComponentVariantState.CUSTOM]: {
        true: className,
      },
    },
    defaultVariants: {
      default: true,
    },
  });

  return {
    wrapperStateVariants: wrapperStateVariants({
      default: state === ComponentVariantState.DEFAULT || !state,
      error: state === ComponentVariantState.ERROR,
      custom: state === ComponentVariantState.CUSTOM,
    }),
    inputStateVariants: inputStateVariants({
      default: state === ComponentVariantState.DEFAULT || !state,
      error: state === ComponentVariantState.ERROR,
      custom: state === ComponentVariantState.CUSTOM,
    }),
  };
}

function getWrapperVariants(componentState: ComponentVariantState) {
  switch (componentState) {
    case ComponentVariantState.ERROR: {
      return {
        [ComponentVariantType.CHECKBOX]: ['[&>svg]:text-error'],
        [ComponentVariantType.RADIO]: [],
        [ComponentVariantType.INPUT]: [
          'border',
          'focus-within:border-error',
          'border-error',
          'hover:border-error',
        ],
        [ComponentVariantType.TEXTAREA]: [],
        [ComponentVariantType.FILE]: [
          'border',
          'border-error',
          'hover:border-error',
          'focus:border-error',
        ],
        [ComponentVariantType.SELECT]: [
          'border',
          'rounded-lg',
          'focus-within:border-error',
          'border-error',
          'hover:border-error',
        ],
      };
    }

    case ComponentVariantState.CUSTOM: {
      return {
        [ComponentVariantType.CHECKBOX]: [],
        [ComponentVariantType.RADIO]: [],
        [ComponentVariantType.INPUT]: [],
        [ComponentVariantType.TEXTAREA]: [],
        [ComponentVariantType.FILE]: [],
        [ComponentVariantType.SELECT]: [],
      };
    }

    default:
      return {
        [ComponentVariantType.CHECKBOX]: ['[&>svg]:text-primary'],
        [ComponentVariantType.RADIO]: ['text-gray'],
        [ComponentVariantType.INPUT]: [
          'text-gray',
          'border',
          'border-gray-200',
          'hover:border-gray',
          'focus-within:border-gray-300',
        ],
        [ComponentVariantType.TEXTAREA]: [],
        [ComponentVariantType.FILE]: [
          'text-gray',
          'border',
          'border-gray-200',
          'hover:border-gray',
          'focus:border-gray-300',
        ],
        [ComponentVariantType.SELECT]: [
          'text-gray',
          'border',
          'rounded-lg',
          'border-gray-200',
          'hover:border-gray',
          'focus-within:border-gray-300',
        ],
      };
  }
}

function getInputVariants(componentState: ComponentVariantState) {
  switch (componentState) {
    case ComponentVariantState.ERROR: {
      return {
        [ComponentVariantType.CHECKBOX]: [
          'border',
          'border-error',
          'focus:border-error',
          'focus:ring-error',
        ],
        [ComponentVariantType.RADIO]: [
          'border',
          'border-error',
          'focus:border-error',
          'checked:before:bg-error',
        ],
        [ComponentVariantType.INPUT]: ['text-error'],
        [ComponentVariantType.TEXTAREA]: [
          'text-error',
          'border',
          'border-error',
          'hover:border-error',
          'focus:border-error',
        ],
        [ComponentVariantType.FILE]: [
          'border',
          'border-error',
          'hover:border-error',
          'focus:border-error',
        ],
        [ComponentVariantType.SELECT]: [],
      };
    }

    case ComponentVariantState.CUSTOM: {
      return {
        [ComponentVariantType.CHECKBOX]: [],
        [ComponentVariantType.RADIO]: [],
        [ComponentVariantType.INPUT]: [],
        [ComponentVariantType.TEXTAREA]: [],
        [ComponentVariantType.SELECT]: [],
      };
    }

    default:
      return {
        [ComponentVariantType.CHECKBOX]: [
          'text-primary',
          'border',
          'border-gray-300',
          'focus:border-primary',
          'checked:border-primary',
          'checked:bg-primary-50',
        ],
        [ComponentVariantType.RADIO]: [
          'border',
          'border-gray-200',
          'hover:border-gray-300',
          'focus:border-primary',
          'checked:border-primary',
          'hover:checked:border-primary',
          'checked:before:bg-primary',
        ],
        [ComponentVariantType.INPUT]: [],
        [ComponentVariantType.TEXTAREA]: [
          'text-gray',
          'border',
          'border-gray-200',
          'hover:border-gray',
          'focus:border-gray-300',
        ],
        [ComponentVariantType.FILE]: [],
        [ComponentVariantType.SELECT]: [],
      };
  }
}
