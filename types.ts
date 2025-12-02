export enum RizzMode {
  GENERIC = 'GENERIC',
  CHAT_HISTORY = 'CHAT_HISTORY',
  SCREENSHOT = 'SCREENSHOT',
}

export interface GenerationResult {
  text: string;
  error?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}