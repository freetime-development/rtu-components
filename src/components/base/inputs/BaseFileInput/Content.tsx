import { FC } from 'react';
import { Preview } from './Preview';

interface ContentProps {
  files: File[];
  initialView?: React.ReactNode;
  renderPreview?: (files: File[]) => JSX.Element;
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
  if (!files.length || disablePreview) {
    return <>{initialView}</>;
  }

  return (
    <>
      {renderPreview ? (
        renderPreview(files)
      ) : (
        <Preview files={files} removeFile={removeFile} />
      )}
    </>
  );
};
