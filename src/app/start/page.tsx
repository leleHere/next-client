"use client";
import { useEffect, useRef } from "react";
import { Typography, Flex, Avatar } from "antd";
import styles from "./start.module.css";
import ChatSidebar from "./components/ChatSidebar";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { useChatStore, Message } from "@/store/chatStore";
import { fetchHistory, fetchChat, createChat, sendMessage } from "@/utils/api";
import { useAuth } from "@/hooks/useAuth";

const { Title } = Typography;

export default function StartPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    history,
    currentId,
    messages,
    input,
    loading,
    streamingMessage,
    streamingTime,
    setHistory,
    setCurrentId,
    setMessages,
    setInput,
    setLoading,
    setStreamingMessage,
    setStreamingTime,
    setMessagesEndRef,
  } = useChatStore();
  const streamTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // 初始化 ref
  const localMessagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessagesEndRef(localMessagesEndRef);
  }, [setMessagesEndRef]);

  // 首次加载历史
  useEffect(() => {
    fetchHistoryList();
  }, []);

  // 切换会话时加载消息
  useEffect(() => {
    if (currentId != null) fetchMessages(currentId);
  }, [currentId]);

  // 滚动到底部
  useEffect(() => {
    if (localMessagesEndRef.current) {
      localMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMessage]);

  const fetchHistoryList = async () => {
    const data = await fetchHistory();
    setHistory(data);
    if (data.length > 0) setCurrentId(data[0].id);
  };

  const fetchMessages = async (id: number) => {
    const data = await fetchChat(id);
    setMessages(data.messages || []);
  };

  const handleSend = async () => {
    if (!input.trim() || currentId == null) return;
    setLoading(true);
    const userMsg: Message = {
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, userMsg]);
    setInput("");
    try {
      const data = await sendMessage(currentId, input);
      if (data.aiText) {
        streamAIResponse(data.aiText);
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleNewChat = async () => {
    setLoading(true);
    try {
      const newChat = await createChat();
      setHistory([newChat, ...history]);
      setCurrentId(newChat.id);
      setMessages(newChat.messages);
      setStreamingMessage(null);
      setStreamingTime("");
      if (streamTimeoutRef.current) {
        clearTimeout(streamTimeoutRef.current);
        streamTimeoutRef.current = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (id: number) => {
    setCurrentId(id);
    setStreamingMessage(null);
    setStreamingTime("");
    if (streamTimeoutRef.current) {
      clearTimeout(streamTimeoutRef.current);
      streamTimeoutRef.current = null;
    }
  };

  const streamAIResponse = (fullText: string) => {
    setStreamingMessage("");
    setLoading(true);
    setStreamingTime(new Date().toLocaleTimeString());
    let i = 0;
    function stream() {
      setStreamingMessage(fullText.slice(0, i + 1));
      if (i < fullText.length - 1) {
        i++;
        streamTimeoutRef.current = setTimeout(stream, 24);
      } else {
        setMessages([
          ...useChatStore.getState().messages,
          { role: "ai", text: fullText, time: new Date().toLocaleTimeString() },
        ]);
        setStreamingMessage(null);
        setLoading(false);
        setStreamingTime("");
        streamTimeoutRef.current = null;
      }
    }
    stream();
  };

  const stopStreaming = () => {
    if (streamTimeoutRef.current) {
      clearTimeout(streamTimeoutRef.current);
      streamTimeoutRef.current = null;
      if (streamingMessage) {
        setMessages([
          ...messages,
          {
            role: "ai",
            text: streamingMessage,
            time: streamingTime || new Date().toLocaleTimeString(),
          },
        ]);
      }
      setStreamingMessage(null);
      setLoading(false);
      setStreamingTime("");
    }
  };

  // 如果正在加载认证状态，显示加载状态
  if (authLoading) {
    return (
      <div className={styles.fullPage}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div>加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.fullPage}>
      <ChatSidebar
        history={history}
        currentId={currentId || 0}
        onSelect={handleSelectHistory}
        onNewChat={handleNewChat}
      />
      <main className={styles.mainArea}>
        <div className={styles.chatCard}>
          <Title level={2} className={styles.title}>
            Start Communicating with AI
          </Title>
          <ChatMessages
            messages={messages}
            loading={loading}
            messagesEndRef={localMessagesEndRef}
            streamingMessage={streamingMessage}
          />
          <ChatInput
            input={input}
            setInput={setInput}
            loading={loading}
            handleSend={handleSend}
            handleInputKeyDown={handleInputKeyDown}
            stopStreaming={stopStreaming}
            isStreaming={!!streamingMessage}
          />
        </div>
      </main>
    </div>
  );
}
