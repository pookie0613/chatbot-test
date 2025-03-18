import React from 'react';
import { Icon } from '@iconify/react';

interface RecentChat {
  id: number;
  title: string;
  timestamp: string;
}

interface ChatButtonProps {
  chat: RecentChat;
  onChatSelect: (id: number) => void;
  onChatDelete: (id: number) => void;
}

const ChatHistoryItem: React.FC<ChatButtonProps> = ({
  chat,
  onChatSelect,
  onChatDelete,
}) => (
  <button
    className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer w-full px-4"
    onClick={() => onChatSelect(chat.id)}
  >
    <div className="flex flex-col items-start">
      <span className="text-sm">{chat.title}</span>
      <span className="text-gray-500 text-xs">{chat.timestamp}</span>
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChatDelete(chat.id);
      }}
      className="text-gray-500"
    >
      <Icon icon="mi:delete" width="16" height="16" />
    </button>
  </button>
);

export default ChatHistoryItem;
