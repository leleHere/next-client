# 颜色系统迁移指南

本指南将帮助你将项目中的硬编码颜色值迁移到新的 CSS 变量系统。

## 迁移步骤

### 1. 识别硬编码颜色

首先，使用以下命令查找项目中的硬编码颜色：

```bash
# 查找十六进制颜色值
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.css" --include="*.tsx" --include="*.ts"

# 查找rgba颜色值
grep -r "rgba(" src/ --include="*.css" --include="*.tsx" --include="*.ts"
```

### 2. 颜色映射表

以下是项目中常见颜色的映射关系：

| 硬编码颜色 | CSS 变量                     | 用途         |
| ---------- | ---------------------------- | ------------ |
| `#ffffff`  | `var(--white)`               | 纯白色       |
| `#333`     | `var(--text-primary)`        | 主要文字     |
| `#555`     | `var(--text-secondary)`      | 次要文字     |
| `#222`     | `var(--text-tertiary)`       | 第三级文字   |
| `#7b7b93`  | `var(--text-muted)`          | 静音文字     |
| `#b4b9f6`  | `var(--btn-primary)`         | 主要按钮     |
| `#a5b4fc`  | `var(--btn-primary-hover)`   | 按钮悬停     |
| `#c7d2fe`  | `var(--btn-secondary)`       | 次要按钮     |
| `#b8c1ec`  | `var(--btn-secondary-hover)` | 次要按钮悬停 |
| `#e0e7ff`  | `var(--border-primary)`      | 主要边框     |
| `#f0f2f5`  | `var(--chat-bg-secondary)`   | 聊天背景     |
| `#f5f7fa`  | `var(--chat-bg-tertiary)`    | 聊天背景     |
| `#6366f1`  | `var(--login-primary)`       | 登录页面主色 |
| `#2563eb`  | `var(--login-secondary)`     | 登录页面次色 |
| `#667eea`  | `var(--purple-gradient-1)`   | 紫色渐变起始 |
| `#764ba2`  | `var(--purple-gradient-2)`   | 紫色渐变结束 |
| `#f093fb`  | `var(--purple-gradient-3)`   | 粉色渐变起始 |
| `#f5576c`  | `var(--purple-gradient-4)`   | 粉色渐变结束 |

### 3. CSS 文件迁移

#### 迁移前：

```css
.button {
  background: #b4b9f6;
  color: #555;
  border: 1px solid #e0e7ff;
  box-shadow: 0 2px 8px #b8c1ec22;
}
```

#### 迁移后：

```css
.button {
  background: var(--btn-primary);
  color: var(--text-secondary);
  border: 1px solid var(--border-primary);
  box-shadow: 0 2px 8px var(--shadow-primary);
}
```

### 4. CSS 模块文件迁移

#### 迁移前：

```css
.inputArea {
  background: rgba(180, 185, 246, 0.1);
  border: 1.5px solid #e0e7ff;
  box-shadow: 0 2px 8px #b8c1ec22;
}
```

#### 迁移后：

```css
.inputArea {
  background: rgba(180, 185, 246, 0.1); /* 可以保持rgba，或使用CSS变量 */
  border: 1.5px solid var(--border-primary);
  box-shadow: 0 2px 8px var(--shadow-primary);
}
```

### 5. TypeScript/React 组件迁移

#### 迁移前：

```tsx
const styles = {
  button: {
    backgroundColor: "#b4b9f6",
    color: "#555",
    border: "1px solid #e0e7ff",
  },
};
```

#### 迁移后：

```tsx
import { COLORS } from "../types/colors";

const styles = {
  button: {
    backgroundColor: COLORS.BTN_PRIMARY,
    color: COLORS.TEXT_SECONDARY,
    border: `1px solid ${COLORS.BORDER_PRIMARY}`,
  },
};
```

或者使用内联样式：

```tsx
<div
  style={{
    backgroundColor: "var(--btn-primary)",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-primary)",
  }}
>
  按钮内容
</div>
```

### 6. 渐变背景迁移

#### 迁移前：

```css
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

#### 迁移后：

```css
.gradient-bg {
  background: linear-gradient(
    135deg,
    var(--purple-gradient-1) 0%,
    var(--purple-gradient-2) 100%
  );
}
```

### 7. 阴影迁移

#### 迁移前：

```css
.card {
  box-shadow: 0 4px 24px #b8c1ec22;
}
```

#### 迁移后：

```css
.card {
  box-shadow: 0 4px 24px var(--shadow-primary);
}
```

## 批量替换脚本

你可以使用以下脚本进行批量替换：

### 使用 sed 命令（Linux/Mac）：

```bash
# 替换主要颜色
sed -i 's/#b4b9f6/var(--btn-primary)/g' src/**/*.css
sed -i 's/#555/var(--text-secondary)/g' src/**/*.css
sed -i 's/#e0e7ff/var(--border-primary)/g' src/**/*.css
sed -i 's/#b8c1ec22/var(--shadow-primary)/g' src/**/*.css
```

### 使用 PowerShell（Windows）：

```powershell
# 替换主要颜色
Get-ChildItem -Path "src" -Recurse -Include "*.css" | ForEach-Object {
    (Get-Content $_.FullName) | ForEach-Object {
        $_ -replace '#b4b9f6', 'var(--btn-primary)' `
           -replace '#555', 'var(--text-secondary)' `
           -replace '#e0e7ff', 'var(--border-primary)' `
           -replace '#b8c1ec22', 'var(--shadow-primary)'
    } | Set-Content $_.FullName
}
```

## 验证迁移

### 1. 视觉检查

- 确保所有组件的外观保持一致
- 检查深色模式下的显示效果
- 验证悬停和焦点状态

### 2. 功能测试

- 测试所有交互组件
- 验证动画和过渡效果
- 检查响应式设计

### 3. 可访问性测试

- 使用颜色对比度检查工具
- 确保文本可读性
- 验证键盘导航

## 常见问题

### Q: 如何处理透明度颜色？

A: 对于 rgba 颜色，你可以：

1. 保持 rgba 格式，只替换颜色值
2. 创建专门的透明度变量
3. 使用 CSS 变量的 alpha 通道功能

### Q: 如何处理动态颜色？

A: 使用 JavaScript 动态设置 CSS 变量：

```javascript
document.documentElement.style.setProperty("--primary-500", "#new-color");
```

### Q: 如何添加新的颜色变量？

A: 在 `globals.css` 的 `:root` 选择器中添加新变量，并在 `COLORS.md` 中记录。

## 最佳实践

1. **逐步迁移**：不要一次性替换所有颜色，分批进行
2. **测试驱动**：每完成一个组件的迁移就进行测试
3. **保持一致性**：确保相同用途的颜色使用相同的变量
4. **文档更新**：及时更新颜色使用文档
5. **团队协作**：确保团队成员了解新的颜色系统

## 完成检查清单

- [ ] 所有 CSS 文件中的硬编码颜色已替换
- [ ] 所有 TypeScript/React 组件中的硬编码颜色已替换
- [ ] 深色模式支持已测试
- [ ] 所有交互状态已验证
- [ ] 可访问性要求已满足
- [ ] 文档已更新
- [ ] 团队已培训
