import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

interface User {
  id: string;
  username: string;
  email?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });
  const router = useRouter();

  // 验证用户登录状态
  const verifyAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include", // 包含 cookies
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          user: data.user,
          loading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
      });
    }
  };

  // 登录
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAuthState({
          user: data.user,
          loading: false,
          isAuthenticated: true,
        });
        message.success("登录成功！");
        return { success: true };
      } else {
        message.error(data.error || "登录失败");
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("网络错误，请稍后重试");
      return { success: false, error: "网络错误" };
    }
  };

  // 登出
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
        });
        message.success("已登出");
        router.push("/login");
      } else {
        message.error("登出失败");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("网络错误，请稍后重试");
    }
  };

  // 初始化时验证用户状态
  useEffect(() => {
    verifyAuth();
  }, []);

  return {
    ...authState,
    login,
    logout,
    verifyAuth,
  };
};
