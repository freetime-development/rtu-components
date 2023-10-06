import { PropsWithChildren, forwardRef, useRef, useState } from 'react';
import { Content } from './Content';
import { useClassNames } from '@/utils/useClassNames';

export type BaseFileInputProps = PropsWithChildren &
  Omit<React.HTMLProps<HTMLInputElement>, 'onClick'> & {
    error?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    renderPreview?: (files: File[]) => JSX.Element;
    disablePreview?: boolean;
    onSuccess?: (files: File[]) => void;
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
      onSuccess,
      ...rest
    },
    ref,
  ) => {
    const classNames = useClassNames(
      error ? 'error' : 'custom',
      className ?? '',
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files: fileList } = e.target;

      if (!fileList) {
        return;
      }

      const files = Array.from(fileList);
      setFiles(files);
      onSuccess?.(files);
    };

    const removeFile = (id: string) => {
      setFiles(files?.filter(file => file.name !== id) ?? null);
    };

    return (
      <button
        ref={ref}
        className={classNames}
        onClick={handleClick}
        disabled={disabled}
      >
        <>
          <Content
            files={files}
            initialView={children}
            renderPreview={renderPreview}
            removeFile={removeFile}
            disablePreview={disablePreview}
          />
          <input
            ref={inputRef}
            multiple={multiple}
            id={name}
            type="file"
            name={name}
            value={value}
            onChange={handleChange}
            className={'hidden'}
            {...rest}
          />
        </>
      </button>
    );
  },
);

BaseFileInput.displayName = 'BaseFileInput';
