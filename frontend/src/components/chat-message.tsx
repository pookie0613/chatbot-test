import React, { useState } from 'react';
import { Message } from '../types';
import { Icon } from '@iconify/react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [thumbUpActive, setThumbUpActive] = useState(false);
  const [thumbDownActive, setThumbDownActive] = useState(false);

  const handleThumbUpClick = () => {
    setThumbUpActive((prev) => !prev);
    if (thumbDownActive) {
      setThumbDownActive(false);
    }
  };

  const handleThumbDownClick = () => {
    setThumbDownActive((prev) => !prev);
    if (thumbUpActive) {
      setThumbUpActive(false);
    }
  };

  return (
    <div
      className={`mb-4 text-lg p-3 rounded-lg ${
        message.sender === 'user'
          ? 'text-right bg-blue-200 ml-5'
          : 'text-left border border-grey mr-5'
      }`}
    >
      {message.text}
      {message.sender !== 'user' && (
        <div className="flex justify-between border-t-2 border-grey mt-2 pt-2 text-xs text-gray-500">
          Was this response helpful?
          <div className="flex items-center justify-center gap-2">
            <Icon
              className={`cursor-pointer ${
                thumbUpActive ? 'text-yellow-500' : ''
              }`}
              icon={
                thumbUpActive
                  ? 'material-symbols:thumb-up'
                  : 'material-symbols:thumb-up-outline'
              }
              width="16"
              height="16"
              onClick={handleThumbUpClick}
            />
            <Icon
              className={`cursor-pointer ${
                thumbDownActive ? 'text-yellow-500' : ''
              }`}
              icon={
                thumbDownActive
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
      <div></div>
    </div>
  );
};
