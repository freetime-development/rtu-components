import { FC, PropsWithChildren } from 'react';

export const Row: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
