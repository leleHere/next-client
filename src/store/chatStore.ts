import { create } from "zustand";

// 单条消息的数据结构
export interface Message {
  role: string; // 消息发送方（"user" | "ai"）
  text: string; // 消息内容
  time: string; // 消息时间戳（字符串格式）
}

// 聊天历史项的数据结构
export interface ChatHistory {
  id: number; // 聊天会话唯一ID
  title: string; // 聊天标题
  messages: Message[]; // 当前会话的所有消息
  lastTime: string; // 最后一条消息的时间
}

// 聊天全局状态类型
interface ChatState {
  history: ChatHistory[]; // 所有聊天历史
  currentId: number | null; // 当前选中的会话ID
  messages: Message[]; // 当前会话的消息列表
  input: string; // 聊天输入框内容
  loading: boolean; // 是否处于加载/发送中
  streamingMessage: string | null; // AI流式响应中的消息内容
  streamingTime: string; // AI流式消息的时间戳
  messagesEndRef: React.RefObject<HTMLDivElement> | null; // 消息区底部ref（用于自动滚动）
  // 状态set方法
  setHistory: (history: ChatHistory[]) => void;
  setCurrentId: (id: number | null) => void;
  setMessages: (messages: Message[]) => void;
  setInput: (input: string) => void;
  setLoading: (loading: boolean) => void;
  setStreamingMessage: (msg: string | null) => void;
  setStreamingTime: (time: string) => void;
  setMessagesEndRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

// 聊天全局状态store
export const useChatStore = create<ChatState>((set) => ({
  history: [],
  currentId: null,
  messages: [],
  input: "",
  loading: false,
  streamingMessage: null,
  streamingTime: "",
  messagesEndRef: null,
  setHistory: (history) => set({ history }),
  setCurrentId: (id) => set({ currentId: id }),
  setMessages: (messages) => set({ messages }),
  setInput: (input) => set({ input }),
  setLoading: (loading) => set({ loading }),
  setStreamingMessage: (msg) => set({ streamingMessage: msg }),
  setStreamingTime: (time) => set({ streamingTime: time }),
  setMessagesEndRef: (ref) => set({ messagesEndRef: ref }),
}));
