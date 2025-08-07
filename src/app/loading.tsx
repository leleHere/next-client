import { Spin } from "antd";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(135deg, var(--chat-bg-primary) 0%, var(--chat-bg-secondary) 100%)",
      }}
    >
      <Spin size="large" tip="Loading..." style={{ marginBottom: 32 }} />
      <div style={{ width: 400 }}>
        <Skeleton height={32} count={6} style={{ marginBottom: 16 }} />
        <Skeleton height={48} width={320} style={{ borderRadius: 12 }} />
      </div>
    </div>
  );
}
