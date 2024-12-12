import { type NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      type: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          throw new Error("invalid-credentials");
        }

        const result = await response.json();

        const userData = {
          ...result.data.user,
        };

        return Promise.resolve(userData);
      },
    }),
  ],
  secret: process.env.JWT_TOKEN_SECRET,
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      //  Initial Login
      const currentTime = new Date();
      if (account && user) {
        const expirationTime = new Date(
          currentTime.getTime() + 14 * 60 * 1000
        ).getTime();
        return {
          ...token,
          ...user,
          expiresIn: expirationTime,
        };
      }

      // Check is the token expired
      if (currentTime.getTime() < token.expiresIn) {
        return token;
      }

      // Here I need to call refresh token api endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/auth/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            deviceId: session?.user.deviceId || "",
          },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        }
      );

      if (!response.ok) {
        return { ...token, ...user, error: "refreshToken-error" };
      }

      const result = await response.json();
      const expirationTime = new Date(
        currentTime.getTime() + 14 * 60 * 1000
      ).getTime();
      return { ...token, ...user, ...result.data, expiresIn: expirationTime };
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};
