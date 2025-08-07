import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

// JWT 密钥 - 在生产环境中应该使用环境变量
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
);

// Token 配置
const TOKEN_CONFIG = {
  expiresIn: "7d", // Token 有效期7天
  issuer: "your-app",
  audience: "your-app-users",
};

// 用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  role?: string;
}

// 生成 JWT Token
export async function generateToken(userInfo: UserInfo): Promise<string> {
  const token = await new SignJWT({
    id: userInfo.id,
    username: userInfo.username,
    email: userInfo.email,
    role: userInfo.role || "user",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(TOKEN_CONFIG.issuer)
    .setAudience(TOKEN_CONFIG.audience)
    .setExpirationTime(TOKEN_CONFIG.expiresIn)
    .sign(JWT_SECRET);

  return token;
}

// 验证 JWT Token
export async function verifyToken(token: string): Promise<UserInfo | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: TOKEN_CONFIG.issuer,
      audience: TOKEN_CONFIG.audience,
    });

    return {
      id: payload.id as string,
      username: payload.username as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// 设置认证 Cookie
export function setAuthCookie(token: string, response: Response): Response {
  const cookieStore = cookies();

  // 设置 HttpOnly cookie，提高安全性
  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${
      7 * 24 * 60 * 60
    }; SameSite=Strict; Secure=${process.env.NODE_ENV === "production"}`
  );

  return response;
}

// 清除认证 Cookie
export function clearAuthCookie(response: Response): Response {
  response.headers.set(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict"
  );

  return response;
}

// 从请求中获取用户信息
export async function getUserFromRequest(
  request: Request
): Promise<UserInfo | null> {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const token = cookies.token;
  if (!token) return null;

  return await verifyToken(token);
}

// 客户端设置 Cookie (用于客户端登录)
export function setClientCookie(name: string, value: string, days: number = 7) {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${
    window.location.protocol === "https:" ? "; Secure" : ""
  }`;
}

// 客户端获取 Cookie
export function getClientCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

// 客户端清除 Cookie
export function clearClientCookie(name: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
