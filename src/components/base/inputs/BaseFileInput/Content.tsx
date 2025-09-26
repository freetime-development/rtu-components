import { FC } from 'react';
import type { ReactNode } from 'react';
import { Preview } from './Preview';

interface ContentProps {
  files: File[];
  initialView?: ReactNode;
  renderPreview?: (
    files: File[],
    removeFile: (id: string) => void,
  ) => ReactNode;
  removeFile: (id: string) => void;
  disablePreview?: boolean;
}

export const Content: FC<ContentProps> = ({
  files,
  initialView,
  renderPreview,
  removeFile,
  disablePreview,
}) => {
  if (!files?.length || disablePreview) {
    return <>{initialView}</>;
  }

  return (
    <>
      {renderPreview ? (
        renderPreview(files, removeFile)
      ) : (
        <Preview files={files} removeFile={removeFile} />
      )}
    </>
  );
};
