export interface ChatRequest {
  user_message: string;
  max_tokens?: number;
  temperature?: number;
}

export interface ResultItem {
  main: string[];
  details: string[];
}

export interface Message {
  text: string;
  sender: 'user' | 'bot';
}
