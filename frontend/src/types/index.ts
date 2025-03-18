export interface ChatRequest {
  user_message: string;
  conversation_id?: number;
  max_tokens?: number;
  temperature?: number;
}

export interface ResultItem {
  main: string[];
  details: string[];
}

export interface Message {
  id?: number;
  conversation_id?: number;
  content: string;
  liked?: boolean;
  role: 'user' | 'assistant';
}
