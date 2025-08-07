# 项目颜色系统指南

本项目使用 CSS 变量来管理所有颜色，确保颜色的一致性和可维护性。

## 颜色变量分类

### 1. 基础颜色

```css
--background: #ffffff; /* 页面背景色 */
--foreground: #171717; /* 主要文字颜色 */
```

### 2. 主色调 - 紫色系

```css
--primary-50: #f5f3ff; /* 最浅紫色 */
--primary-100: #ede9fe;
--primary-200: #ddd6fe;
--primary-300: #c4b5fd;
--primary-400: #a78bfa;
--primary-500: #8b5cf6; /* 标准紫色 */
--primary-600: #7c3aed;
--primary-700: #6d28d9;
--primary-800: #5b21b6;
--primary-900: #4c1d95; /* 最深紫色 */
```

### 3. 蓝色系

```css
--blue-50: #eff6ff; /* 最浅蓝色 */
--blue-100: #dbeafe;
--blue-200: #bfdbfe;
--blue-300: #93c5fd;
--blue-400: #60a5fa;
--blue-500: #3b82f6; /* 标准蓝色 */
--blue-600: #2563eb;
--blue-700: #1d4ed8;
--blue-800: #1e40af;
--blue-900: #1e3a8a; /* 最深蓝色 */
```

### 4. 紫色渐变系

```css
--purple-gradient-1: #667eea; /* 渐变起始色 */
--purple-gradient-2: #764ba2; /* 渐变结束色 */
--purple-gradient-3: #f093fb; /* 粉色渐变起始 */
--purple-gradient-4: #f5576c; /* 粉色渐变结束 */
```

### 5. 聊天界面颜色

```css
--chat-bg-primary: #e0e7ff; /* 聊天背景主色 */
--chat-bg-secondary: #f0f2f5; /* 聊天背景次色 */
--chat-bg-tertiary: #f5f7fa; /* 聊天背景第三色 */
--chat-bg-quaternary: #e9eefd; /* 聊天背景第四色 */
--chat-bg-quinary: #c7d2fe; /* 聊天背景第五色 */
```

### 6. 按钮和交互颜色

```css
--btn-primary: #b4b9f6; /* 主要按钮颜色 */
--btn-primary-hover: #a5b4fc; /* 主要按钮悬停色 */
--btn-secondary: #c7d2fe; /* 次要按钮颜色 */
--btn-secondary-hover: #b8c1ec; /* 次要按钮悬停色 */
```

### 7. 文字颜色

```css
--text-primary: #333; /* 主要文字颜色 */
--text-secondary: #555; /* 次要文字颜色 */
--text-tertiary: #222; /* 第三级文字颜色 */
--text-muted: #7b7b93; /* 静音文字颜色 */
--text-accent: #b4b9f6; /* 强调文字颜色 */
```

### 8. 边框颜色

```css
--border-primary: #e0e7ff; /* 主要边框颜色 */
--border-secondary: #b4b9f6; /* 次要边框颜色 */
--border-accent: #a5b4fc; /* 强调边框颜色 */
```

### 9. 阴影颜色

```css
--shadow-primary: #b8c1ec22; /* 主要阴影 */
--shadow-secondary: #b8c1ec33; /* 次要阴影 */
--shadow-tertiary: #b8c1ec44; /* 第三级阴影 */
--shadow-quaternary: #b8c1ec55; /* 第四级阴影 */
--shadow-accent: #6366f1cc; /* 强调阴影 */
```

### 10. 登录页面特殊颜色

```css
--login-primary: #6366f1; /* 登录页面主色 */
--login-secondary: #2563eb; /* 登录页面次色 */
--login-accent: #a5b4fc; /* 登录页面强调色 */
--login-bg: #f0f2f5; /* 登录页面背景色 */
```

### 11. 白色和透明色

```css
--white: #ffffff; /* 纯白色 */
--white-transparent-82: rgba(255, 255, 255, 0.82); /* 82%透明度白色 */
--white-transparent-7: rgba(255, 255, 255, 0.7); /* 70%透明度白色 */
```

### 12. 背景色

```css
--bg-light: #f8f9fa; /* 浅色背景 */
--bg-white: #ffffff; /* 白色背景 */
```

### 13. 状态颜色

```css
--success: #10b981; /* 成功状态 */
--warning: #f59e0b; /* 警告状态 */
--error: #ef4444; /* 错误状态 */
--info: #3b82f6; /* 信息状态 */
```

## 使用方法

### 在 CSS 中使用

```css
.my-component {
  background-color: var(--primary-500);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  box-shadow: 0 2px 8px var(--shadow-primary);
}
```

### 在 CSS 模块中使用

```css
.button {
  background: linear-gradient(
    90deg,
    var(--btn-primary) 0%,
    var(--btn-secondary) 100%
  );
  color: var(--text-secondary);
}

.button:hover {
  background: linear-gradient(
    90deg,
    var(--btn-primary-hover) 0%,
    var(--btn-secondary-hover) 100%
  );
}
```

### 在 JavaScript 中使用

```javascript
// 获取CSS变量值
const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--primary-500");

// 设置CSS变量值
document.documentElement.style.setProperty("--primary-500", "#new-color");
```

## 深色模式支持

项目支持深色模式，当用户系统设置为深色模式时，以下颜色会自动调整：

- 文字颜色会变为浅色
- 背景色会变为深色
- 边框颜色会相应调整

## 最佳实践

1. **始终使用 CSS 变量**：不要直接使用十六进制颜色值
2. **语义化命名**：使用有意义的变量名，如 `--text-primary` 而不是 `--color-333`
3. **保持一致性**：在整个项目中使用相同的颜色变量
4. **考虑可访问性**：确保颜色对比度符合 WCAG 标准
5. **测试深色模式**：确保在深色模式下颜色仍然可用

## 颜色组合示例

### 主要按钮

```css
.primary-button {
  background: linear-gradient(
    90deg,
    var(--btn-primary) 0%,
    var(--btn-secondary) 100%
  );
  color: var(--text-secondary);
  border: none;
  box-shadow: 0 2px 8px var(--shadow-primary);
}

.primary-button:hover {
  background: linear-gradient(
    90deg,
    var(--btn-primary-hover) 0%,
    var(--btn-secondary-hover) 100%
  );
  box-shadow: 0 4px 16px var(--shadow-secondary);
}
```

### 卡片组件

```css
.card {
  background: var(--white-transparent-82);
  border: 1px solid var(--border-primary);
  box-shadow: 0 4px 24px var(--shadow-primary);
  color: var(--text-primary);
}
```

### 输入框

```css
.input {
  background: var(--white);
  border: 1.5px solid var(--border-primary);
  color: var(--text-primary);
}

.input:focus {
  border-color: var(--border-secondary);
  box-shadow: 0 0 0 2px var(--shadow-accent);
}
```
