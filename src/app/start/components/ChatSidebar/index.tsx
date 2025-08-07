import { List, Button } from "antd";
import {
  HistoryOutlined,
  MessageOutlined,
  MessageTwoTone,
} from "@ant-design/icons";
import styles from "./styles.module.css";

interface ChatSidebarProps {
  history: any[];
  currentId: number;
  onSelect: (id: number) => void;
  onNewChat: () => void;
}

export default function ChatSidebar({
  history,
  currentId,
  onSelect,
  onNewChat,
}: ChatSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <HistoryOutlined /> <span>Chat History</span>
      </div>
      <div className={styles.newChatBtnWrapper}>
        <Button
          type="primary"
          icon={<MessageOutlined />}
          className={styles.newChatBtn}
          onClick={onNewChat}
        >
          New Chat
        </Button>
      </div>
      <List
        className={styles.historyList}
        dataSource={history}
        renderItem={(item) => (
          <List.Item
            className={
              item.id === currentId ? styles.activeHistory : styles.historyItem
            }
            onClick={() => onSelect(item.id)}
            tabIndex={0}
            aria-label={item.title}
          >
            <span className={styles.historyIcon}>
              <MessageTwoTone
                twoToneColor={
                  item.id === currentId
                    ? ["var(--purple-gradient-2)", "var(--purple-gradient-3)"]
                    : ["var(--purple-gradient-1)", "var(--purple-gradient-3)"]
                }
              />
            </span>
            <span className={styles.historyText}>
              <span className={styles.historyTitle}>{item.title}</span>
              <span className={styles.historyPreview}>
                {item.messages?.length > 0
                  ? item.messages[item.messages.length - 1].text.slice(0, 24)
                  : "No messages yet"}
              </span>
            </span>
            <span className={styles.historyTime}>{item.lastTime}</span>
          </List.Item>
        )}
      />
    </aside>
  );
}
