# 鉴权系统测试指南

## 测试步骤

### 1. 启动开发服务器

```bash
yarn dev
```

### 2. 测试登录功能

#### 2.1 访问登录页面

- 打开浏览器访问：http://localhost:3000/login
- 应该看到登录表单

#### 2.2 测试有效登录

- 用户名：`admin`
- 密码：`123456`
- 点击登录按钮
- **预期结果**：登录成功，跳转到 `/start` 页面

#### 2.3 测试无效登录

- 用户名：`admin`
- 密码：`wrongpassword`
- 点击登录按钮
- **预期结果**：显示"用户名或密码错误"消息

### 3. 测试路由保护

#### 3.1 未登录访问受保护页面

- 在浏览器中直接访问：http://localhost:3000/start
- **预期结果**：自动重定向到登录页面

#### 3.2 已登录访问登录页面

- 登录成功后，手动访问：http://localhost:3000/login
- **预期结果**：自动重定向到 `/start` 页面

#### 3.3 访问根路径

- 访问：http://localhost:3000/
- **预期结果**：根据登录状态重定向到相应页面

### 4. 测试用户界面

#### 4.1 用户信息显示

- 登录后访问 `/start` 页面
- **预期结果**：右上角显示用户头像、用户名、角色和登出按钮

#### 4.2 登出功能

- 点击右上角的"登出"按钮
- **预期结果**：清除认证状态，跳转到登录页面

### 5. 测试 Cookie 和 Token

#### 5.1 检查 Cookie

- 打开浏览器开发者工具
- 进入 Application/Storage 标签
- 查看 Cookies
- **预期结果**：应该看到名为 `token` 的 HttpOnly cookie

#### 5.2 验证 Token 有效性

- 在开发者工具的 Console 中运行：

```javascript
fetch("/api/auth/verify", { credentials: "include" })
  .then((res) => res.json())
  .then((data) => console.log(data));
```

- **预期结果**：返回用户信息或未认证错误

### 6. 测试 API 端点

#### 6.1 登录 API

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

#### 6.2 验证 API

```bash
curl http://localhost:3000/api/auth/verify \
  -H "Cookie: token=YOUR_TOKEN_HERE"
```

#### 6.3 登出 API

```bash
curl -X POST http://localhost:3000/api/auth/logout
```

## 常见问题排查

### 1. Token 始终 undefined

- 检查 `.env.local` 文件是否存在
- 确认 JWT_SECRET 已设置
- 检查浏览器 Cookie 设置

### 2. 登录后立即跳转回登录页

- 检查 jose 库是否正确安装
- 确认 API 路由返回正确的响应
- 检查中间件中的 token 验证逻辑

### 3. API 路由返回 500 错误

- 检查服务器控制台错误信息
- 确认环境变量配置正确
- 验证 jose 库导入是否正确

### 4. Cookie 未设置

- 检查浏览器是否支持 Cookie
- 确认 API 响应头包含 Set-Cookie
- 检查域名和路径设置

## 成功标准

✅ **系统正常工作应满足：**

1. 登录功能正常，支持有效/无效凭据验证
2. 路由保护正常工作，未登录用户无法访问受保护页面
3. 用户信息正确显示在界面上
4. 登出功能正常工作
5. JWT Token 正确生成和验证
6. HttpOnly Cookie 正确设置
7. 中间件正确拦截和重定向请求

## 下一步

如果所有测试都通过，说明鉴权系统已经成功实现！你可以：

1. 集成真实的用户数据库
2. 添加用户注册功能
3. 实现密码重置功能
4. 添加角色权限控制
5. 优化安全配置
6. 添加日志记录
