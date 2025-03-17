import React from 'react';
import { Icon } from '@iconify/react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen flex flex-col gap-2 items-center justify-center bg-gray-900 bg-opacity-10">
      <div className="absolute left-1/2 top-[20%] -translate-x-1/2 flex justify-center items-center flex-col">
        <Icon
          icon="quill:loading-spin"
          className="w-12 h-12 animate-spin text-dark-red mb-3"
        />
        <p className="text-lg">Antwort wird generiert...</p>
      </div>
    </div>
  );
};
