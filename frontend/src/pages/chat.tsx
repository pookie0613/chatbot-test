import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, getConversations } from '../apis';
import { ChatMessage } from '../components/chat-message.tsx';
import { ChatInput } from '../components/chat-input.tsx';
import { Message } from '../types';
import { Loader } from '../components/loader';
import { Sidebar } from '../components/sidebar';

export const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
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

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        user_message: input.trim(),
      });

      const botMessage: Message = {
        text: response.bot_message,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        text: 'Sorry, there was an error processing your request.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConversations = async (searchString: string) => {
    try {
      const data = await getConversations(searchString);
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleChatSelect = (id: number) => {
    console.log('Selected chat ID:', id);
  };

  const handleChatDelete = (id: number) => {
    console.log('Deleted chat ID:', id);
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
