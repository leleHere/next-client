import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    // 从请求中获取用户信息
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: "未认证" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Verify user error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
