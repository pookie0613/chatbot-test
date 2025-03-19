import axios from 'axios';
import { ChatRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getConversations = async (search?: string): Promise<any> => {
  const response = await api.get<any>('/conversations', {
    params: search ? { search } : {},
  });
  return response.data;
};

export const getMessagesByConversationId = async (id: number): Promise<any> => {
  const response = await api.get<any>(`/conversations/${id}/messages`);
  return response.data;
};

export const sendChatMessage = async (formData: FormData) => {
  const response = await api.post<any>('/message', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const changeMessageVote = async (
  messageId: number,
  liked?: boolean
): Promise<any> => {
  const response = await api.put<any>(`/messages/${messageId}/like`, null, {
    params: { liked },
  });
  return response.data;
};

export const deleteConversation = async (id: number): Promise<any> => {
  const response = await api.delete<any>(`/conversations/${id}`);
  return response.data;
};
