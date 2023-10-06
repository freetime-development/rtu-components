import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Content } from './Content';
import { useClassNames } from '@/utils/useClassNames';

export type BaseFileInputProps = PropsWithChildren &
  Omit<React.HTMLProps<HTMLInputElement>, 'onClick' | 'value'> & {
    error?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    renderPreview?: (
      files: File[],
      removeFile: (id: string) => void,
    ) => JSX.Element;
    disablePreview?: boolean;
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
      onSuccess,
      removeFile,
      ...rest
    },
    ref,
  ) => {
    const classNames = useClassNames(
      error ? 'error' : 'custom',
      className ?? '',
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>(value);

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

      const files = Array.from(fileList);
      setFiles(files);
      onSuccess?.(files);
    };

    const handleRemoveFile = (id: string) => {
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
            className={'hidden'}
            {...rest}
          />
        </>
      </button>
    );
  },
);

BaseFileInput.displayName = 'BaseFileInput';
