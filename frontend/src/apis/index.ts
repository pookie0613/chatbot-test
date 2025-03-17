import axios from 'axios';
import { ChatRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendChatMessage = async (request: ChatRequest): Promise<any> => {
  const response = await api.post<any>('/chat', request);
  return response.data;
};
