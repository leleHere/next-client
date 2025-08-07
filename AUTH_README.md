# 专业鉴权系统使用指南

## 概述

这个项目实现了一个基于 JWT 的专业鉴权系统，包含以下功能：

- JWT Token 生成和验证
- HttpOnly Cookie 安全存储
- 中间件路由保护
- 用户状态管理
- 登录/登出功能

## 系统架构

### 1. 核心文件

- `src/utils/auth.ts` - 鉴权工具函数
- `src/hooks/useAuth.ts` - 用户认证状态管理 Hook
- `src/middleware.ts` - 路由中间件
- `src/app/api/auth/` - 认证 API 路由
- `src/components/LogoutButton.tsx` - 登出按钮组件

### 2. API 路由

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/verify` - 验证用户状态

## 配置

### 1. 环境变量

创建 `.env.local` 文件并添加以下配置：

```env
# JWT 密钥（生产环境请使用强密钥）
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# API 基础 URL
NEXT_PUBLIC_API_BASE=http://localhost:3001/api

# 环境配置
NODE_ENV=development
```

### 2. 依赖安装

确保已安装必要的依赖：

```bash
yarn add jose
```

## 使用方法

### 1. 在组件中使用认证状态

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!isAuthenticated) {
    return <div>请先登录</div>;
  }

  return (
    <div>
      <h1>欢迎, {user?.username}!</h1>
      <button onClick={logout}>登出</button>
    </div>
  );
}
```

### 2. 使用登出按钮组件

```tsx
import { LogoutButton } from "@/components/LogoutButton";

function Header() {
  return (
    <header>
      <LogoutButton type="primary" size="small" />
    </header>
  );
}
```

### 3. 路由保护

中间件会自动保护以下路由：

- `/start` - 需要登录
- `/login` - 已登录用户会被重定向到 `/start`
- `/` - 根据登录状态重定向

## 安全特性

### 1. JWT Token 安全

- 使用 HS256 算法签名
- 包含用户 ID、用户名、角色等信息
- 7 天有效期
- 包含发行者和受众验证

### 2. Cookie 安全

- HttpOnly 防止 XSS 攻击
- SameSite=Strict 防止 CSRF 攻击
- 生产环境自动启用 Secure 标志
- 7 天过期时间

### 3. 路由保护

- 中间件级别的路由保护
- Token 有效性验证
- 自动重定向未认证用户

## 测试账户

系统预置了两个测试账户：

1. 管理员账户

   - 用户名: `admin`
   - 密码: `123456`
   - 角色: `admin`

2. 普通用户账户
   - 用户名: `user`
   - 密码: `123456`
   - 角色: `user`

## 生产环境部署

### 1. 安全配置

- 使用强随机 JWT 密钥
- 启用 HTTPS
- 配置正确的域名
- 设置适当的 Cookie 域名

### 2. 环境变量

```env
JWT_SECRET=your-production-jwt-secret-key
NODE_ENV=production
```

### 3. 数据库集成

当前使用内存中的用户数据，生产环境需要：

- 集成真实数据库
- 密码加密存储
- 用户注册功能
- 密码重置功能

## 故障排除

### 1. Token 始终 undefined

- 检查 Cookie 是否正确设置
- 确认 API 路由正常工作
- 检查浏览器开发者工具中的 Cookie

### 2. 登录后立即跳转回登录页

- 检查 JWT 密钥配置
- 确认 Token 生成和验证逻辑
- 检查中间件配置

### 3. API 路由 500 错误

- 检查 jose 库是否正确安装
- 确认环境变量配置
- 查看服务器日志

## 扩展功能

### 1. 添加用户注册

```tsx
// 在 src/app/api/auth/register/route.ts 中实现
export async function POST(request: NextRequest) {
  // 实现用户注册逻辑
}
```

### 2. 添加密码重置

```tsx
// 在 src/app/api/auth/reset-password/route.ts 中实现
export async function POST(request: NextRequest) {
  // 实现密码重置逻辑
}
```

### 3. 添加角色权限控制

```tsx
// 在中间件中添加角色检查
if (user?.role !== "admin" && pathname.startsWith("/admin")) {
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}
```

## 注意事项

1. **JWT 密钥安全**: 生产环境必须使用强随机密钥
2. **Token 过期**: 当前设置为 7 天，可根据需要调整
3. **用户数据**: 当前使用内存存储，生产环境需要数据库
4. **错误处理**: 确保所有错误都被正确捕获和处理
5. **日志记录**: 生产环境建议添加详细的日志记录
