"use client";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";

interface LogoutButtonProps {
  type?: "primary" | "default" | "dashed" | "link" | "text";
  size?: "large" | "middle" | "small";
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  type = "default",
  size = "middle",
  className,
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button
      type={type}
      size={size}
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      className={className}
    >
      登出
    </Button>
  );
};
