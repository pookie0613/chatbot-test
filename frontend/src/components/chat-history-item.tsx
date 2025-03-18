import React from 'react';
import {
  format,
  formatDistanceToNow,
  isBefore,
  subDays,
  parseISO,
} from 'date-fns';
import { Icon } from '@iconify/react';

interface Chat {
  id: number;
  title: string;
  created_at: string;
}

interface ChatButtonProps {
  chat: Chat;
  onChatSelect: (id: number) => void;
  onChatDelete: (id: number) => void;
}

const ChatHistoryItem: React.FC<ChatButtonProps> = ({
  chat,
  onChatSelect,
  onChatDelete,
}) => {
  const now = new Date();
  let formattedDate;

  if (isBefore(chat.created_at, subDays(now, 7))) {
    formattedDate = format(chat.created_at, '"MMM d, yyyy"');
  } else if (isBefore(chat.created_at, subDays(now, 1))) {
    formattedDate = formatDistanceToNow(chat.created_at, { addSuffix: true });
  } else {
    formattedDate = formatDistanceToNow(chat.created_at, { addSuffix: true });
  }
  const truncatedTitle =
    chat.title.length > 20 ? chat.title.slice(0, 20) + '...' : chat.title;

  return (
    <button
      className="flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer w-full px-4"
      onClick={() => onChatSelect(chat.id)}
    >
      <div className="flex flex-col items-start">
        <span className="text-sm">{truncatedTitle}</span>
        <span className="text-gray-500 text-xs">{formattedDate}</span>
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
};

export default ChatHistoryItem;
