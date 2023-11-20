import { Combobox } from '@headlessui/react';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { LoadingSpinner } from '../../loaders';
import { Icon } from '../../icons';

interface StateButtonProps {
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  disableClear?: boolean;
  value?: string | string[] | null;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  LoadingIcon?: React.ReactNode;
  ClearIcon?: React.ReactNode;
  DefaultIcon?: React.ReactNode;
}

export const StateButton: FC<StateButtonProps> = ({
  className,
  disabled,
  onClick,
  onKeyDown,
  isLoading,
  LoadingIcon,
  value,
  disableClear,
  ClearIcon = <Icon name="cross" />,
  DefaultIcon = <Icon name="arrow-down2" />,
}) => {
  return (
    <Combobox.Button
      className={twMerge(
        'hidden cursor-pointer',
        className,
        !disabled && 'flex items-center justify-center',
      )}
      // @ts-expect-error
      tabindex={0} // it needs to overide the default -1 so that the Combobox.Button can open the dropdown, yes it's lower case i, no don't change it
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <RenderIcon
        value={value}
        disabled={disabled}
        disableClear={disableClear}
        loading={isLoading}
        ClearIcon={ClearIcon}
        DefaultIcon={DefaultIcon}
        LoadingIcon={LoadingIcon}
      />
    </Combobox.Button>
  );
};

interface RenderIconProps {
  value: StateButtonProps['value'];
  disabled: StateButtonProps['disabled'];
  disableClear: StateButtonProps['disableClear'];
  loading: StateButtonProps['isLoading'];
  ClearIcon: StateButtonProps['ClearIcon'];
  DefaultIcon: StateButtonProps['DefaultIcon'];
  LoadingIcon: StateButtonProps['LoadingIcon'];
}

function RenderIcon({
  value,
  disabled,
  disableClear,
  loading,
  ClearIcon,
  DefaultIcon,
  LoadingIcon,
}: RenderIconProps) {
  if (disabled) {
    return null;
  } else if (loading) {
    return LoadingIcon ? <>{LoadingIcon}</> : <LoadingSpinner color="black" />;
  } else if (Array.isArray(value)) {
    return value.length && !disableClear ? (
      <>{ClearIcon}</>
    ) : (
      <>{DefaultIcon}</>
    );
  } else {
    return value && !disableClear ? <>{ClearIcon}</> : <>{DefaultIcon}</>;
  }
}
