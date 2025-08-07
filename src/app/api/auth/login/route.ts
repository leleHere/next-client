import { NextRequest, NextResponse } from "next/server";
import { generateToken, setAuthCookie } from "@/utils/auth";

// 模拟用户数据库
const USERS = [
  {
    id: "1",
    username: "admin",
    password: "123456", // 在实际应用中应该使用加密密码
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    username: "user",
    password: "123456",
    email: "user@example.com",
    role: "user",
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 验证输入
    if (!username || !password) {
      return NextResponse.json(
        { error: "用户名和密码不能为空" },
        { status: 400 }
      );
    }

    // 查找用户
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    // 生成 JWT token
    const token = await generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // 创建响应
    const response = NextResponse.json(
      {
        success: true,
        message: "登录成功",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // 设置认证 cookie
    return setAuthCookie(token, response);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
