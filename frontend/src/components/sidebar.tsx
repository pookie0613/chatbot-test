import React from 'react';
import { Icon } from '@iconify/react';
import { ChatHistoryItem } from './chat-history-item';
import { SearchInput } from './search-input';

interface Conversation {
  id: number;
  title: string;
  created_at: string;
}

interface SidebarProps {
  conversations: Conversation[];
  selectConversationId?: number;
  isCollapsed: boolean;
  search: string;
  onChatSelect: (id: number) => void;
  onChatDelete: (id: number) => void;
  onSetSearch: (search: string) => void;
  onToggleCollapse: () => void;
  initializeChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  selectConversationId,
  isCollapsed,
  search,
  initializeChat,
  onSetSearch,
  onChatSelect,
  onChatDelete,
  onToggleCollapse,
}) => {
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
            <button
              className="bg-purple-600 text-white w-full py-2 px-4 rounded mt-2"
              onClick={initializeChat}
            >
              New Chat +
            </button>

            <SearchInput value={search} onChange={onSetSearch} />
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-300px)] mt-2">
            {conversations.map((chat) => (
              <ChatHistoryItem
                key={chat.id}
                isActive={chat.id === selectConversationId}
                chat={chat}
                onChatSelect={onChatSelect}
                onChatDelete={onChatDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="px-4">
          <Icon icon="tabler:message-circle" width="24" height="24" />
          <button
            className="bg-purple-600 text-white py-2 text-lg px-4 rounded mt-2"
            onClick={initializeChat}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
