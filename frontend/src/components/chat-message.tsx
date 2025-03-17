import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`mb-4 text-lg ${
        message.sender === 'user' ? 'text-right' : 'text-left'
      }`}
    >
      {message.text}
    </div>
  );
};
