import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("인증에 필요한 정보가 부족합니다");
        }

        try {
          // DB에서 사용자 확인 로직
          // const user = await prisma.user.findUnique({
          //   where: { email: credentials.email },
          // });

          // if (!user) {
          //   throw new Error("등록되지 않은 사용자입니다");
          // }

          // // 비밀번호 검증 (bcrypt 사용 예시)
          // const isValid = await bcrypt.compare(
          //   credentials.password,
          //   user.password,
          // );

          // if (!isValid) {
          //   throw new Error("비밀번호가 일치하지 않습니다");
          // }

          // return {
          //   id: user.id,
          //   email: user.email,
          //   name: user.name,
          // };

          return { id: "1", email: "test@test.com", name: "test" };
        } catch (error) {
          throw new Error("인증 과정에서 오류가 발생했습니다");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          // session.user.id = token.id as string;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  secret: process.env.NEXTAUTH_SECRET,
};