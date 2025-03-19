import React, { useState } from 'react';
import { format, formatDistanceToNow, isBefore, subDays } from 'date-fns';
import { Icon } from '@iconify/react';

interface Chat {
  id: number;
  title: string;
  created_at: string;
}

interface ChatButtonProps {
  chat: Chat;
  isActive: boolean;
  onChatSelect: (id: number) => void;
  onChatDelete: (id: number) => void;
}

const ChatHistoryItem: React.FC<ChatButtonProps> = ({
  chat,
  isActive,
  onChatSelect,
  onChatDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const now = new Date();
  let formattedDate;
  if (isBefore(new Date(chat.created_at), subDays(now, 7))) {
    formattedDate = format(new Date(chat.created_at), 'MMM d, yyyy');
  } else {
    formattedDate = formatDistanceToNow(new Date(chat.created_at), {
      addSuffix: true,
    });
  }

  const truncatedTitle =
    chat.title.length > 20 ? chat.title.slice(0, 20) + '...' : chat.title;

  return (
    <>
      <div
        className={`flex justify-between items-center py-2 hover:bg-gray-200 cursor-pointer w-full px-4 ${
          isActive ? 'bg-gray-300' : ''
        }`}
        onClick={() => onChatSelect(chat.id)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onChatSelect(chat.id);
          }
        }}
        aria-pressed={isActive}
      >
        <div className="flex flex-col items-start">
          <span className="text-sm">{truncatedTitle}</span>
          <span className="text-gray-500 text-xs">{formattedDate}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="text-gray-500"
        >
          <Icon icon="mi:delete" width="16" height="16" />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">Delete Chat</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete <b>{chat.title}</b> chat?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onChatDelete(chat.id);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHistoryItem;
