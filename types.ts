
export enum TabType {
  CHAT = 'chat',
  MAP = 'map',
  QUIZ = 'quiz'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  description: string;
  avatar: string;
}
