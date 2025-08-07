"use client";

import React, { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  MessageOutlined,
  BgColorsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import styles from "./styles.module.css";
import DarkModeToggle from "../DarkModeToggle";

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState(pathname);

  // 导航菜单项
  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: "首页",
    },
    {
      key: "/start",
      icon: <MessageOutlined />,
      label: "聊天",
    },
    {
      key: "/color",
      icon: <BgColorsOutlined />,
      label: "颜色",
    },
  ];

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "登出",
      onClick: logout,
    },
  ];

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    setActiveKey(key);
    router.push(key);
  };

  return (
    <AntHeader className={styles.header}>
      <div className={styles.headerContent}>
        {/* 左侧区域 */}
        <div className={styles.leftSection}>
          {/* Logo */}
          <div className={styles.logo} onClick={() => router.push("/home")}>
            <AppstoreOutlined className={styles.logoIcon} />
            <span className={styles.logoText}>Next Client</span>
          </div>

          {/* 导航菜单 */}
          <Menu
            mode="horizontal"
            selectedKeys={[activeKey]}
            onClick={handleMenuClick}
            className={styles.navMenu}
            items={menuItems}
          />
        </div>

        {/* 右侧区域 */}
        <div className={styles.rightSection}>
          {/* 用户信息 */}
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["hover"]}
            overlayClassName={styles.userDropdown}
          >
            <div className={styles.userInfo}>
              <Avatar
                icon={<UserOutlined />}
                className={styles.userAvatar}
                size="small"
              />
              <Space className={styles.userDetails}>
                <span className={styles.userName}>
                  {user?.username || "用户"}
                </span>
                <span className={styles.userRole}>{user?.role || "user"}</span>
              </Space>
            </div>
          </Dropdown>
          <DarkModeToggle position="relative" />
        </div>
      </div>
    </AntHeader>
  );
};
