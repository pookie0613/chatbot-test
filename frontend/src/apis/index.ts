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
  const response = await api.post<any>('/message', request);
  return response.data;
};

export const sendChatMessage = async (request: ChatRequest): Promise<any> => {
  const response = await api.post<any>('/message', request);
  return response.data;
};
