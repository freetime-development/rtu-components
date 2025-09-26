import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Content } from './Content';
import {
  ComponentVariantState,
  ComponentVariantType,
  getComponentStateVariants,
} from '@/css/variants/stateVariants';

export type BaseFileInputProps = PropsWithChildren &
  Omit<React.HTMLProps<HTMLInputElement>, 'onClick' | 'value'> & {
    error?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    renderPreview?: (
      files: File[],
      removeFile: (id: string) => void,
    ) => ReactNode;
    disablePreview?: boolean;
    /** Merges existing selection with new files */
    aggregate?: boolean;
    onSuccess?: (files: File[]) => void;
    removeFile?: (id: string) => void;
    value: File[];
  };

export const BaseFileInput = forwardRef<HTMLButtonElement, BaseFileInputProps>(
  (
    {
      name,
      value,
      type,
      placeholder,
      onChange,
      onBlur,
      onFocus,
      disabled,
      error,
      className,
      children,
      multiple,
      disablePreview,
      renderPreview,
      aggregate,
      onSuccess,
      removeFile,
      ...rest
    },
    ref,
  ) => {
    const { wrapperStateVariants } = getComponentStateVariants(
      ComponentVariantType.FILE,
      error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>(value ?? []);

    useEffect(() => {
      setFiles(value);
    }, [value]);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files: fileList } = e.target;

      if (!fileList) {
        return;
      }

      const arr = Array.from(fileList);
      const newArray = aggregate ? [...files, ...arr] : arr;
      setFiles(newArray);
      onSuccess?.(newArray);
    };

    const handleRemoveFile = (id: string) => {
      setFiles(files?.filter(file => file.name !== id) ?? null);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(
          'border rounded-lg w-20 h-20',
          wrapperStateVariants,
          className,
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        <>
          <Content
            files={files}
            initialView={children}
            renderPreview={renderPreview}
            removeFile={removeFile ?? handleRemoveFile}
            disablePreview={disablePreview}
          />
          <input
            ref={inputRef}
            multiple={multiple}
            id={name}
            type="file"
            name={name}
            onChange={onChange ?? handleChange}
            className="hidden"
            {...rest}
          />
        </>
      </button>
    );
  },
);

BaseFileInput.displayName = 'BaseFileInput';
