"use client";
import React from "react";
import { Button, Card, Input, Space, Typography } from "antd";
import { COLORS, ColorCombinations, ColorUtils } from "../../types/colors";

const { Title, Text } = Typography;

/**
 * 颜色系统使用示例组件
 * 展示如何在组件中使用新的颜色变量系统
 */
const ColorExample: React.FC = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    // 监听主题变化
    const cleanup = ColorUtils.onThemeChange(setTheme);
    return cleanup;
  }, []);

  const handleColorChange = () => {
    // 动态改变主题色示例
    const newColor = "var(--primary-500)";
    document.documentElement.style.setProperty("--primary-500", newColor);
  };

  return (
    <div
      style={{
        padding: "24px",
        background: COLORS.BACKGROUND,
        overflow: "auto",
      }}
    >
      <Title level={2} style={{ color: COLORS.TEXT_PRIMARY }}>
        颜色系统使用示例
      </Title>

      <Text style={{ color: COLORS.TEXT_SECONDARY }}>当前主题: {theme}</Text>

      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginTop: "24px" }}
      >
        {/* 按钮示例 */}
        <Card title="按钮颜色示例" style={ColorCombinations.card}>
          <Space>
            <Button
              type="primary"
              style={ColorCombinations.primaryButton}
              onClick={handleColorChange}
            >
              主要按钮
            </Button>

            <Button style={ColorCombinations.secondaryButton}>次要按钮</Button>

            <Button
              style={{
                background: COLORS.SUCCESS,
                color: "white",
                border: "none",
              }}
            >
              成功按钮
            </Button>

            <Button
              style={{
                background: COLORS.ERROR,
                color: "white",
                border: "none",
              }}
            >
              错误按钮
            </Button>
          </Space>
        </Card>

        {/* 输入框示例 */}
        <Card title="输入框颜色示例" style={ColorCombinations.card}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              placeholder="使用颜色变量的输入框"
              style={ColorCombinations.input}
            />

            <Input
              placeholder="带样式的输入框"
              style={{
                ...ColorCombinations.input,
                borderColor: COLORS.PRIMARY_500,
              }}
            />
          </Space>
        </Card>

        {/* 渐变示例 */}
        <Card title="渐变颜色示例" style={ColorCombinations.card}>
          <div
            style={{
              height: "60px",
              background: ColorUtils.createGradient(
                ["var(--purple-gradient-1)", "var(--purple-gradient-2)"],
                "135deg"
              ),
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            紫色渐变背景
          </div>
        </Card>

        {/* 阴影示例 */}
        <Card title="阴影颜色示例" style={ColorCombinations.card}>
          <div
            style={{
              height: "60px",
              background: COLORS.BACKGROUND,
              borderRadius: "8px",
              boxShadow: ColorUtils.createShadow(
                ColorUtils.hexToRgba("var(--primary-500)", 0.2),
                0.2,
                12,
                0,
                0,
                4
              ),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.TEXT_PRIMARY,
            }}
          >
            自定义阴影效果
          </div>
        </Card>

        {/* 颜色对比度测试 */}
        <Card title="颜色对比度测试" style={ColorCombinations.card}>
          <Space direction="vertical">
            <div
              style={{
                padding: "12px",
                background: COLORS.PRIMARY_500,
                color: "white",
                borderRadius: "4px",
              }}
            >
              高对比度文本 (主色调背景)
            </div>

            <div
              style={{
                padding: "12px",
                background: COLORS.TEXT_MUTED,
                color: COLORS.TEXT_PRIMARY,
                borderRadius: "4px",
              }}
            >
              中等对比度文本 (静音色背景)
            </div>

            <Text style={{ color: COLORS.TEXT_SECONDARY }}>
              对比度比率:{" "}
              {ColorUtils.getContrastRatio(
                "var(--primary-500)",
                "var(--white)"
              ).toFixed(2)}
            </Text>
          </Space>
        </Card>

        {/* 动态颜色变化示例 */}
        <Card title="动态颜色变化" style={ColorCombinations.card}>
          <Space>
            <Button
              onClick={() => {
                document.documentElement.style.setProperty(
                  "--primary-500",
                  "var(--error)"
                );
              }}
              style={{
                background: "var(--error)",
                color: "white",
                border: "none",
              }}
            >
              改为红色主题
            </Button>

            <Button
              onClick={() => {
                document.documentElement.style.setProperty(
                  "--primary-500",
                  "var(--primary-500)"
                );
              }}
              style={{
                background: "var(--primary-500)",
                color: "white",
                border: "none",
              }}
            >
              恢复紫色主题
            </Button>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default ColorExample;
