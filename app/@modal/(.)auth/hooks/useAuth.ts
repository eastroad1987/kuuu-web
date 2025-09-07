import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async ({ email, password }: LoginData) => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Login failed');
        }

        if (result.token && result.user) {
          localStorage.setItem('token', result.token);
          setUser(result.user);
          router.refresh();
          return true;
        }

        return false;
      } catch (error) {
        console.error("로그인 에러:", error);
        throw error;
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("로그아웃 에러:", error);
      throw error;
    }
  }, [router]);

  const checkAuth = useCallback(() => {
    return user !== null;
  }, [user]);

  return {
    user,
    isAuthenticated: checkAuth(),
    isLoading,
    login,
    logout,
  };
}
