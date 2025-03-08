
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface LoginData {
  email: string;
  password: string;
}

export function useAuth() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  const login = useCallback(
    async ({ email, password }: LoginData) => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        if (result?.ok) {
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
      await signOut({ redirect: false });
      router.push("/auth/signin");
    } catch (error) {
      console.error("로그아웃 에러:", error);
      throw error;
    }
  }, [router]);

  const checkAuth = useCallback(() => {
    if (status === "loading") return null;
    return session !== null;
  }, [session, status]);

  return {
    session,
    status,
    isAuthenticated: checkAuth(),
    isLoading: status === "loading",
    user: session?.user,
    login,
    logout,
    updateSession,
  };
}
