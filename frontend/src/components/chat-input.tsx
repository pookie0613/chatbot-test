import React from 'react';
import { Icon } from '@iconify/react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="p-4 lg:p-8 border-t-2 bg-white">
      <div className="container mx-auto">
        <form onSubmit={onSubmit} className="flex items-center relative">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="w-full text-lg py-4 pl-6 pr-20 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Input your message"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || input.trim() === ''}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:bg-gray-send"
          >
            <Icon icon="fluent:send-48-regular" className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
