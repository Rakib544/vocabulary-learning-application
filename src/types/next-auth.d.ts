import "next-auth/jwt";

interface User {
  name: string;
  id: string;
  email: string;
  photoUrl: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  error: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
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
