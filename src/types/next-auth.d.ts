import "next-auth/jwt";

interface User {
  name?: string | null | undefined;
  id: number | string;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string;
  accessToken: string;
  refreshToken: string;
  error: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | number;
    photoUrl: string;
    role: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    error: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
