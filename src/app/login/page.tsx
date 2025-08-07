"use client";
import { Form, Input, Button, message, Card, Typography, Flex } from "antd";
import {
  LockOutlined,
  UserOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import styles from "./login.module.css";
import { useAuth } from "@/hooks/useAuth";

const { Link, Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { login, isAuthenticated } = useAuth();
  const cursorRef = useRef<HTMLDivElement>(null);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add(styles.hover);
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove(styles.hover);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const result = await login(values.username, values.password);
      if (result.success) {
        // 登录成功后的跳转由 useAuth hook 处理
        window.location.href = "/start";
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className={styles.cursor}></div>

      <Flex
        className={styles.container}
        justify="center"
        align="center"
        style={{ minHeight: "100vh", position: "relative" }}
      >
        {/* Particle system */}
        <div className={styles.particles}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>

        {/* Animated background blobs */}
        <div className={styles.animatedBg}>
          <div className={`${styles.blob} ${styles.blob1}`}></div>
          <div className={`${styles.blob} ${styles.blob2}`}></div>
          <div className={`${styles.blob} ${styles.blob3}`}></div>
        </div>

        <Card
          className={styles.card}
          styles={{
            body: {
              padding: 0,
              background: "none",
            },
          }}
        >
          <Flex vertical align="center" style={{ marginBottom: 32 }}>
            <img src="/next.svg" alt="Logo" className={styles.logo} />
            <Title
              level={3}
              className={styles.title}
              style={{ marginTop: 8, marginBottom: 0 }}
            >
              登录到您的账户
            </Title>
          </Flex>
          <div className={styles.inputArea}>
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              style={{ padding: 0 }}
              form={form}
              initialValues={{
                username: "admin",
                password: "123456",
              }}
            >
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Flex className={styles.inputWrap}>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="用户名"
                    size="large"
                  />
                </Flex>
              </Form.Item>
              <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Flex className={styles.inputWrap}>
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="密码"
                    size="large"
                  />
                </Flex>
              </Form.Item>
              <Form.Item style={{ marginBottom: 8 }}>
                <Button
                  className={styles.loginBtn}
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  style={{ borderRadius: 8 }}
                >
                  登录
                </Button>
              </Form.Item>
              <div className={styles.forgot}>
                <Link href="#" style={{ fontSize: 14 }}>
                  忘记密码？
                </Link>
              </div>
            </Form>
          </div>
          {/* Styled divider with text */}
          <div className={styles.styledDivider}>
            <span className={styles.styledDividerText}>或使用社交账号登录</span>
          </div>
          {/* Social login buttons (placeholders) */}
          <Flex className={styles.socialBtns} justify="center" gap={12}>
            <span className={styles.socialBtn}>
              <Button icon={<GoogleOutlined />} shape="circle" size="large" />
            </span>
            <span className={styles.socialBtn}>
              <Button icon={<GithubOutlined />} shape="circle" size="large" />
            </span>
          </Flex>
          {/* Register button */}
          <Flex style={{ textAlign: "center" }}>
            <Button
              className={styles.registerBtn}
              type="default"
              size="large"
              block
              onClick={() => (window.location.href = "/register")}
            >
              没有账号？注册新账户
            </Button>
          </Flex>
        </Card>
        {/* Footer */}
        <div className={styles.footer}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </Flex>
    </>
  );
};

export default Login;
