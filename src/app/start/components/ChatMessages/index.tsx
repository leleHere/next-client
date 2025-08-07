import { Tooltip, Spin, Empty } from "antd";
import { RobotOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

interface ChatMessagesProps {
  messages: any[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  streamingMessage?: string | null;
}

export default function ChatMessages({
  messages,
  loading,
  messagesEndRef,
  streamingMessage,
}: ChatMessagesProps) {
  const hasMessages = messages.length > 0 || !!streamingMessage;

  return (
    <div className={styles.messagesArea}>
      <div className={styles.messagesInner}>
        {hasMessages ? (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === "ai"
                    ? `${styles.message} ${styles.ai}`
                    : `${styles.message} ${styles.user}`
                }
              >
                <div className={styles.avatar}>
                  {msg.role === "ai" ? <RobotOutlined /> : <UserOutlined />}
                </div>
                <Tooltip
                  title={msg.time}
                  placement={msg.role === "ai" ? "right" : "left"}
                >
                  <div className={styles.bubble}>
                    {msg.text}
                    <span className={styles.bubbleTimestamp}>{msg.time}</span>
                    <span className={styles.bubbleTail}></span>
                  </div>
                </Tooltip>
              </div>
            ))}
            {streamingMessage && (
              <div className={`${styles.message} ${styles.ai}`}>
                <div className={styles.avatar}>
                  <RobotOutlined />
                </div>
                <div className={styles.bubble}>
                  {streamingMessage}
                  <span className={styles.blinkingCursor}>|</span>
                  <span className={styles.bubbleTimestamp}>
                    {new Date().toLocaleTimeString()}
                  </span>
                  <span className={styles.bubbleTail}></span>
                </div>
              </div>
            )}
            {loading && !streamingMessage && (
              <div className={`${styles.message} ${styles.ai}`}>
                <div className={styles.avatar}>
                  <RobotOutlined />
                </div>
                <div className={styles.bubble}>
                  <Spin size="small" /> <span>AI is typing...</span>
                  <span className={styles.bubbleTimestamp}>
                    {new Date().toLocaleTimeString()}
                  </span>
                  <span className={styles.bubbleTail}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div
            style={{
              margin: "80px 0",
              textAlign: "center",
              color: "var(--text-accent)",
            }}
          >
            <Empty description="No messages yet. Start the conversation!" />
          </div>
        )}
      </div>
    </div>
  );
}
