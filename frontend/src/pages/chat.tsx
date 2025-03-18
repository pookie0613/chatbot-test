import React, { useState, useRef, useEffect } from 'react';
import {
  sendChatMessage,
  getConversations,
  getMessagesByConversationId,
  deleteConversation,
} from '../apis';
import { ChatMessage } from '../components/chat-message.tsx';
import { ChatInput } from '../components/chat-input.tsx';
import { Message } from '../types';
import { Loader } from '../components/loader';
import { Sidebar } from '../components/sidebar';

export const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectConversationId, setSelectConversationId] = useState<number>();
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { content: input, role: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        user_message: input.trim(),
        conversation_id: selectConversationId,
      });

      if (!selectConversationId) {
        setSelectConversationId(response.conversation_id);
      }

      const botMessage: Message = {
        content: response.bot_message,
        role: 'assistant',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        content: 'Sorry, there was an error processing your request.',
        role: 'assistant',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConversations = async (searchString?: string) => {
    try {
      const data = await getConversations(searchString);
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleChatSelect = async (id: number) => {
    try {
      const data = await getMessagesByConversationId(id);
      setSelectConversationId(id);
      setMessages(data);
    } catch (error) {
      console.error('Error get messages:', error);
    }
  };

  const handleChatDelete = async (id: number) => {
    try {
      await deleteConversation(id);
      if (selectConversationId === id) {
        setMessages([]);
        setSelectConversationId(undefined);
      }
      await fetchConversations();
    } catch (error) {
      console.error('Error get messages:', error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    fetchConversations(search);
  }, [search]);

  return (
    <div className="flex h-full">
      <Sidebar
        conversations={conversations}
        selectConversationId={selectConversationId}
        isCollapsed={isCollapsed}
        onChatSelect={handleChatSelect}
        onChatDelete={handleChatDelete}
        onToggleCollapse={toggleSidebar}
      />
      <div className="flex flex-col flex-1">
        <div className="text-4xl font-bold py-6 text-center border-b-2 border-gray-200">
          Chat bot
        </div>

        <div className="container mx-auto flex-1 overflow-y-auto py-4 px-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />

        {isLoading && <Loader />}
      </div>
    </div>
  );
};
