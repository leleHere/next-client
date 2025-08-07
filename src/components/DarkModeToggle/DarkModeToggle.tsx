"use client";

import React from "react";
import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useDarkMode } from "@/hooks/useDarkMode";

interface DarkModeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "small" | "middle" | "large";
  showText?: boolean;
  position?: "fixed" | "absolute" | "relative";
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  className = "",
  style = {},
  size = "middle",
  showText = false,
  position = "fixed",
}) => {
  const { theme, mounted, toggleTheme, isDark } = useDarkMode();

  // 防止服务端渲染时的闪烁
  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          ...style,
          position,
          top: position === "fixed" ? "20px" : "auto",
          right: position === "fixed" ? "20px" : "auto",
          zIndex: 1000,
          width: size === "small" ? "32px" : size === "large" ? "48px" : "40px",
          height:
            size === "small" ? "32px" : size === "large" ? "48px" : "40px",
          borderRadius: "50%",
          background: "var(--bg-light)",
          border: "1px solid var(--border-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      />
    );
  }

  const buttonStyle: React.CSSProperties = {
    position,
    top: position === "fixed" ? "20px" : "auto",
    right: position === "fixed" ? "20px" : "auto",
    zIndex: 1000,
    width: size === "small" ? "32px" : size === "large" ? "48px" : "40px",
    height: size === "small" ? "32px" : size === "large" ? "48px" : "40px",
    borderRadius: "50%",
    background: isDark ? "var(--primary-600)" : "var(--bg-light)",
    border: `1px solid ${
      isDark ? "var(--primary-500)" : "var(--border-primary)"
    }`,
    color: isDark ? "white" : "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: isDark
      ? "0 4px 12px rgba(99, 102, 241, 0.3)"
      : "0 2px 8px var(--shadow-primary)",
    ...style,
  };

  const iconStyle: React.CSSProperties = {
    fontSize: size === "small" ? "14px" : size === "large" ? "20px" : "16px",
    transition: "transform 0.3s ease",
  };

  const handleClick = () => {
    toggleTheme();
    // 添加点击动画效果
    const button = document.querySelector(".dark-mode-toggle") as HTMLElement;
    if (button) {
      button.style.transform = "scale(0.9)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 100);
    }
  };

  return (
    <Tooltip
      title={isDark ? "切换到浅色模式" : "切换到深色模式"}
      placement="left"
    >
      <Button
        className={`dark-mode-toggle ${className}`}
        style={buttonStyle}
        onClick={handleClick}
        type="text"
        icon={
          isDark ? (
            <SunOutlined style={iconStyle} />
          ) : (
            <MoonOutlined style={iconStyle} />
          )
        }
      >
        {showText && (isDark ? "浅色" : "深色")}
      </Button>
    </Tooltip>
  );
};

export default DarkModeToggle;
