import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/utils/auth";

export async function POST() {
  try {
    // 创建响应
    const response = NextResponse.json(
      {
        success: true,
        message: "登出成功",
      },
      { status: 200 }
    );

    // 清除认证 cookie
    return clearAuthCookie(response);
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
