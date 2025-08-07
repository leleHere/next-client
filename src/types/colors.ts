/**
 * 项目颜色变量类型定义
 * 提供颜色变量的类型安全和自动补全支持
 */

export interface ColorVariables {
  // 基础颜色
  background: string;
  foreground: string;

  // 主色调 - 紫色系
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;

  // 蓝色系
  blue50: string;
  blue100: string;
  blue200: string;
  blue300: string;
  blue400: string;
  blue500: string;
  blue600: string;
  blue700: string;
  blue800: string;
  blue900: string;

  // 紫色渐变系
  purpleGradient1: string;
  purpleGradient2: string;
  purpleGradient3: string;
  purpleGradient4: string;

  // 聊天界面颜色
  chatBgPrimary: string;
  chatBgSecondary: string;
  chatBgTertiary: string;
  chatBgQuaternary: string;
  chatBgQuinary: string;

  // 按钮和交互颜色
  btnPrimary: string;
  btnPrimaryHover: string;
  btnSecondary: string;
  btnSecondaryHover: string;

  // 文字颜色
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  textAccent: string;

  // 边框颜色
  borderPrimary: string;
  borderSecondary: string;
  borderAccent: string;

  // 阴影颜色
  shadowPrimary: string;
  shadowSecondary: string;
  shadowTertiary: string;
  shadowQuaternary: string;
  shadowAccent: string;

  // 登录页面特殊颜色
  loginPrimary: string;
  loginSecondary: string;
  loginAccent: string;
  loginBg: string;

  // 白色和透明色
  white: string;
  whiteTransparent82: string;
  whiteTransparent7: string;

  // 背景色
  bgLight: string;
  bgWhite: string;

  // 状态颜色
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * 获取CSS变量值的工具函数
 * @param variableName CSS变量名（不包含--前缀）
 * @returns CSS变量的值
 */
export function getCSSVariable(variableName: keyof ColorVariables): string {
  return getComputedStyle(document.documentElement).getPropertyValue(
    `--${variableName.replace(/([A-Z])/g, "-$1").toLowerCase()}`
  );
}

/**
 * 设置CSS变量值的工具函数
 * @param variableName CSS变量名（不包含--前缀）
 * @param value 要设置的值
 */
export function setCSSVariable(
  variableName: keyof ColorVariables,
  value: string
): void {
  document.documentElement.style.setProperty(
    `--${variableName.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
    value
  );
}

/**
 * 颜色主题类型
 */
export type ColorTheme = "light" | "dark";

/**
 * 颜色工具类
 */
export class ColorUtils {
  /**
   * 获取当前主题
   */
  static getCurrentTheme(): ColorTheme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  /**
   * 监听主题变化
   * @param callback 主题变化时的回调函数
   */
  static onThemeChange(callback: (theme: ColorTheme) => void): () => void {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      callback(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);

    // 返回清理函数
    return () => mediaQuery.removeEventListener("change", handler);
  }

  /**
   * 生成渐变背景
   * @param colors 颜色数组
   * @param direction 渐变方向
   * @returns CSS渐变字符串
   */
  static createGradient(colors: string[], direction: string = "90deg"): string {
    const colorStops = colors
      .map((color, index) => {
        const percentage = (index / (colors.length - 1)) * 100;
        return `${color} ${percentage}%`;
      })
      .join(", ");

    return `linear-gradient(${direction}, ${colorStops})`;
  }

  /**
   * 生成阴影
   * @param color 阴影颜色
   * @param opacity 透明度 (0-1)
   * @param blur 模糊半径
   * @param spread 扩散半径
   * @param offsetX X轴偏移
   * @param offsetY Y轴偏移
   * @returns CSS阴影字符串
   */
  static createShadow(
    color: string,
    opacity: number = 0.1,
    blur: number = 8,
    spread: number = 0,
    offsetX: number = 0,
    offsetY: number = 2
  ): string {
    const rgbaColor = this.hexToRgba(color, opacity);
    return `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor}`;
  }

  /**
   * 将十六进制颜色转换为RGBA
   * @param hex 十六进制颜色
   * @param alpha 透明度
   * @returns RGBA颜色字符串
   */
  static hexToRgba(hex: string, alpha: number = 1): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * 检查颜色对比度是否满足可访问性要求
   * @param foreground 前景色
   * @param background 背景色
   * @returns 对比度比率
   */
  static getContrastRatio(foreground: string, background: string): number {
    const getLuminance = (color: string) => {
      const hex = color.replace("#", "");
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;

      const [rs, gs, bs] = [r, g, b].map((c) => {
        if (c <= 0.03928) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }
}

/**
 * 预定义的颜色组合
 */
export const ColorCombinations = {
  // 主要按钮样式
  primaryButton: {
    background: `linear-gradient(90deg, var(--btn-primary) 0%, var(--btn-secondary) 100%)`,
    color: "var(--text-secondary)",
    border: "none",
    boxShadow: "0 2px 8px var(--shadow-primary)",
  },

  // 次要按钮样式
  secondaryButton: {
    background: "var(--white)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-primary)",
    boxShadow: "0 1px 4px var(--shadow-primary)",
  },

  // 卡片样式
  card: {
    background: "var(--white-transparent-82)",
    border: "1px solid var(--border-primary)",
    boxShadow: "0 4px 24px var(--shadow-primary)",
    color: "var(--text-primary)",
  },

  // 输入框样式
  input: {
    background: "var(--white)",
    border: "1.5px solid var(--border-primary)",
    color: "var(--text-primary)",
  },

  // 输入框焦点样式
  inputFocus: {
    borderColor: "var(--border-secondary)",
    boxShadow: "0 0 0 2px var(--shadow-accent)",
  },
} as const;

/**
 * 颜色常量
 */
export const COLORS = {
  // 基础颜色
  BACKGROUND: "var(--background)",
  FOREGROUND: "var(--foreground)",

  // 主色调
  PRIMARY_500: "var(--primary-500)",
  PRIMARY_600: "var(--primary-600)",
  PRIMARY_700: "var(--primary-700)",

  // 蓝色系
  BLUE_500: "var(--blue-500)",
  BLUE_600: "var(--blue-600)",

  // 文字颜色
  TEXT_PRIMARY: "var(--text-primary)",
  TEXT_SECONDARY: "var(--text-secondary)",
  TEXT_MUTED: "var(--text-muted)",

  // 状态颜色
  SUCCESS: "var(--success)",
  WARNING: "var(--warning)",
  ERROR: "var(--error)",
  INFO: "var(--info)",
} as const;
