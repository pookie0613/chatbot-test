import React, { useState } from 'react';
import { Message } from '../types';
import { Icon } from '@iconify/react';

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
    <div
      className={`mb-4 text-lg p-3 rounded-lg ${
        message.role === 'user'
          ? 'text-right bg-blue-200 ml-5'
          : 'text-left border border-grey mr-5'
      }`}
    >
      {message.content}
      {message.role !== 'user' && (
        <div className="flex justify-between border-t-2 border-grey mt-2 pt-2 text-xs text-gray-500">
          Was this response helpful?
          <div className="flex items-center justify-center gap-2">
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
  );
};
