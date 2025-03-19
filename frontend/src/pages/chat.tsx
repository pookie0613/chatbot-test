import React, { useState, useRef, useEffect } from 'react';
import {
  sendChatMessage,
  getConversations,
  getMessagesByConversationId,
  deleteConversation,
  changeMessageVote,
} from '../apis';
import { ChatMessage } from '../components/chat-message';
import { ChatInput } from '../components/chat-input';
import { Message } from '../types';
import { Loader } from '../components/loader';
import { Sidebar } from '../components/sidebar';

export const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectConversationId, setSelectConversationId] = useState<number>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async (searchString?: string) => {
    try {
      const data = await getConversations(searchString);
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { content: input, role: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('user_message', input.trim());
      formData.append(
        'conversation_id',
        selectConversationId?.toString() || ''
      );

      // Append files
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await sendChatMessage(formData);

      if (!selectConversationId) {
        setSelectConversationId(response.conversation_id);
        await fetchConversations();
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

  const handleMessageVote = async (id: number, liked?: boolean) => {
    try {
      await changeMessageVote(id, liked);
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === id ? { ...msg, liked } : msg))
      );
    } catch (error) {
      console.error('Error get messages:', error);
    }
  };

  const initializeChat = async () => {
    setMessages([]);
    setSelectConversationId(undefined);
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
        search={search}
        onSetSearch={setSearch}
        initializeChat={initializeChat}
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
            <ChatMessage
              key={index}
              message={message}
              handleMessageVote={handleMessageVote}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          input={input}
          isLoading={isLoading}
          selectedFiles={selectedFiles}
          onInputChange={setInput}
          onFileChange={setSelectedFiles}
          onSubmit={handleSubmit}
        />

        {isLoading && <Loader />}
      </div>
    </div>
  );
};
