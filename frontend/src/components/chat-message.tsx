import React from 'react';
import { Message } from '../types';
import { Icon } from '@iconify/react';
import { FilePreview } from './file-preview';

interface ChatMessageProps {
  message: Message;
  handleMessageVote: (id: number, liked?: boolean) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  handleMessageVote,
}) => {
  const handleThumbUpClick = () => {
    if (message.id) {
      handleMessageVote(message.id, message.liked ? undefined : true);
    }
  };

  const handleThumbDownClick = () => {
    if (message.id) {
      handleMessageVote(
        message.id,
        message.liked === false ? undefined : false
      );
    }
  };

  return (
    <div className="mb-4">
      <div
        className={`text-lg p-3 rounded-lg ${
          message.role === 'user'
            ? 'text-right bg-blue-200 ml-5'
            : 'text-left border border-gray-300 mr-5'
        }`}
      >
        {message.files && message.files?.length > 0 && (
          <div className="flex mb-2 gap-2">
            {message.files.map((file) => (
              <div key={file.id} className="mt-2 p-2 bg-gray-100 rounded-lg">
                <FilePreview file={file} />
              </div>
            ))}
          </div>
        )}

        {message.content}

        {message.role === 'assistant' && (
          <div className="flex justify-between border-t-2 border-gray-300 mt-2 pt-2 text-xs text-gray-500">
            Was this response helpful?
            <div className="flex items-center gap-2">
              <Icon
                className={`cursor-pointer ${
                  message.liked ? 'text-yellow-500' : ''
                }`}
                icon={
                  message.liked
                    ? 'material-symbols:thumb-up'
                    : 'material-symbols:thumb-up-outline'
                }
                width="16"
                height="16"
                onClick={handleThumbUpClick}
              />
              <Icon
                className={`cursor-pointer ${
                  message.liked === false ? 'text-yellow-500' : ''
                }`}
                icon={
                  message.liked === false
                    ? 'material-symbols:thumb-down'
                    : 'material-symbols:thumb-down-outline'
                }
                width="16"
                height="16"
                onClick={handleThumbDownClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
