import { Input, Button, Flex } from "antd";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  loading: boolean;
  handleSend: () => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  stopStreaming: () => void;
  isStreaming: boolean;
}

export default function ChatInput({
  input,
  setInput,
  loading,
  handleSend,
  handleInputKeyDown,
  stopStreaming,
  isStreaming,
}: ChatInputProps) {
  return (
    <Flex className={styles.inputArea} align="center" gap={8}>
      <Input
        className={styles.input}
        size="large"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleInputKeyDown}
        disabled={loading}
        prefix={<SmileOutlined />}
        autoFocus
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        size="large"
        className={styles.sendBtn}
        onClick={handleSend}
        disabled={loading || !input.trim()}
      >
        Send
      </Button>
      {isStreaming && stopStreaming && (
        <Button
          type="default"
          danger
          size="large"
          className={styles.sendBtn}
          onClick={stopStreaming}
          style={{ marginLeft: 4 }}
        >
          Stop
        </Button>
      )}
    </Flex>
  );
}
