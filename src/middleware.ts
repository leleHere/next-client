import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/utils/auth";

// 配置哪些路由需要鉴权
const protectedRoutes = ["/start"]; // 需要登录的页面
const publicRoutes = ["/", "/login", "/home"]; // 公开页面
const apiRoutes = ["/api/auth"]; // API 路由

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过 API 路由的鉴权（API 路由有自己的鉴权逻辑）
  if (apiRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // 验证 token 的有效性
  let isValidToken = false;
  if (token) {
    try {
      const userInfo = await verifyToken(token);
      isValidToken = !!userInfo;
    } catch (error) {
      console.error("Token verification failed in middleware:", error);
      isValidToken = false;
    }
  }

  // 根路径重定向逻辑
  if (pathname === "/") {
    if (!isValidToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/start", request.url));
    }
  }

  // 已登录用户访问 /login，自动跳转到 /start
  if (isValidToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/start", request.url));
  }

  // 公开页面无需鉴权
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 受保护页面未登录，跳转到 /login
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isValidToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 其他情况放行
  return NextResponse.next();
}

// 匹配所有页面
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
