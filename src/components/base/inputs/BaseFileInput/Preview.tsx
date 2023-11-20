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
        <div key={id} className="relative rounded-lg w-full h-full">
          <img src={url} className="w-full rounded-lg h-full" />
          <Button
            onClick={e => handleRemove(e, id)}
            variant="custom"
            size="small"
            className="absolute top-1 right-1 p-1 border border-gray-300 text-gray-300 rounded-lg"
          >
            <Icon
              name="cross"
              size="xs"
              className="text-gray-300 leading-none"
            />
          </Button>
        </div>
      ))}
    </div>
  );
};
