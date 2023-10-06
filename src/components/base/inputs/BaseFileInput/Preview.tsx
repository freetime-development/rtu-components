import { FC } from 'react';
import { Button } from '../../buttons';
import { Icon } from '../../icons';

interface PreviewProps {
  files: File[];
  removeFile: (id: string) => void;
}

export const Preview: FC<PreviewProps> = ({ files, removeFile }) => {
  if (!files.length) {
    return null;
  }

  const previews = files.map(file => ({
    id: file.name,
    url: URL.createObjectURL(file),
  }));

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();

    removeFile(id);
  };

  return (
    <div className="flex w-full h-full">
      {previews.map(({ id, url }) => (
        <div key={id} className="relative w-full h-full">
          <img src={url} className="w-full h-full" />
          <Button
            onClick={e => handleRemove(e, id)}
            intent="custom"
            size="small"
            className="absolute top-0 right-0 p-3 border border-gray-300 text-gray-300 rounded-lg bg-white"
          >
            <Icon name="cross" className="text-gray-300" />
          </Button>
        </div>
      ))}
    </div>
  );
};
