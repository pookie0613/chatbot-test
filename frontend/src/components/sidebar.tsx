import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import ChatHistoryItem from './chat-history-item.tsx';

interface Conversation {
  id: number;
  title: string;
  created_at: string;
}

interface SidebarProps {
  conversations: Conversation[];
  onChatSelect: (id: number) => void;
  onChatDelete: (id: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  onChatSelect,
  onChatDelete,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div
      className={`relative border-r border-gray-200 transition-width duration-300 py-4 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <button
        onClick={onToggleCollapse}
        className="absolute right-[-12px] flex items-center"
      >
        <Icon
          icon={
            !isCollapsed
              ? 'tabler:circle-arrow-left-filled'
              : 'tabler:circle-arrow-right-filled'
          }
          width="24"
          height="24"
        />
      </button>
      {!isCollapsed ? (
        <>
          <div className="px-4">
            <div className="flex items-center">
              <Icon icon="tabler:message-circle" width="24" height="24" />
              <h2 className="text-lg font-bold ml-3">Chat History</h2>
            </div>
            <button className="bg-purple-600 text-white w-full py-2 px-4 rounded mt-2">
              New Chat +
            </button>

            <div className="relative my-4">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-2.5 text-gray-500"
                width="20"
                height="20"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded-md pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {conversations.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              chat={chat}
              onChatSelect={onChatSelect}
              onChatDelete={onChatDelete}
            />
          ))}
        </>
      ) : (
        <div className="px-4">
          <Icon icon="tabler:message-circle" width="24" height="24" />
          <button className="bg-purple-600 text-white py-2 text-lg px-4 rounded mt-2">
            +
          </button>
        </div>
      )}
    </div>
  );
};
